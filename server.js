import express from 'express';
import pg from 'pg';
import jwt from 'jsonwebtoken';

const { Pool } = pg;
const app = express();

app.use(express.json());

const db = new Pool({
    host: 'db',
    user: 'user',
    database: 'db',
    password: 'pass',
    port: 5432
})

function checkToken(token) {
    let result = jwt.verify(token, "secret", (err, decoded) => {
        if (err) { res.status(500).json(err.message) } else return decoded;
    });
    return result;
}

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
})

// Tasks

app.get("/tasks/:list_id", async (req, res) => {
    checkToken(req.headers.authorization);
    let result = await db.query(`SELECT * FROM tasks WHERE list = $1`, [req.params.list_id]);
    res.json(result.rows);
})

app.post("/tasks/:list_id", (req, res) => {
    checkToken(req.headers.authorization);

    req.body.tasks.forEach(task => {
        db.query(`INSERT INTO tasks (task, done, list) VALUES ($1, false, $2)`, [task, req.params.list_id])
    });

    res.status(201).send("success");
})

app.patch("/tasks/:task_id", (req, res) => {
    checkToken(req.headers.authorization);
    
    db.query(`UPDATE tasks SET done = NOT done WHERE id = $1`, [req.params.task_id]);

    res.status(200).send('success');
})

app.delete("/tasks/:task_id", (req, res) => {
    checkToken(req.headers.authorization);

    db.query(`DELETE FROM tasks WHERE id = $1`, [req.params.task_id]);

    res.status(200).send('success');
})

// Lists

app.get("/lists", async (req, res) => {
    let decoded = checkToken(req.headers.authorization);
    let result = await db.query(`SELECT * FROM lists WHERE user_email = $1`, [decoded.email]);
    res.json(result.rows);
})

app.post("/lists", async (req, res) => {
    let decoded = checkToken(req.headers.authorization);
    await db.query(`INSERT INTO lists (title, user_email) VALUES ($1, $2)`, [req.body.title, decoded.email]);
    res.status(201).send("success");
})

app.patch("/lists/:id", (req, res) => {
    checkToken(req.headers.authorization);
    
    db.query(`UPDATE lists SET title = $1 WHERE id = $2`, [req.body.title, req.params.id]);

    res.status(200).send('success');
})

app.delete("/lists/:id", (req, res) => {
    checkToken(req.headers.authorization);

    db.query(`DELETE FROM lists WHERE id = $1`, [req.params.id]);

    res.status(200).send('success');
})

// Users

app.post("/users", async (req, res) => {
    let result = await db.query(`SELECT * FROM users WHERE email = $1`, [req.body.email]);

    if (result.rows[0] == undefined) {
        await db.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`, [req.body.name, req.body.email, req.body.password]);
        res.status(201).send('user created');
    } else res.status(409).send("An account with the provided email address already exists");
})

app.post("/login", async (req, res) => {
    let result = await db.query(`SELECT * FROM users WHERE email = $1 AND password = $2`, [req.body.email, req.body.password]);

    if (result.rows[0] !== undefined) {
        let token = jwt.sign({name: result.rows[0].name, email: result.rows[0].email}, "secret", { expiresIn: '1800s'});
        res.json({token: token});
    } else res.sendStatus(404);
})

app.listen(3000, () => {
    console.log("Server listening on port 3000")
})

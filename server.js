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
  });

app.get("/todos", async (req, res) => {
    let decoded = checkToken(req.headers.authorization);
    let result = await db.query(`SELECT * FROM todos WHERE user_email = $1`, [decoded.email]);
    res.json(result.rows);
})

app.post("/todos", (req, res) => {
    let decoded = checkToken(req.headers.authorization);

    req.body.todos.forEach(todo => {
        db.query(`INSERT INTO todos (todo, done, user_email) VALUES ($1, false, $2)`, [todo, decoded.email])
    });

    res.status(201).send("success");
})

app.patch("/todos/:id", (req, res) => {
    checkToken(req.headers.authorization);
    
    db.query(`UPDATE todos SET done = NOT done WHERE id = $1`, [req.params.id]);

    res.status(200).send('success');
})

app.delete("/todos/:id", (req, res) => {
    checkToken(req.headers.authorization);

    db.query(`DELETE FROM todos WHERE id = $1`, [req.params.id]);

    res.status(200).send('success');
})

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

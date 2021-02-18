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

app.get("/todos", async (req, res) => {
    let decoded = jwt.verify(req.body.token, "secret", (err, decoded) => {
        if (err) res.status(403).json(err.message);
        return decoded;
    });
    let result = await db.query(`SELECT * FROM todos WHERE user_email = $1`, [decoded.email]);
    res.json(result.rows);
})

app.post("/todos", async (req, res) => {
    let decoded = jwt.verify(req.body.token, "secret", (err, decoded) => {
        if (err) res.status(403).json(err.message);
        return decoded;
    });

    req.body.todos.forEach(todo => {
        db.query(`INSERT INTO todos (todo, done, user_email) VALUES ($1, false, $2)`, [todo, decoded.email])
    });

    res.status(201).json("Success!");
})

app.post("/login", async (req, res) => {
    let result = await db.query(`SELECT * FROM users WHERE email = $1 AND password = $2`, [req.body.email, req.body.password]);

    if (result.rows[0] !== undefined) {
        let token = jwt.sign({name: result.rows[0].name, email: result.rows[0].email}, "secret", { expiresIn: '1800s'});
        res.json({token: token});
    } else res.sendStatus(404);

})

app.get("/test", async (req, res) => {
    // let result = await db.query(`SELECT * FROM users WHERE email = $1 AND password = $2`, [req.body.email, req.body.password]);
    let result = await db.query(`SELECT * FROM users`);
    console.log('HAPPY');
    res.json(result);
})

app.listen(3000, () => {
    console.log("Server listening on port 3000")
})

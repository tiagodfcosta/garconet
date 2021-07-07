import express from 'express';
import {insertUser, findUser, findUserById, insertSession, findSession, extendSession} from './db.js'

const PORT = 3001
const app = express()
app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).json({
        message: 'Working'
    })
})

app.post("/user", async (req, res) => {
    const id = await insertUser(req.body)
    res.status(200).json({id})
})

app.get("/user", (req, res) => {
    res.status(200).send("nuggets")
})

app.listen(PORT, () => console.log('Camões está aqui para te ouvir'))
import express from 'express';
import {insertUser, findUser, findUserById, insertSession, findSession, extendSession} from './db.js'

const PORT = 3001
const app = express()
app.use(express.json())


// validação dos dados inseridos com os dados na base de dados
app.post("/auth", async (req, res) => {
    const { username, password } = req.body;
    const user = await findUser(username);
    if(user && user.password === password) {
        const sessionId = await insertSession(user._id)
        res.status(200).json({ token: sessionId })
    } else {
        res.sendStatus(404)
    }
})

// vai verificar o utilizador existente
// app.get("/user", verifyUser, async (req, res) => {
//     res.status(200).json({ user: req.user.username })
// })

// criação de user na base de dados
app.post("/user", async (req, res) => {
    const id = await insertUser(req.body)
    res.status(200).json({id})
})


app.listen(PORT, () => console.log('Camões está aqui para te ouvir'))
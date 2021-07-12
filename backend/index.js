import express from 'express';
import * as fs from 'fs/promises';
import {insertUser, findUser, findUserById, insertSession, findSession, extendSession, findProducts, updateTray} from './db.js'

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

app.get("/category", async (req, res) => {
    try {
        const products = await findProducts()
        res.status(200).json({products})
    } catch(err) {
        console.log("erroooou" + err)
    }
})

//parcialmente correto
app.post("/tray", async (req, res) => {    
    const tray = await updateTray(req.body);
    res.status(200).send("you did it")    
})

//teste para escrever o produto atual para tentar ler no app.js e usar valor no updateTray
// app.post("/escreveProduto", async (req, res) => {
//     const produto = await fs.writeFile("./produtoatual.json", JSON.stringify(req.body, null, 2));
//     res.status(200).send("produto escrito com sucesso");

// })

//no insomnia até funciona
app.get("/atual", async (req, res) => {
    const produto = await fs.readFile("./produtoatual.json");
    res.status(200).send(JSON.parse(produto))
})

app.listen(PORT, () => console.log('Camões está aqui para te ouvir'))
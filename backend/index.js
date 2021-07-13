import express from 'express';
import * as fs from 'fs/promises';
import {insertUser, findUser, findUserById, insertSession, findSession, extendSession, findProducts, updateTray, findTray} from './db.js'

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

app.post("/tray", async (req, res) => {    
    const tray = await updateTray(req.body);
    res.status(200).send("you did it")    
})

app.post("/order", async (req, res) => {
    //usar o req.body para atualizar a quantidade e o valor
    //ver se há conta
    //se não, criar
    //se sim, adicionar bandeja à conta
})

app.get("/quantevalor", async (req, res) => {
    const tray = await findTray()
    res.status(200).send(tray) 
})

app.listen(PORT, () => console.log('Camões está aqui para te ouvir'))
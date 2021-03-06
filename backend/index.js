import express from 'express';
import * as fs from 'fs/promises';
import {
    insertUser, findUser, findUserById, insertSession, findSession, extendSession, findProducts, deliverOrder, killBill,
    updateTray, findTray, createBill, getBillAmount, checkBill, getOpenTrays, decrementQuantity, incrementQuantity
} from './db.js'

const PORT = 3001
const app = express()
app.use(express.json())


// validação dos dados inseridos com os dados na base de dados
app.post("/auth", async (req, res) => {
    const { username, password } = req.body;
    const user = await findUser(username);
    if (user && user.password === password) {
        const sessionId = await insertSession(user._id)
        res.status(200).json({ token: sessionId })
    } else {
        res.sendStatus(404)
    }
})


// criação de user na base de dados
app.post("/user", async (req, res) => {
    const id = await insertUser(req.body)
    res.status(200).json({ id })
})

app.get("/category", async (req, res) => {
    try {
        const products = await findProducts()
        res.status(200).json({ products })
    } catch (err) {
        console.log("erroooou" + err)
    }
})

app.post("/tray", async (req, res) => {
    const tray = await updateTray(req.body);
    res.status(200).send("you did it")
})

app.post("/order", async (req, res) => {
    const bill = await createBill()
    res.status(200).send("conta criada bebe")
})

app.get("/qtdvalue", async (req, res) => {
    const tray = await findTray() 
    // if (!tray) {
    //     res.status(200).send({
    //         "quantidade": 0,
    //         "valortotal": 0,
    //         "valor": 0
    //     })
    // } else {
        res.status(200).send(tray)
    //}
})

//checar
// app.get("/qtdvaluesomado", async (req, res) => {
//     const bill = await findBill()
//     res.status(200).json(bill) 

// })

app.get("/billvalue", async (req, res) => {
    const bill = await getBillAmount()
    res.status(200).json(bill)
})

app.get("/seebill", async (req, res) =>  {
    const bill = await checkBill()
    if (bill) {
        res.status(200).json(bill)
    }
})

app.get("/opentrays", async (req, res) => {
    const trays = await getOpenTrays()
    res.status(200).json(trays)
})

app.post("/decrement", async (req, res) => {
    const trays = await decrementQuantity(req.body)
    res.status(200).send("foi!")
})

app.post("/increment", async (req, res) => {
    const trays = await incrementQuantity(req.body)
    res.status(200).send("foi!")
})

app.post("/deliver", async (req, res) => {
    const deliver = await deliverOrder(req.body);
    res.sendStatus(200)
})

app.get("/killbill", async (req, res) => {
    const billkilled = await killBill();
    res.sendStatus(200)
})

app.listen(PORT, () => console.log('Camões está aqui para te ouvir'))


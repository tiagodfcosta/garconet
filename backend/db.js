import mongodb from 'mongodb';


// salvar uma constante mongo_client
const { MongoClient } = mongodb

//salvar uma constante com caminho para o servidor mongodb
const URI = 'mongodb://localhost:27017'

//constante com a nossa BD 
<<<<<<< HEAD
const DB_GARCONET = "authentication"
=======
const DB_GARCONET = "autenticacao"
>>>>>>> main

//Declarar o client
let client

// função que faz algo que nós ainda não sabemos o que é !!! Tal como ligar o MongoDB
async function connect(uri) {
    try {
        if (client) return client

        client = new MongoClient(uri, {
            //evita que com os novos updates a função deixe de funcionar (useUnifiedTopology: true)
            useUnifiedTopology: true
        })
        await client.connect();
        return client;
    } catch (err) {
        console.log(err)
    }
}

// função que retorna o histórico de ligaçoes realizadas com o server ?????
// Vai receber uma bd e uma string que representa uma colacao 

async function getCollection(dbName, colName) {
    const client = await connect(URI)
    const db = client.db(dbName)
    return db.collection(colName)
}

// função de criar usuário

export async function insertUser(user) {
    const collection = await getCollection(DB_GARCONET, "users");
    //TODO para futuro -- encriptação 
    // user.password = await bcrypt.hash(user.password, saltRounds);

    const res = await collection.insertOne(user);
    return res.insertedId;
}

<<<<<<< HEAD
// função para encontrar utilizador por name de utilizador
=======
// função para encontrar utilizador por nome de utilizador
>>>>>>> main
export async function findUser(username) {
    const collection = await getCollection(DB_GARCONET, "users");
    const res = await collection.findOne({ username });
    return res;
}


// função para encontrar utilizador por id
export async function findUserById(id) {
    const collection = await getCollection(DB_GARCONET, "users");
    const res = await collection.findOne({ _id: mongodb.ObjectId(id) })
    return res;
}

export async function insertSession(uid) {
    const collection = await getCollection(DB_GARCONET, "sessions");
    const res = await collection.insertOne({
        uid,
        expiresAt: new Date(new Date().valueOf() + (50 * 60 * 1000))
    })
    return res.insertedId
}

export async function findSession(id) {
    const collection = await getCollection(DB_GARCONET, "sessions");
    const res = await collection.findOne({ _id: mongodb.ObjectId(id) })
    return res;
}

export async function extendSession(id) {
    const collection = await getCollection(DB_GARCONET, "sessions");
    const res = await collection.updateOne(
        { id: mongodb.ObjectId(id) },
        {
            $set: {
                expiresAt: new Date(new Date().valueOf() + (50 * 60 * 1000))
            }
        }
    )
    return res;

}

<<<<<<< HEAD
export async function insertProducts(products) {
    const collection = await getCollection(DB_GARCONET, "products");
    const res = await collection.insertMany(products);
=======
export async function insertProducts(produtos) {
    const collection = await getCollection(DB_GARCONET, "produtos");
    const res = await collection.insertMany(produtos);
>>>>>>> main
    return res;
}

export async function findProducts() {
<<<<<<< HEAD
    const collection = await getCollection(DB_GARCONET, "products");
    const res = await collection.find().toArray()
=======
    const collection = await getCollection(DB_GARCONET, "produtos");
    const res = await collection.find().toArray()
    console.log(res);
>>>>>>> main
    return res
}
// //função com problema
// export async function findBill() {
<<<<<<< HEAD
//     const bill = await getCollection(DB_GARCONET, "bill");
//     const openBill = await bill.findOne({ open: true });
//     if (openBill) {
//         let valuesMapeado
//         let values = openBill.btray.reduce((acc, curr) => {
//             valuesMapeado = curr.items.reduce((acc, curr) => acc + curr.value)

//             const totalvalue = acc + valuesMapeado.value

//             return totalvalue
//         }, 0)

//         return values;
//     }
// }

//chamar também quando não tiver btray open
export async function findTray() {
    const collection = await getCollection(DB_GARCONET, "btray");
    const tray = await collection.findOne({ open: true })
    let values = { quantity: 0, value: 0, totalvalue: 0 }
    if (tray) {
        values = tray.items.reduce((acc, curr) => {
            return { quantity: acc.quantity + curr.quantity, value: acc.value + curr.value, totalvalue: 0 }
        }, { quantity: 0, value: 0, totalvalue: 0 })
=======
//     const bill = await getCollection(DB_GARCONET, "conta");
//     const openBill = await bill.findOne({ aberta: true });
//     if (openBill) {
//         let valoresMapeado
//         let valores = openBill.bandeja.reduce((acc, curr) => {
//             valoresMapeado = curr.artigos.reduce((acc, curr) => acc + curr.valor)

//             const valorTotal = acc + valoresMapeado.valor

//             return valorTotal
//         }, 0)

//         return valores;
//     }
// }

//chamar também quando não tiver bandeja aberta
export async function findTray() {

    const collection = await getCollection(DB_GARCONET, "bandeja");
    const tray = await collection.findOne({ aberta: true })
    let valores = { quantidade: 0, valor: 0, valortotal: 0 }
    if (tray) {
        valores = tray.artigos.reduce((acc, curr) => {
            return { quantidade: acc.quantidade + curr.quantidade, valor: acc.valor + curr.valor, valortotal: 0 }
        }, { quantidade: 0, valor: 0, valortotal: 0 })
>>>>>>> main
    } else {

    }

<<<<<<< HEAD
    const bill = await getCollection(DB_GARCONET, "bill");
    const openBill = await bill.findOne({ open: true });
    if (openBill) {
        let totalvalue = openBill.btray.reduce((acc, curr) => {
            return acc + curr.items.reduce((acc, curr) => {
                return acc + curr.value
            }, 0)
        }, 0)
        values.totalvalue = parseFloat(totalvalue);
        return values;
    }
    return values;
}

export async function getBillAmount() {
    const collection = await getCollection(DB_GARCONET, "bill");
    const bill = await collection.findOne({ open: true })
    let values;
    if (bill) {
        values = bill.btray.reduce((acc, curr) => {
            return acc + curr.items.reduce((acc, curr) => {
                return acc + curr.value
            }, 0)
        }, 0)
        return values;
=======
    const bill = await getCollection(DB_GARCONET, "conta");
    const openBill = await bill.findOne({ aberta: true });
    if (openBill) {
        let valortotal = openBill.bandeja.reduce((acc, curr) => {
            return acc + curr.artigos.reduce((acc, curr) => {
                return acc + curr.valor
            }, 0)
        }, 0)
        valores.valortotal = parseFloat(valortotal);
        return valores;
    }
    return valores;
}

export async function getBillAmount() {
    const collection = await getCollection(DB_GARCONET, "conta");
    const bill = await collection.findOne({ aberta: true })
    let valores;
    if (bill) {
        valores = bill.bandeja.reduce((acc, curr) => {
            return acc + curr.artigos.reduce((acc, curr) => {
                return acc + curr.valor
            }, 0)
        }, 0)



        return valores;

>>>>>>> main
    }
}

export async function updateTray(info) {
<<<<<<< HEAD
    const collection = await getCollection(DB_GARCONET, "btray");
    //procura alguma btray que esteja como open
    let tray = await collection.findOne({ open: true })
    //se o id não existir, cria com as chaves abaixo
    if (!tray) {
        await collection.insertOne({
            open: true,
            creationDate: new Date(),
            items: [],
        })
        //a tray se torna a btray que foi criada
        tray = await collection.findOne({ open: true })
    }
    //checa se o artigo existe, se sim, atualiza a quantity e o value, se não, manda tudo pra dentro
    let item = tray.items.find((a) => a.name === info.name)
    if (item) {
        item.quantity += info.quantity
        item.value += info.value

    } else {
        tray.items.push(info)
=======
    const collection = await getCollection(DB_GARCONET, "bandeja");

    //procura alguma bandeja que esteja como aberta
    let tray = await collection.findOne({ aberta: true })
    //se o id não existir, cria com as chaves abaixo
    if (!tray) {
        await collection.insertOne({
            aberta: true,
            dataCriacao: new Date(),
            artigos: [],
        })
        //a tray se torna a bandeja que foi criada
        tray = await collection.findOne({ aberta: true })
    }
    //checa se o artigo existe, se sim, atualiza a quantidade e o valor, se não, manda tudo pra dentro
    let item = tray.artigos.find((a) => a.nome === info.nome)
    if (item) {
        item.quantidade += info.quantidade
        item.valor += info.valor

    } else {
        tray.artigos.push(info)
>>>>>>> main
    }
    //faz um update na collection com as mudanças acima
    await collection.updateOne({
        _id: tray._id
    }, {
        $set: {
<<<<<<< HEAD
            items: tray.items,

        }
    })
=======
            artigos: tray.artigos,

        }
    })

>>>>>>> main
    return tray;
}

export async function createBill() {
<<<<<<< HEAD
    const openTray = await getCollection(DB_GARCONET, "btray")
    let open = await openTray.findOne({ open: true })

    if (open) {
        const collection = await getCollection(DB_GARCONET, "bill");
        //checar se existe bill open
        let bill = await collection.findOne({ open: true })
        //se não existir, criar uma com open: true, data de criação e btrays: []
        if (!bill) {
            await collection.insertOne({
                open: true,
                creationDate: new Date(),
                btray: []
            })
            //a tray se torna a bill que foi criada
            bill = await collection.findOne({ open: true })
        }
        //const com a collection btray
        const btray = await getCollection(DB_GARCONET, "btray")

        let openTray = await btray.findOne({ open: true })
        //adicionar a btray na bill
        bill.btray.push(openTray)
        //por fim, atualizar a bill
=======
    const bandejaAberta = await getCollection(DB_GARCONET, "bandeja")
    let aberta = await bandejaAberta.findOne({ aberta: true })

    if (aberta) {
        const collection = await getCollection(DB_GARCONET, "conta");
        //checar se existe conta aberta
        let bill = await collection.findOne({ aberta: true })
        //se não existir, criar uma com aberta: true, data de criação e bandejas: []
        if (!bill) {
            await collection.insertOne({
                aberta: true,
                dataCriacao: new Date(),
                bandeja: []
            })
            //a tray se torna a conta que foi criada
            bill = await collection.findOne({ aberta: true })
        }
        //const com a collection bandeja
        const bandeja = await getCollection(DB_GARCONET, "bandeja")

        let bandejaAberta = await bandeja.findOne({ aberta: true })
        //adicionar a bandeja na conta
        bill.bandeja.push(bandejaAberta)
        //por fim, atualizar a conta
>>>>>>> main
        await collection.updateOne({
            _id: bill._id
        }, {
            $set: {
<<<<<<< HEAD
                btray: bill.btray
            }
        })

        //apagar a btray
        await btray.updateOne({
            _id: openTray._id
        }, {
            $set: {
                open: false
=======
                bandeja: bill.bandeja
            }
        })

        //apagar a bandeja
        await bandeja.updateOne({
            _id: bandejaAberta._id
        }, {
            $set: {
                aberta: false
>>>>>>> main
            }
        })
        return bill
    }
}

export async function checkBill() {
<<<<<<< HEAD
    const collection = await getCollection(DB_GARCONET, "bill");
    const bill = await collection.findOne({ open: true })
    console.log(bill)
=======
    const collection = await getCollection(DB_GARCONET, "conta");
    const bill = await collection.findOne({ aberta: true })

>>>>>>> main
    return bill
}

export async function getOpenTrays() {
<<<<<<< HEAD
    const collection = await getCollection(DB_GARCONET, "bill");
    //retornar todas as collections no find()
    const bill = await collection.find({ open: true }).toArray()
=======
    const collection = await getCollection(DB_GARCONET, "conta");
    //retornar todas as collections no find()
    const bill = await collection.find({ aberta: true }).toArray()
>>>>>>> main

    return bill
}

export async function decrementQuantity(body) {
<<<<<<< HEAD
    const products = await getCollection(DB_GARCONET, "products")
    const productFound = await products.findOne({ name: body.name })


    const collection = await getCollection(DB_GARCONET, "bill")
    const billFound = await collection.findOne({ _id: mongodb.ObjectId(body.idbill) })
    console.log(billFound)
    const trayFound = await billFound.btray.find(b => b._id.toHexString() === body.idbtray)
    console.log(trayFound)
    const itemFound = trayFound.items.find(a => a.name === body.name)
    if (itemFound.quantity > 0) {
        itemFound.quantity -= 1
        itemFound.value -= productFound.price
    }
    console.log(itemFound)
    const trayUpdated = await collection.updateOne(
        { _id: mongodb.ObjectId(body.idbill) }
        , {
            $set: {
                btray: billFound.btray
=======
    const products = await getCollection(DB_GARCONET, "produtos")
    const productFound = await products.findOne({ nome: body.nome })


    const collection = await getCollection(DB_GARCONET, "conta")
    const billFound = await collection.findOne({ _id: mongodb.ObjectId(body.idconta) })
    console.log(billFound)
    const trayFound = await billFound.bandeja.find(b => b._id.toHexString() === body.idbandeja)
    console.log(trayFound)
    const itemFound = trayFound.artigos.find(a => a.nome === body.nome)
    if (itemFound.quantidade > 0) {
        itemFound.quantidade -= 1
        itemFound.valor -= productFound.preco
    }
    console.log(itemFound)
    const trayUpdated = await collection.updateOne(
        { _id: mongodb.ObjectId(body.idconta) }
        , {
            $set: {
                bandeja: billFound.bandeja
>>>>>>> main
            }
        })
    return trayUpdated
}

export async function incrementQuantity(body) {
<<<<<<< HEAD
    const products = await getCollection(DB_GARCONET, "products")
    const productFound = await products.findOne({ name: body.name })


    const collection = await getCollection(DB_GARCONET, "bill")
    const billFound = await collection.findOne({ _id: mongodb.ObjectId(body.idbill) })
    console.log(billFound)
    const trayFound = await billFound.btray.find(b => b._id.toHexString() === body.idbtray)
    console.log(trayFound)
    const itemFound = trayFound.items.find(a => a.name === body.name)
    itemFound.quantity += 1
    itemFound.value += parseFloat(productFound.price)
    const trayUpdated = await collection.updateOne(
        { _id: mongodb.ObjectId(body.idbill) }
        , {
            $set: {
                btray: billFound.btray
=======
    const products = await getCollection(DB_GARCONET, "produtos")
    const productFound = await products.findOne({ nome: body.nome })


    const collection = await getCollection(DB_GARCONET, "conta")
    const billFound = await collection.findOne({ _id: mongodb.ObjectId(body.idconta) })
    console.log(billFound)
    const trayFound = await billFound.bandeja.find(b => b._id.toHexString() === body.idbandeja)
    console.log(trayFound)
    const itemFound = trayFound.artigos.find(a => a.nome === body.nome)
    itemFound.quantidade += 1
    itemFound.valor += parseFloat(productFound.preco)
    const trayUpdated = await collection.updateOne(
        { _id: mongodb.ObjectId(body.idconta) }
        , {
            $set: {
                bandeja: billFound.bandeja
>>>>>>> main
            }
        })
    return trayUpdated
}

export async function deliverOrder(body) {
<<<<<<< HEAD
    const collection = await getCollection(DB_GARCONET, "bill")
    const billFound = await collection.findOne({ _id: mongodb.ObjectId(body.idbill) })

    console.log(billFound)

    const trayFound = await billFound.btray.find(b => b._id.toHexString() === body.idbtray)
=======
    const collection = await getCollection(DB_GARCONET, "conta")
    const billFound = await collection.findOne({ _id: mongodb.ObjectId(body.idconta) })

    console.log(billFound)

    const trayFound = await billFound.bandeja.find(b => b._id.toHexString() === body.idbandeja)
>>>>>>> main
    
    console.log(trayFound)

    //provavelmente há um passo anterior
<<<<<<< HEAD
    trayFound.open = false

    const trayUpdated = await collection.updateOne(
        { _id: mongodb.ObjectId(body.idbill) }
        , {
            $set: {
                btray: billFound.btray
=======
    trayFound.aberta = false

    const trayUpdated = await collection.updateOne(
        { _id: mongodb.ObjectId(body.idconta) }
        , {
            $set: {
                bandeja: billFound.bandeja
>>>>>>> main
            }
        }
    )
    return trayUpdated
}

export async function killBill() {
<<<<<<< HEAD
    const collection = await getCollection(DB_GARCONET, "bill")
=======
    const collection = await getCollection(DB_GARCONET, "conta")
>>>>>>> main
    

    //92% de certeza que isso não está do jeito que deveria
    await collection.updateOne(
        {
<<<<<<< HEAD
            open: true
        } , {
            $set: {
                open: false
=======
            aberta: true
        } , {
            $set: {
                aberta: false
>>>>>>> main
            }
        }
    )
}
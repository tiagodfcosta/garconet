import mongodb from 'mongodb';


// salvar uma constante mongo_client
const { MongoClient } = mongodb

//salvar uma constante com caminho para o servidor mongodb
const URI = 'mongodb://localhost:27017'

//constante com a nossa BD 
const DB_GARCONET = "authentication"

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

// função para encontrar utilizador por nome de utilizador
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

export async function insertProducts(products) {
    const collection = await getCollection(DB_GARCONET, "products");
    const res = await collection.insertMany(products);
    return res;
}

export async function findProducts() {
    const collection = await getCollection(DB_GARCONET, "products");
    const res = await collection.find().toArray()
    console.log(res);
    return res
}
// //função com problema
// export async function findBill() {
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

    const collection = await getCollection(DB_GARCONET, "btray");
    const tray = await collection.findOne({ open: true })
    let valores = { quantity: 0, value: 0, totalvalue: 0 }
    if (tray) {
        values = tray.items.reduce((acc, curr) => {
            return { quantity: acc.quantity + curr.quantity, value: acc.value + curr.value, totalvalue: 0 }
        }, { quantity: 0, value: 0, totalvalue: 0 })        
    }

    const bill = await getCollection(DB_GARCONET, "conta");
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
    
    }

    export async function getBillAmount() {
        const collection = await getCollection(DB_GARCONET, "conta");
        const bill = await collection.findOne({ open: true })
        let values;
        if (bill) {
            values = bill.btray.reduce((acc, curr) => {
                return acc + curr.items.reduce((acc, curr) => {
                    return acc + curr.value
                }, 0)
            }, 0)


   
        return values;
    
        }
    }

    export async function updateTray(info) {
        const collection = await getCollection(DB_GARCONET, "btray");

        //procura alguma bandeja que esteja como aberta
        let tray = await collection.findOne({ open: true })
        //se o id não existir, cria com as chaves abaixo
        if (!tray) {
            await collection.insertOne({
                open: true,
                creationDate: new Date(),
                items: [],
            })
            //a tray se torna a bandeja que foi criada
            tray = await collection.findOne({ open: true })
        }
        //checa se o artigo existe, se sim, atualiza a quantidade e o valor, se não, manda tudo pra dentro
        let item = tray.items.find((a) => a.name === info.name)
        if (item) {
            item.quantity += info.quantity
            item.value += info.value

        } else {
            tray.items.push(info)
        }
        //faz um update na collection com as mudanças acima
        await collection.updateOne({
            _id: tray._id
        }, {
            $set: {
                items: tray.items,

            }
        })

        return tray;
    }

    export async function createBill() {
        const openTray = await getCollection(DB_GARCONET, "btray")
        let open = await openTray.findOne({ open: true })

        if (open) {
            const collection = await getCollection(DB_GARCONET, "bill");
            //checar se existe conta aberta
            let bill = await collection.findOne({ open: true })
            //se não existir, criar uma com aberta: true, data de criação e bandejas: []
            if (!bill) {
                await collection.insertOne({
                    open: true,
                    creationDate: new Date(),
                    btray: []
                })
                //a tray se torna a conta que foi criada
                bill = await collection.findOne({ open: true })
            }
            //const com a collection bandeja
            const btray = await getCollection(DB_GARCONET, "btray")

            let openTray = await btray.findOne({ open: true })
            //adicionar a bandeja na conta
            bill.btray.push(openTray)
            //por fim, atualizar a conta
            await collection.updateOne({
                _id: bill._id
            }, {
                $set: {
                    btray: bill.btray
                }
            })

            //apagar a bandeja
            await btray.updateOne({
                _id: openTray._id
            }, {
                $set: {
                    open: false
                }
            })
            return bill
        }
    }

    export async function checkBill() {
        const collection = await getCollection(DB_GARCONET, "bill");
        const bill = await collection.findOne({ open: true })

        return bill
    }

    export async function getOpenTrays() {
        const collection = await getCollection(DB_GARCONET, "bill");
        //retornar todas as collections no find()
        const bill = await collection.find({ open: true }).toArray()

        return bill
    }

    export async function decrementQuantity(body) {
        const products = await getCollection(DB_GARCONET, "products")
        const productFound = await products.findOne({nome: body.name})


        const collection = await getCollection(DB_GARCONET, "bill")
        const billFound = await collection.findOne({_id: mongodb.ObjectId(body.idbill)})
        console.log(billFound)
        const trayFound = await billFound.btray.find(b => b._id.toHexString() === body.idbtray)
        console.log(trayFound)
        const itemFound = trayFound.items.find(a => a.name === body.name)
        if (itemFound.quantity > 0) {
            itemFound.quantity -= 1
            itemFound.value -= productFound.price
        }
        const trayUpdated = await collection.updateOne(
            {_id: mongodb.ObjectId(body.idbill)}
            , {
                $set: {
                    btray: billFound.btray
                }
        })
        return trayUpdated
    }  

    export async function incrementQuantity(body) {
        const products = await getCollection(DB_GARCONET, "products")
        const productFound = await products.findOne({nome: body.name})


        const collection = await getCollection(DB_GARCONET, "bill")
        const billFound = await collection.findOne({_id: mongodb.ObjectId(body.idbill)})
        console.log(billFound)
        const trayFound = await billFound.btray.find(b => b._id.toHexString() === body.idbtray)
        console.log(trayFound)
        const itemFound = trayFound.items.find(a => a.name === body.name)
        itemFound.quantity += 1
        itemFound.value += parseFloat(productFound.price)
        const trayUpdated = await collection.updateOne(
            {_id: mongodb.ObjectId(body.idbill)}
            , {
                $set: {
                    btray: billFound.btray
                }
        })
        return trayUpdated
    }  
    

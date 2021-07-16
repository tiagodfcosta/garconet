import mongodb from 'mongodb';


// salvar uma constante mongo_client
const { MongoClient } = mongodb

//salvar uma constante com caminho para o servidor mongodb
const URI = 'mongodb://localhost:27017'

//constante com a nossa BD 
const DB_GARCONET = "autenticacao"

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

export async function insertProducts(produtos) {
    const collection = await getCollection(DB_GARCONET, "produtos");
    const res = await collection.insertMany(produtos);
    return res;
}

export async function findProducts() {
    const collection = await getCollection(DB_GARCONET, "produtos");
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

    const collection = await getCollection(DB_GARCONET, "bandeja");
    const tray = await collection.findOne({ aberta: true })
    let valores = { quantidade: 0, valor: 0, valortotal: 0 }
    if (tray) {
        valores = tray.artigos.reduce((acc, curr) => {
            return { quantidade: acc.quantidade + curr.quantidade, valor: acc.valor + curr.valor, valortotal: 0 }
        }, { quantidade: 0, valor: 0, valortotal: 0 })
    } else {

    }

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

    }
}

export async function updateTray(info) {
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
    }
    //faz um update na collection com as mudanças acima
    await collection.updateOne({
        _id: tray._id
    }, {
        $set: {
            artigos: tray.artigos,

        }
    })

    return tray;
}

export async function createBill() {
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
        await collection.updateOne({
            _id: bill._id
        }, {
            $set: {
                bandeja: bill.bandeja
            }
        })

        //apagar a bandeja
        await bandeja.updateOne({
            _id: bandejaAberta._id
        }, {
            $set: {
                aberta: false
            }
        })
        return bill
    }
}

export async function checkBill() {
    const collection = await getCollection(DB_GARCONET, "conta");
    const bill = await collection.findOne({ aberta: true })

    return bill
}

export async function getOpenTrays() {
    const collection = await getCollection(DB_GARCONET, "conta");
    //retornar todas as collections no find()
    const bill = await collection.find({ aberta: true }).toArray()

    return bill
}

export async function decrementQuantity(body) {
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
            }
        })
    return trayUpdated
}

export async function incrementQuantity(body) {
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
            }
        })
    return trayUpdated
}

export async function deliverOrder(body) {
    const collection = await getCollection(DB_GARCONET, "conta")
    const billFound = await collection.findOne({ _id: mongodb.ObjectId(body.idconta) })

    console.log(billFound)

    const trayFound = await billFound.bandeja.find(b => b._id.toHexString() === body.idbandeja)
    
    console.log(trayFound)

    //provavelmente há um passo anterior
    trayFound.aberta = false

    const trayUpdated = await collection.updateOne(
        { _id: mongodb.ObjectId(body.idconta) }
        , {
            $set: {
                bandeja: billFound.bandeja
            }
        }
    )
    return trayUpdated
}

export async function killBill() {
    const collection = await getCollection(DB_GARCONET, "conta")
    

    //92% de certeza que isso não está do jeito que deveria
    await collection.updateOne(
        {
            aberta: true
        } , {
            $set: {
                aberta: false
            }
        }
    )
}
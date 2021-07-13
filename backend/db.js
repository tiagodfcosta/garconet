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

export async function findTray() {
    const collection = await getCollection(DB_GARCONET, "bandeja");
    const tray = await collection.findOne({ aberta: true })
    if (tray) {
        let valores = tray.artigos.reduce((acc, curr) => {
            return { quantidade: acc.quantidade + curr.quantidade, valor: acc.valor + curr.valor }
        }, { quantidade: 0, valor: 0 })

        return valores;
    }
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
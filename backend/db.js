import mongodb from 'mongodb';

// salvar uma constante mongo_client
const {MongoClient} = mongodb

//salvar uma constante com caminho para o servidor mongodb
const URI = 'mongodb://localhost:27017'

//constante com a nossa BD 
const DB_GARCONET = "autenticacao"

//Declarar o client
let client

// função que liga o backEnd com o servidor
async function connect(uri) {
    try {
        if (client) return client
       
        client = new MongoClient(uri, {
             //evita que com os novos updates a função deixe de funcionar (useUnifiedTopology: true)
            useUnifiedTopology: true
        })
        await client.connect();
        return client;
    } catch (err){
        console.log(err)
    }
}

// função que retorna o histórico de ligaçoes realizadas com o server ?????
// Vai receber uma bd e uma string que representa uma colacao 

async  function getCollection(dbName, colName){
    const client = await connect(URI)
    const db = client.db(dbName)
    return db.collection(colName)
}

// função de criar usuário

async function insertUser(user){
    const collection = await getCollection(DB_GARCONET, "users");
    //TODO para futuro -- encriptação 
    // user.password = await bcrypt.hash(user.password, saltRounds);

    const res = await collection.insertOne(user);
    return res.insertedId;   
}

// função para encontrar utilizador por nome de utilizador
async function findUser(username) {
    const collection = await getCollection(DB_GARCONET, "users");
    const res = await collection.findOne({username});
    return res;
}


// função para encontrar utilizador por id
async function findUserById(id) {
    const collection = await getCollection(DB_GARCONET, "users");
    const res = await collection.findOne({_id: mongodb.ObjectId(id)})
    return res;
}

async function insertSession(uid) {
    const collection = await getCollection(DB_GARCONET, "sessions");
    const res = await collection.insertOne({
        uid,
        expiresAt: new Date(new Date().valueOf() + (5 * 60 * 1000))
    })
    return res.insertedId
}
obter bandeja aberta
se não existir, cria nova bandeja
adiciona os artigos ou artigo a bandeja
atualiza a bandeja na base

let tray = collection.findOne({aberta: true})
if (!tray) {
    collection.insertOne({
        aberta: true,
        dataCriacao: new Date(),
        artigos: []
    })
    tray = collection.findOne({aberta: true})
}

let item = tray.artigos.find((a) => a.nome === req.body.nome)
if (item) {
    item.quantity += req.body.quantity
} else {
    tray.artigos.push(req.body)
}

collection.updateOne({
    _id: tray._id
}, {
    $set: {
        artigos: tray.artigos
    }
})
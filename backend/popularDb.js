import * as fs from 'fs/promises'
import {insertProducts} from "./db.js"

async function ola() {
    const produtos = await fs.readFile("./produtos.json")
    const json =  JSON.parse(produtos.toString())
    insertProducts(json.bebidas);

}

ola().then(() => console.log('ola'))


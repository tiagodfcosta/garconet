import * as fs from 'fs/promises'
import {insertProducts} from "./db.js"

async function ola() {
    const products = await fs.readFile("./produtos.json")
    const json =  JSON.parse(products.toString())
    insertProducts(json.products);

}

ola().then(() => console.log('ola'))
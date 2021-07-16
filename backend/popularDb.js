import * as fs from 'fs/promises'
import {insertProducts} from "./db.js"

async function ola() {
<<<<<<< HEAD
    const products = await fs.readFile("./produtos.json")
    const json =  JSON.parse(products.toString())
    insertProducts(json.products);
=======
    const produtos = await fs.readFile("./produtos.json")
    const json =  JSON.parse(produtos.toString())
    insertProducts(json.produtos);
>>>>>>> main

}

ola().then(() => console.log('ola'))


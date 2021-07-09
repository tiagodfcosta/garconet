import React, { useEffect, useState } from "react"
import {
    BrowserRouter as Router,
    useParams
  } from "react-router-dom";

export function MenuPart(props) {
    const {category} = useParams();
  
    const [prods, setProds] = useState([])    
  
    useEffect(() => {
      fetch("/category")
      .then(products => products.json())
      .then(json => setProds(json.products))
  
    }, [])
  
    return (
      <div>
        <ul>{prods.map(e => {
          return <li>
            {e.nome}<br/>
            {e.preço}<br/>
            <button>Selecionar</button>
          </li>
        })}</ul>
        <p>Quantidade de itens: {props.quantidade}</p>
        <p>Valor total: {props.valortotal}</p>
      </div>
    )
  }
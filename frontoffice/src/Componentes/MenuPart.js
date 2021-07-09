import React, { useEffect, useState } from "react"
import {
    BrowserRouter as Router,
    useParams
  } from "react-router-dom";

export function MenuPart() {
    const {category} = useParams();
  
    const [prods, setProds] = useState([])    
  
    useEffect(() => {
      fetch("/category")
      .then(products => products.json())
      .then(json => setProds(json.products))
  
    }, [])
  
    return (
      <ul>{prods.map(e => {
        return <li>{e.nome}, {e.preço}</li>
      })}</ul>
    )
  }
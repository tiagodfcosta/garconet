import React, { useEffect, useState } from "react"
import {
    BrowserRouter as Router,
    useParams
  } from "react-router-dom";
import Popup from "./popUp";

export function MenuPart(props) {
    const {category} = useParams();
  
    const [prods, setProds] = useState([]) 
    
    const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  
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
            <input type="button" value="Selecionar" onClick={togglePopup}/>
          </li>
        })}</ul> 
        {isOpen && <Popup
      content={<>
        <b>Coquinhaaa</b>
        <p>Uma bebiba maravilhosa que mata sua sede e engorda um pouquinho.</p>
        <button>Adicionar ao pedido</button>
      </>}
      handleClose={togglePopup}
    />}       
      </div>
    )
  }
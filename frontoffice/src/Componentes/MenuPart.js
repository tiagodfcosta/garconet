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

    const [selectedProduct, setSelectProduct] = useState("");

    const [quantity, setQuantity] = useState(1);

   
 
  const togglePopup = (e) => {
    setIsOpen(!isOpen);
    setQuantity(1);    
    setSelectProduct(e);   
  }

  const reduceQuantity = () => {
    if (quantity >=1) {
      setQuantity(quantity - 1);
    }
  }

  const addQuantity = () => {
    setQuantity(quantity + 1);    
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
            <input type="button" value="Selecionar" onClick={() => togglePopup(e)}/>
          </li>
        })}</ul> 
        {isOpen && <Popup
      content={<>
        <b>{selectedProduct.nome}</b>
        <p>Uma bebiba maravilhosa que mata sua sede e engorda um pouquinho.</p>
        <button onClick={reduceQuantity}>-</button>
        <p>{quantity}</p>
        <button onClick={addQuantity}>+</button> <br></br>
        <button onClick={() => props.handleState(quantity, parseFloat(selectedProduct.preço) * quantity)}>Adicionar ao pedido</button>
      </>}
      handleClose={togglePopup}
    />}       
      </div>
    )
  }
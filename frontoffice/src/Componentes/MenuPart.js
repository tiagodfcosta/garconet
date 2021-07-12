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

    const [selectedProduct, setSelectProduct] = useState(undefined);

    const [quantity, setQuantity] = useState(1);

   
  //função meio maluca que escreve o produto atual que foi clicado, se algo der ruim, checar aqui
  const togglePopup = async (e) => {
    setIsOpen(!isOpen);           
    setSelectProduct(e);      
  
    if (selectedProduct !== undefined) {
      await fetch("/tray", {
        method: "POST",
        body: JSON.stringify(
          {"nome": selectedProduct.nome,
          "quantidade": quantity,
          "valor": selectedProduct.preço * quantity         
          }),
        headers: {
          "Content-Type": "application/json"
          }
      })
    }
    setQuantity(1);
  }

  const reduceQuantity = () => {
    if (quantity > 1) {
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
        <button onClick={() => { 
          props.handleState(quantity, parseFloat(selectedProduct.preço) * quantity); 
          //props.updateTray(); 
          togglePopup() }}>Adicionar ao pedido</button>
      </>}
      handleClose={togglePopup}
    />}       
      </div>
    )
  }
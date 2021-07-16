import React, { useEffect, useState } from "react"
import {
    BrowserRouter as Router,
    useParams
  } from "react-router-dom";
import Popup from "./popUp";
import "./menuPart.css"


export function menuPart(props) {
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
          {"nome": selectedProduct.name,
          "quantidade": quantity,
          "valor": selectedProduct.price * quantity            
          }),
        headers: {
          "Content-Type": "application/json"
          }
      })
    }
    setQuantity(1);
  }

  const togglePopupX = async (e) => {
    setIsOpen(!isOpen);           
    setSelectProduct(e);   
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
      .then(json => {
        const prods = json.products.filter(e => e.categories === category)
        setProds(prods)
      })  
    }, [])   
    
    return (
      <div>
        <ul>{prods.map(e => {
          return <li>
            <img className="products" src={e.image}/>
            {e.name}<br/>
            {e.price}€<br/>
            <input type="button" value="select" onClick={() => togglePopup(e)}/>
          </li>
        })}</ul>
        {isOpen && <Popup
      content={<>
        <b>{selectedProduct.name}</b>
        <p>{selectedProduct.description}</p>
        <img className="products" src={selectedProduct.imagem}/> <br/>
        <button onClick={reduceQuantity}>-</button>
        <p>{quantity}</p>
        <button onClick={addQuantity}>+</button> <br></br>
        <button onClick={() => { 
          props.handleState(quantity, parseFloat(selectedProduct.price) * quantity); 
          //props.updateTray(); 
          togglePopup() }}>Adicionar ao pedido</button>
      </>}
      handleClose={togglePopupX}
    />}       
      </div>
    )
  }
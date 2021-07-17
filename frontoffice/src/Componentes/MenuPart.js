import React, { useEffect, useState } from "react"
import {
    BrowserRouter as Router,
    useParams
  } from "react-router-dom";
import Popup from "./popUp";
import "./MenuPart.css"

export function MenuPart(props) {
    const {category} = useParams();
  
    const [prods, setProds] = useState([]) 
    
    const [isOpen, setIsOpen] = useState(false);

    const [selectedProduct, setSelectProduct] = useState(undefined);

    const [quantity, setQuantity] = useState(1);

  const togglePopup = async (e) => {
    setIsOpen(!isOpen);           
    setSelectProduct(e);      
  
    if (selectedProduct !== undefined) {
      await fetch("/tray", {
        method: "POST",
        body: JSON.stringify(
          {"name": selectedProduct.name,
          "quantity": quantity,
          "value": selectedProduct.price * quantity            
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
    setQuantity(0);
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
            <img className="products" alt="products" src={e.image}/>
            <br/>
            {e.name}
            <br/>
            {e.price}€
            <br/>
            <input type="button" value="Select" onClick={() => togglePopup(e)}/>
            <br/>
          </li>
        })}</ul>
        {isOpen && <Popup
      content={<>
        <b>{selectedProduct.name}</b>
        <p>{selectedProduct.description}</p>
        <img className="products" alt="products" src={selectedProduct.image}/> <br/>
        <div className="setquantity">
          <button className="increment-and-decrement" onClick={reduceQuantity}>-</button>
          <p>{quantity}</p>
          <button className="increment-and-decrement" onClick={addQuantity}>+</button> <br></br>
        </div>
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
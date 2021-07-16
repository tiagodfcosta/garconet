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
          {"nome": selectedProduct.nome,
          "quantidade": quantity,
          "valor": selectedProduct.preco * quantity            
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
        const prods = json.products.filter(e => e.categoria === category)
        setProds(prods)
      })  
    }, [])   
    
    return (
      <div>
        <ul>{prods.map(e => {
          return <li>
            <img className="produtos" src={e.imagem}/>
            {e.nome}<br/>
            {e.preco}€<br/>
            <input type="button" value="Selecionar" onClick={() => togglePopup(e)}/>
          </li>
        })}</ul>
        {isOpen && <Popup
      content={<>
        <b>{selectedProduct.nome}</b>
        <p>{selectedProduct.descricao}</p>
        <img className="produtos" src={selectedProduct.imagem}/> <br/>
        <button onClick={reduceQuantity}>-</button>
        <p>{quantity}</p>
        <button onClick={addQuantity}>+</button> <br></br>
        <button onClick={() => { 
          props.handleState(quantity, parseFloat(selectedProduct.preco) * quantity); 
          //props.updateTray(); 
          togglePopup() }}>Adicionar ao pedido</button>
      </>}
      handleClose={togglePopupX}
    />}       
      </div>
    )
  }
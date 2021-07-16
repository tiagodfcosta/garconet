import React, { useEffect, useState } from "react"
import {
    BrowserRouter as Router,
    useParams
  } from "react-router-dom";
import Popup from "./popUp";
import "./MenuPart.css"

<<<<<<< HEAD
=======

>>>>>>> main
export function MenuPart(props) {
    const {category} = useParams();
  
    const [prods, setProds] = useState([]) 
    
    const [isOpen, setIsOpen] = useState(false);

    const [selectedProduct, setSelectProduct] = useState(undefined);

    const [quantity, setQuantity] = useState(1);

<<<<<<< HEAD
=======
   
  
>>>>>>> main
  const togglePopup = async (e) => {
    setIsOpen(!isOpen);           
    setSelectProduct(e);      
  
    if (selectedProduct !== undefined) {
      await fetch("/tray", {
        method: "POST",
        body: JSON.stringify(
<<<<<<< HEAD
          {"name": selectedProduct.name,
          "quantity": quantity,
          "value": selectedProduct.price * quantity            
=======
          {"nome": selectedProduct.nome,
          "quantidade": quantity,
          "valor": selectedProduct.preco * quantity            
>>>>>>> main
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
<<<<<<< HEAD
=======

  
>>>>>>> main
    useEffect(() => {
      fetch("/category")
      .then(products => products.json())
      .then(json => {
<<<<<<< HEAD
        const prods = json.products.filter(e => e.categories === category)
=======
        const prods = json.products.filter(e => e.categoria === category)
>>>>>>> main
        setProds(prods)
      })  
    }, [])   
    
    return (
      <div>
        <ul>{prods.map(e => {
          return <li>
<<<<<<< HEAD
            <img className="products" alt="products" src={e.image}/>
            {e.name}<br/>
            {e.price}€<br/>
            <input type="button" value="Select" onClick={() => togglePopup(e)}/>
=======
            <img className="produtos" src={e.imagem}/>
            {e.nome}<br/>
            {e.preco}€<br/>
            <input type="button" value="Selecionar" onClick={() => togglePopup(e)}/>
>>>>>>> main
          </li>
        })}</ul>
        {isOpen && <Popup
      content={<>
<<<<<<< HEAD
        <b>{selectedProduct.name}</b>
        <p>{selectedProduct.description}</p>
        <img className="products" alt="products" src={selectedProduct.image}/> <br/>
=======
        <b>{selectedProduct.nome}</b>
        <p>{selectedProduct.descricao}</p>
        <img className="produtos" src={selectedProduct.imagem}/> <br/>
>>>>>>> main
        <button onClick={reduceQuantity}>-</button>
        <p>{quantity}</p>
        <button onClick={addQuantity}>+</button> <br></br>
        <button onClick={() => { 
<<<<<<< HEAD
          props.handleState(quantity, parseFloat(selectedProduct.price) * quantity); 
=======
          props.handleState(quantity, parseFloat(selectedProduct.preco) * quantity); 
>>>>>>> main
          //props.updateTray(); 
          togglePopup() }}>Adicionar ao pedido</button>
      </>}
      handleClose={togglePopupX}
    />}       
      </div>
    )
  }
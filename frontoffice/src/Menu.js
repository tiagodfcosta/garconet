import React from "react";
import {
    Link,
  } from "react-router-dom";
import "./Menu.css";
  
export class Menu extends React.Component{
    constructor(props){
        super(props);
    }    

    //checar se falta algo depois :)
    handleOrder(props){
        fetch("/order", {
            method: "POST"
        })
        .then(res => this.props.adicionarvalor())
        .then(res => this.props.stateToZero())
    }
    

    render(){
        return (
            <div>
                <div>
                    <Link to="/menu/bebidas"><button >Bebidas</button></Link>
                    <Link to="/menu/aperitivos"><button >Aperitivos</button></Link>
                    <Link to="/menu/comida"><button >Comida</button></Link>
                    <Link to="/menu/sobremesa"><button >Sobremesa</button></Link>            
                </div>
                <div>
                    <button className={this.props.valortotal === 0 ? "disable" : "enable"} 
                    onClick={() => this.handleOrder()}>Submeter pedido</button>  
                </div>                
            </div>
        )
    }
}


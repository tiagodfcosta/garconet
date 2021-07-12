import React from "react";
import {
    Link,
  } from "react-router-dom";
  
export class Menu extends React.Component{
    constructor(props){
        super(props);
    }

    //checar se falta algo depois :)
    handleOrder(){
        fetch("/order", {
            method: "POST",
            body: {"quantidade de itens":this.props.quantidadeitens, "valor total": this.props.valortotal},
            headers: {
                "Content-Type": "application/json"
            }
        })
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
                    <button onClick={() => this.handleOrder}>Fazer pedido</button>  
                </div>                
            </div>
        )
    }
}


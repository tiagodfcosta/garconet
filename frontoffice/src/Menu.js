import React from "react";
import {
    Link,
  } from "react-router-dom";
  
export class Menu extends React.Component{
    constructor(props){
        super(props);
    }


    handleClick(){

    }

    render(){
        return (
            <div>
                <Link to="/menu/bebidas"><button >Bebidas</button></Link>
                <Link to="/menu/aperitivos"><button >Aperitivos</button></Link>
                <Link to="/menu/comida"><button >Comida</button></Link>
                <Link to="/menu/sobremesa"><button >Sobremesa</button></Link>
                <p>Quantidade de itens: {this.props.quantidade}</p>
                <p>Valor total: {this.props.valortotal}</p>
            </div>
        )
    }
}


import React from "react";
import {
    Link,
} from "react-router-dom";
import "./Menu.css";

export class Menu extends React.Component {
    constructor(props) {
        super(props);
    }

    //checar se falta algo depois :)
    handleOrder(props) {
        fetch("/order", {
            method: "POST"
        })
            .then(res => this.props.addvalue())
            .then(res => this.props.stateToZero())
    }


    render() {
        return (
            <div className="background">
                <img className="logorestaurant" src="tascadajoanasemfundo.png"></img>
                <div className="corpo">
                    <div className="categories">

                        <h2 className="quequeres" >O que queres comer?</h2>
                        <Link to="/menu/bebidas"><button >Bebidas</button></Link>
                        <Link to="/menu/aperitivos"><button >Aperitivos</button></Link>
                        <br />
                        <Link to="/menu/comida"><button >Comida</button></Link>
                        <Link to="/menu/sobremesa"><button >Sobremesa</button></Link>
                    </div>
                    <div>
                        <button 
                            className={this.props.totalvalue === 0 ? "disable" : "enable"}
                            onClick={() => this.handleOrder()} 
                            disabled={!this.props.totalvalue}>
                                Submeter pedido
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}


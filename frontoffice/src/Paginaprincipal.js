import React from "react";
import {Menu} from "./Menu";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

  
class PaginaPrincipal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "quantidadedeitens": 0,
            "valortotal": 0
        }
    }

    render() {
        return (
            <>
            <div>
            <h2>Restaurante da Gertrudes</h2>
                <img className="logogarconet" src ="logogarconet.png"/>
                <div>
                    <p>burger menu do canto</p>
                </div>
                <br></br>
                <Link to="/menu"><button>MENU</button></Link>
                <button>Ver conta atual</button>
                <button>Fechar a conta</button>
                <button>Pedir ajuda</button>
                <p>Quantidade de itens: {this.state.quantidadedeitens}</p>
                <p>Valor total: {this.state.valortotal}</p>
                
            </div>
            </>
        )
    }
}



export default PaginaPrincipal;
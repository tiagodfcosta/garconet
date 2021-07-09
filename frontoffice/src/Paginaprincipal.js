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
            </div>
            </>
        )
    }
}



export default PaginaPrincipal;
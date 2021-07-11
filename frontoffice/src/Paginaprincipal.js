import React from "react";
import { Menu } from "./Menu";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import ContaAtual from "./Componentes/Contaatual";


class PaginaPrincipal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }

    togglePopup = () => {
        this.setState((state) => ({
            isOpen: !(state.isOpen)
        }));
    }    

    render() {
        return (
            <>
                <div>
                    <h2>Restaurante da Gertrudes</h2>
                    <img className="logogarconet" src="logogarconet.png" />
                    <div>
                        <p>burger menu do canto</p>
                    </div>
                    <br></br>
                    <Link to="/menu"><button>MENU</button></Link>
                    <button onClick={this.togglePopup}>Ver conta atual</button>
                    <button>Fechar a conta</button>
                    <button>Pedir ajuda</button>
                    {this.state.isOpen && <ContaAtual
                        content={<>
                            <b>Aqui ficará a bandeja</b>
                            <p>Uma bela bandeja.</p>
                                                     
                        </>}
                        handleClose={() => this.togglePopup()}
                    />}
                </div>
            </>
        )
    }
}



export default PaginaPrincipal;
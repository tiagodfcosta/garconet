import React from "react";
import { Menu } from "./Menu";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import ContaAtual from "./Componentes/Contaatual.js";


class PaginaPrincipal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            conta: ""
        }
    }

    togglePopup = () => {
        this.setState((state) => ({
            isOpen: !(state.isOpen)
        }));
    }

    getBill() {
        //fetch para buscar conta
        fetch("/verconta")
            .then(res => res.json())
            .then(res => {
                console.log(res)
                this.setState((state) => ({
                    conta: JSON.stringify(res)
                }))
            })
    }

    componentDidMount() {
        this.getBill()
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
                            <b>Os seus pedidos</b>
                            <p>{this.state.conta}</p>

                        </>}
                        handleClose={() => this.togglePopup()}
                    />}
                </div>
            </>
        )
    }
}



export default PaginaPrincipal;
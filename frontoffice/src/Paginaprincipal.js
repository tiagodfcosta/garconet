import React from "react";
import { Menu } from "./Menu";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import ContaAtual from "./Componentes/Contaatual.js";
import { format, compareAsc } from 'date-fns'
import CloseTab from "./Closetab"
import "./Paginaprincipal.css"

class PaginaPrincipal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            bill: []
        }
    }

    togglePopup = () => {
        this.getBill()
        this.setState((state) => ({
            isOpen: !(state.isOpen)
        }));
    }

    getBill() {
        fetch("/seebill")
            .then(res => res.json())
            .then(res => {
                this.setState((state) => ({
                    bill: res.btray.map((e) => ({
                        "ofcreationdate": e.creationDate,
                        "products": e.items
                    }))
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
                    
                    <img className="logogarconet" alt="logogarconet" src="garconetlogo.png" />

                    <br></br>
                    <div className="botoes">
                        <Link to="/menu"><button >MENU</button></Link>
                        <button onClick={this.togglePopup}>Ver conta atual</button>
                        <Link to="/closetab"><button>Fechar a conta</button></Link>                        
                    </div>
                    <button className="pedirajuda" >Pedir ajuda</button>
                    {this.state.isOpen && <ContaAtual
                        content={<>
                            <b>Os seus pedidos</b>
                            <ol>
                                {this.state.bill.map((e) => {
                                return (
                                    <li>
                                        <p>Pedido: {
                                            format(new Date(e.ofcreationdate), 'dd/MM/yyyy HH:mm')
                                        }</p>
                                        <p>{(
                                            e.products.map(e => <p>{e.quantity} x {e.name} - {e.value.toFixed(2)} €</p>) 
                                        )}</p>
                                    </li>
                                )}
                                )}
                            </ol>
                            <p>Valor total: {this.props.addedvalue.toFixed(2)} €</p>
                        </>}
                        handleClose={() => this.togglePopup()}
                    />}
                    
                </div>
            </>
        )
    }
}

export default PaginaPrincipal;
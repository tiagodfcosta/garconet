import React from "react";
import { Menu } from "./Menu";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import actualBill from "./Components/actualBill";
import { format, compareAsc } from 'date-fns'

class mainPage extends React.Component {
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
        //fetch para buscar conta
        fetch("/seebill")
            .then(res => res.json())
            .then(res => {
                    this.setState((state) => ({
                        conta: res.bandeja.map((e) => ({
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
                    <img className="logogarconet" src="logogarconet.png" />
                    <div>
                        <p>burger menu do canto</p>
                    </div>
                    <br></br>
                    <Link to="/menu"><button>MENU</button></Link>
                    <button onClick={this.togglePopup}>Ver conta atual</button>
                    <button>Fechar a conta</button>
                    <button>Pedir ajuda</button>
                    {this.state.isOpen && <ActualBill
                        content={<>
                            <b>Os seus pedidos</b>
                            
                            <ol>
                                {this.state.conta.map((e) => {
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

export default mainPage;
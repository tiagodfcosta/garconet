import React from "react"
import { format, compareAsc } from 'date-fns'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import "./Closetab.css"

class CloseTab extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bill: []
        }

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

    componentDidMount = () => {
        this.getBill()
    }

    killBill() {
        fetch("/killbill")
    }
    
    render() {
        return (
            <div className="background">
                <img className="logorestaurant" src="tascadajoanasemfundo.png"></img>
                <br></br>
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
                            <p><b>Escolha um método de pagamento:</b></p>
                            <div className="payment-methods">
                                <p><input type="radio" value="Credit" name="payment" /> Credit Card</p>
                                <p><input type="radio" value="MbWay" name="payment" /> MBWay</p>
                                <p><input type="radio" value="Body" name="payment" /> Lavar loiça</p>
                            </div>
                            <br></br>
                            <Link to="/"><button className="pagar" onClick={() => this.killBill()} className="payment">Pagar</button></Link>          
            </div>
        )
    }
}

export default CloseTab
import React from "react"
import { format, compareAsc } from 'date-fns'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

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
                    conta: res.btray.map((e) => ({
                        "ofcreationdate": e.creationdate,
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
            <div>
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
                            <input type="radio" value="Credit" name="payment" /> Credit Card
                            <input type="radio" value="MbWay" name="payment" /> MBWay
                            <input type="radio" value="Body" name="payment" checked/> Lavar loiça
                            <Link to="/"><button onClick={() => this.killBill()}>Pagar</button></Link>          
            </div>
        )
    }
}

export default CloseTab
import React from "react"
import { format, compareAsc } from 'date-fns'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

<<<<<<< HEAD
=======



>>>>>>> main
class CloseTab extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
<<<<<<< HEAD
            bill: []
=======
            conta: []
>>>>>>> main
        }

    }

<<<<<<< HEAD
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
=======
    

    getBill() {
        fetch("/verconta")
            .then(res => res.json())
            .then(res => {
                console.log(res)
                
                    this.setState((state) => ({
                        conta: res.bandeja.map((e) => ({
                            "datadecriacao": e.dataCriacao,
                            "produtos": e.artigos
                        }))
                    }))
>>>>>>> main
                
            })          
    }

    componentDidMount = () => {
        this.getBill()
    }

    killBill() {
        fetch("/killbill")
<<<<<<< HEAD
=======
        
>>>>>>> main
    }
    
    render() {
        return (
            <div>
                <b>Os seus pedidos</b>
<<<<<<< HEAD
                            <ol>
                                {this.state.bill.map((e) => {
                                return (
                                    <li>
                                        <p>Pedido: {
                                            format(new Date(e.ofcreationdate), 'dd/MM/yyyy HH:mm')
                                        }</p>
                                        <p>{(
                                            e.products.map(e => <p>{e.quantity} x {e.name} - {e.value.toFixed(2)} €</p>) 
=======
                            
                            <ol>
                                {this.state.conta.map((e) => {
                                return (
                                    <li>
                                        <p>Pedido: {
                                            format(new Date(e.datadecriacao), 'dd/MM/yyyy HH:mm')
                                        }</p>
                                        <p>{(
                                            e.produtos.map(e => <p>{e.quantidade} x {e.nome} - {e.valor.toFixed(2)} €</p>) 
>>>>>>> main
                                        )}</p>
                                    </li>
                                )}
                                )}
                            </ol>
<<<<<<< HEAD
                            <input type="radio" value="Credit" name="payment" /> Credit Card
                            <input type="radio" value="MbWay" name="payment" /> MBWay
                            <input type="radio" value="Body" name="payment" checked/> Lavar loiça
                            <Link to="/"><button onClick={() => this.killBill()}>Pagar</button></Link>          
=======
                            
                            <input type="radio" value="Credit" name="payment" /> Credit Card
                            <input type="radio" value="MbWay" name="payment" /> MBWay
                            <input type="radio" value="Body" name="payment" checked/> Lavar loiça

                            <Link to="/"><button onClick={() => this.killBill()}>Pagar</button></Link>
                            
>>>>>>> main
            </div>
        )
    }
}

export default CloseTab
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
            conta: []
        }

    }

    

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
                                {this.state.conta.map((e) => {
                                return (
                                    <li>
                                        <p>Pedido: {
                                            format(new Date(e.datadecriacao), 'dd/MM/yyyy HH:mm')
                                        }</p>
                                        <p>{(
                                            e.produtos.map(e => <p>{e.quantidade} x {e.nome} - {e.valor.toFixed(2)} €</p>) 
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
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


class PaginaPrincipal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            conta: []
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
                        conta: res.bandeja.map((e) => ({
                            "datadecriacao": e.dataCriacao,
                            "produtos": e.artigos
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
                    {this.state.isOpen && <ContaAtual
                        content={<>
                            <b>Os seus pedidos</b>
                            
                            <ol>
                                {this.state.conta.map((e) => {
                                return (
                                    <li>
                                        <p>Pedido: {
                                            format(new Date(e.datadecriacao), 'dd/MM/yyyy HH:mm')
                                        }</p>
                                        <p>{(
                                            e.produtos.map(e => <p>{e.quantidade} x {e.nome} - {e.valor} €</p>) 
                                        )}</p>
                                    </li>
                                )}
                                )}
                            </ol>
                            <p>Valor total: {this.props.valoradicionado.toFixed(2)} €</p>
                        </>}
                        handleClose={() => this.togglePopup()}
                    />}
                </div>
            </>
        )
    }
}

export default PaginaPrincipal;
import { format } from 'date-fns'
import React from "react"
import Popup from "./popUp"

class Restaurante extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            contas: [],
            isOpen: false,
            datadobotao: ""
        }
    }

    findTrays() {
        fetch("/opentrays")
            .then(res => res.json())
            .then(json => this.setState({
                contas: json
            }))

    }

    componentDidMount() {
        this.findTrays()
        setInterval(() => {
            this.findTrays()
        }, 1000)
    }

    togglePopupX = async (e) => {
        this.setState((state) => ({
            isOpen: !state.isOpen,
            datadobotao: e.dataCriacao

        }));
        console.log(this.state.datadobotao)

    }

    decrement(e, b, a) {
        fetch("/decrement", {
            method: "POST",
            body: JSON.stringify({ idconta: e._id, idbandeja: b._id, nome: a.nome }),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    // increment(e, b, a) {
    //     fetch("/increment", {
    //         method: "POST",
    //         body: JSON.stringify({ idconta: e._id, idbandeja: b._id, nome: a.nome }),
    //         headers: {
    //             "Content-Type": "application/json"
    //         }
    //     })
    // }

    deliverOrder(e, b) {
        fetch("/deliver", {
            method: "POST",
            body: JSON.stringify({idconta: e._id, idbandeja: b._id}),
            headers: {
                "Content-Type": "application/json"
            }
        })
        
    }


    render() {
        return (
            <div>

                {this.state.contas.map(e => e.bandeja.filter(e => e.aberta === true).map(e =>
                    (<button onClick={() => this.togglePopupX(e)}>{format(new Date(e.dataCriacao), 'dd/MM/yyyy HH:mm')}</button>)
                ))}

                {this.state.isOpen && <Popup
                    content={<>

                        <b>{this.state.contas
                            .map(e => e.bandeja
                                .filter(e => e.aberta === true && e.dataCriacao === this.state.datadobotao)
                                .map(b => b.artigos
                                    .map(a => (
                                        <p>
                                            <button onClick={() => this.decrement(e, b, a)}>-</button>
                                            {a.quantidade}
                                            {/* <button onClick={() => this.increment(e, b, a)}>+</button> */}
                                             x {a.nome} <br/>
                                             <button onClick={() => this.deliverOrder(e, b)}>Pedido entregue</button>
                                        </p>
                                        
                                    )
                                    )))}</b>
                                    

                    </>}
                    handleClose={this.togglePopupX}
                />}
            </div>
        )
    }
}

export default Restaurante
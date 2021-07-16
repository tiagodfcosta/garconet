import { format } from 'date-fns'
import React from "react"
import Popup from "./popUp"

class Restaurante extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
<<<<<<< HEAD
            bills: [],
            isOpen: false,
            buttondate: "",
            idbill: "",
            idbtray: ""
=======
            contas: [],
            isOpen: false,
            datadobotao: "",
            idconta: "",
            idbandeja: ""
>>>>>>> main
        }
    }

    findTrays() {
        fetch("/opentrays")
            .then(res => res.json())
            .then(json => this.setState({
<<<<<<< HEAD
                bills: json
            }))
=======
                contas: json
            }))

>>>>>>> main
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
<<<<<<< HEAD
            buttondate: e.creationDate
        }));
        console.log(this.state.buttondate)
    }

    decrement(e, b, a) {
        fetch("/decrement", {
            method: "POST",
            body: JSON.stringify({ idbill: e._id, idbtray: b._id, name: a.name }),
=======
            datadobotao: e.dataCriacao

        }));
        console.log(this.state.datadobotao)

    }



    decrement(e, b, a) {
        fetch("/decrement", {
            method: "POST",
            body: JSON.stringify({ idconta: e._id, idbandeja: b._id, nome: a.nome }),
>>>>>>> main
            headers: {
                "Content-Type": "application/json"
            }
        })
<<<<<<< HEAD
=======

>>>>>>> main
    }

    // increment(e, b, a) {
    //     fetch("/increment", {
    //         method: "POST",
<<<<<<< HEAD
    //         body: JSON.stringify({ idbill: e._id, idbtray: b._id, name: a.name }),
=======
    //         body: JSON.stringify({ idconta: e._id, idbandeja: b._id, nome: a.nome }),
>>>>>>> main
    //         headers: {
    //             "Content-Type": "application/json"
    //         }
    //     })
    // }

    deliverOrder(e, b) {
        fetch("/deliver", {
            method: "POST",
<<<<<<< HEAD
            body: JSON.stringify({ idbill: e._id, idbtray: b._id }),
=======
            body: JSON.stringify({ idconta: e._id, idbandeja: b._id }),
>>>>>>> main
            headers: {
                "Content-Type": "application/json"
            }
        })
        this.state.isOpen = false
<<<<<<< HEAD
    }

=======

    }


>>>>>>> main
    render() {
        return (
            <div>
                <h1>Pedidos não entregues:</h1>

<<<<<<< HEAD
                {this.state.bills.map(e => e.btray.filter(e => e.open === true).map(e =>
                    (<button onClick={() => this.togglePopupX(e)}>{format(new Date(e.creationDate), 'dd/MM/yyyy HH:mm')}</button>)
=======
                {this.state.contas.map(e => e.bandeja.filter(e => e.aberta === true).map(e =>
                    (<button onClick={() => this.togglePopupX(e)}>{format(new Date(e.dataCriacao), 'dd/MM/yyyy HH:mm')}</button>)
>>>>>>> main
                ))}

                {this.state.isOpen && <Popup
                    content={<>
<<<<<<< HEAD
                        <b>{this.state.bills
                            .map(e => e.btray
                                .filter(e => e.open === true && e.creationDate === this.state.buttondate)
                                .map(b => b.items
                                    .map(a => (
                                        <p>
                                            <button onClick={() => this.decrement(e, b, a)}>-</button>
                                            {a.quantity}
                                             x {a.name} <br />
                                        </p>
                                    )
                                    )))}</b>
                        <b>{this.state.bills
                            .map(e => e.btray
                                .filter(e => e.open === true && e.creationDate === this.state.buttondate)
                                .map(b => (
                                        <p>
                                            <button onClick={() => this.deliverOrder(e, b)}>Pedido entregue</button>  
                                        </p>
                                    )))}</b>
=======

                        <b>{this.state.contas
                            .map(e => e.bandeja
                                .filter(e => e.aberta === true && e.dataCriacao === this.state.datadobotao)
                                .map(b => b.artigos
                                    .map(a => (
                                        <p>
                                            <button onClick={() => this.decrement(e, b, a)}>-</button>
                                            {a.quantidade}
                                             x {a.nome} <br />
                                            
                                        </p>

                                    )
                                    )))}</b>

                        <b>{this.state.contas
                            .map(e => e.bandeja
                                .filter(e => e.aberta === true && e.dataCriacao === this.state.datadobotao)
                                .map(b => (
                                        <p>
                                        
                                            <button onClick={() => this.deliverOrder(e, b)}>Pedido entregue</button>
                                            
                                        </p>

                                    
                                    )))}</b>
                                    


>>>>>>> main
                    </>}
                    handleClose={this.togglePopupX}
                />}
            </div>
        )
    }
}

export default Restaurante
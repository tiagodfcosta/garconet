import { format } from 'date-fns'
import React from "react"
import Popup from "./popUp"
import "./Restaurante.css"

class Restaurante extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bills: [],
            isOpen: false,
            buttondate: "",
            idbill: "",
            idbtray: ""
        }
    }

    findTrays() {
        fetch("/opentrays")
            .then(res => res.json())
            .then(json => this.setState({
                bills: json
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
            buttondate: e.creationDate
        }));
        console.log(this.state.buttondate)
    }

    decrement(e, b, a) {
        fetch("/decrement", {
            method: "POST",
            body: JSON.stringify({ idbill: e._id, idbtray: b._id, name: a.name }),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    // increment(e, b, a) {
    //     fetch("/increment", {
    //         method: "POST",
    //         body: JSON.stringify({ idbill: e._id, idbtray: b._id, name: a.name }),
    //         headers: {
    //             "Content-Type": "application/json"
    //         }
    //     })
    // }

    deliverOrder(e, b) {
        fetch("/deliver", {
            method: "POST",
            body: JSON.stringify({ idbill: e._id, idbtray: b._id }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        this.state.isOpen = false
    }

    render() {
        return (
            <div>
                <img className="logorestaurant" src="tascadajoanasemfundo.png"></img>
                <h1>Pedidos em espera:</h1>

                {this.state.bills.map(e => e.btray.filter(e => e.open === true).map(e =>
                    (<button onClick={() => this.togglePopupX(e)}>{format(new Date(e.creationDate), 'dd/MM/yyyy HH:mm')}</button>)
                ))}

                {this.state.isOpen && <Popup
                    content={<>
                        <b>{this.state.bills
                            .map(e => e.btray
                                .filter(e => e.open === true && e.creationDate === this.state.buttondate)
                                .map(b => b.items
                                    .map(a => (
                                        <p className="product-name">
                                            <button className="decrement" onClick={() => this.decrement(e, b, a)}>-</button>
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
                    </>}
                    handleClose={this.togglePopupX}
                />}
                <br></br>
                <img className="logogn" src="gnlogo.png"></img>
            </div>
        )
    }
}

export default Restaurante
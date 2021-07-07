import React from "react";

class PaginaPrincipal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "quantidadedeitens": 0,
            "valortotal": 0
        }
    }

    render() {
        return (
            <div>
                <h2>Restaurante da Gertrudes</h2>
                <img className="logogarconet" src ="logogarconet.png"/>
                <div>
                    <p>burger menu do canto</p>
                </div>
                <br></br>
                <button>MENU</button>
                <button>Ver conta atual</button>
                <button>Fechar a conta</button>
                <button>Pedir ajuda</button>
                <p>Quantidade de itens: {this.state.quantidadedeitens}</p>
                <p>Valor total: {this.state.valortotal}</p>
                

            </div>
        )
    }
}

export default PaginaPrincipal;
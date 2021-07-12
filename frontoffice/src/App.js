import './App.css';
import Paginadelogin from "./Paginadelogin"
import PaginaPrincipal from './Paginaprincipal';
import BackButton from './Componentes/BackButton';
import React from "react"
import {Menu} from './Menu'
import { MenuPart } from './Componentes/MenuPart';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import fs from "fs";

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      "quantidadedeitens": 0,
      "valortotal": 0      
    }    
  }

  //parcialmente correto, como enviar um body de algo que está no componente filho?
  //fetch já escreve na base de dados

  //problemas aqui, fazer fetch e enviar pro banco de dados o elemento atual
  //  updateTray = async () => {
  //   let produtoAtual = await fetch("/atual")
  //   .then(res => res.json())
  //   .then(json => console.log(json))

  //   await fetch("/tray", {
  //     method: "POST",
  //     body: JSON.stringify({nome: produtoAtual}),
  //     headers: {
  //       "Content-Type": "application/json"
  //       }
  //     })      
  //   }

  handleState = (quantity, valor) => {
    this.setState((state) => ({
      quantidadedeitens: state.quantidadedeitens + quantity,
      valortotal: state.valortotal + valor
    }))
   
  }

  render() {
    return (
     <Router>
       <div>
       <BackButton />
       <nav>
        <Link to="/"></Link>
       </nav>
       <Switch>
          <Route exact path="/">
          <PaginaPrincipal />
          </Route>
          <Route path="/menu/:category">
            <MenuPart handleState={this.handleState} /*updateTray={this.updateTray}*//>
          </Route>
          <Route path="/menu">
            <Menu />
          </Route>
       </Switch>
       <p>Quantidade de itens: {this.state.quantidadedeitens}</p>
       <p>Valor total: {this.state.valortotal} €</p>
       </div>
     </Router>
    );
  }
}


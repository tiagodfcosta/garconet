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
      "valortotal": 0,
      "valoradicionado": 0 
    }    
  }

  getBillAmount() {
    fetch("/valordaconta")
    .then(res => res.json())
    .then(json => this.setState((state) => ({
      valoradicionado: json
    })))
    console.log(this.state.valoradicionado)
  }

  stateToZero() {
    this.setState((state) => ({
      valortotal: 0,
      quantidadedeitens: 0
    }))
  }
  

  handleState = (quantity, valor) => {
    
    this.setState((state) => ({
      quantidadedeitens: state.quantidadedeitens + quantity,
      valortotal: state.valortotal + valor
    }))
   
  }  
  
  //sobrecarrega chamar isso sempre?
  componentDidMount() {
    setInterval(() => {
      fetch("/quantevalor")
      .then(res => res.json())
      .then(json => this.setState((state) => ({
        quantidadedeitens: json.quantidade,
        valortotal: json.valor,
        valoradicionado: json.valortotal
      })))      
    }, 300);    
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
          <PaginaPrincipal valoradicionado={this.state.valoradicionado}/>
          </Route>
          <Route path="/menu/:category">
            <MenuPart handleState={this.handleState} />
          </Route>
          <Route path="/menu">
            <Menu 
            quantidadeitens={this.state.quantidadedeitens} 
            valortotal={this.state.valortotal} 
            adicionarvalor={() => this.getBillAmount()} 
            stateToZero={() => this.stateToZero()} />
          </Route>
       </Switch>
       <p>Quantidade de itens: {this.state.quantidadedeitens}</p>
       <p>Valor total: {this.state.valoradicionado.toFixed(2)} € + {this.state.valortotal.toFixed(2)} €</p>
       </div>
     </Router>
    );
  }
}


import './App.css';
<<<<<<< HEAD
=======
import Paginadelogin from "./Paginadelogin"
>>>>>>> main
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
import CloseTab from './Closetab';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
<<<<<<< HEAD
      "itemquantity": 0,
      "totalvalue": 0,
      "addedvalue": 0 
    }    
  }

  getBillAmount() {
    fetch("/billvalue")
    .then(res => res.json())
    .then(json => this.setState((state) => ({
      addedvalue: json
    })))
    console.log(this.state.addedvalue)
  }

  stateToZero() {
    this.setState((state) => ({
      totalvalue: 0,
      itemquantity: 0
    }))
  }
  

  handleState = (quantity, value) => {
    this.setState((state) => ({
      itemquantity: state.itemquantity + quantity,
      totalvalue: state.totalvalue + value
    }))
  }  
  
  componentDidMount() {
    setInterval(() => {
      fetch("/qtdvalue")
      .then(res => res.json())
      .then(json => this.setState((state) => ({
        itemquantity: json.quantity,
        totalvalue: json.value,
        addedvalue: json.totalvalue
      })))      
    }, 1000);    
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
          <PaginaPrincipal addedvalue={this.state.addedvalue}/>
          </Route>
          <Route path="/menu/:category">
            <MenuPart handleState={this.handleState} />
          </Route>
          <Route path="/menu">
            <Menu 
            itemsquantity={this.state.itemquantity} 
            totalvalue={this.state.totalvalue} 
            addvalue={() => this.getBillAmount()} 
            stateToZero={() => this.stateToZero()} />
          </Route>
          <Route>
            <CloseTab path="/closetab"/>
          </Route>
       </Switch>
       <p>Quantidade de itens a adicionar: {this.state.itemquantity}</p>
       <p>Valor total: {this.state.addedvalue.toFixed(2)} € + {this.state.totalvalue.toFixed(2)} €</p>
       </div>
     </Router>
    );
  }
}
=======
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
  
  componentDidMount() {
    setInterval(() => {
      fetch("/quantevalor")
      .then(res => res.json())
      .then(json => this.setState((state) => ({
        quantidadedeitens: json.quantidade,
        valortotal: json.valor,
        valoradicionado: json.valortotal
      })))      
    }, 1000);    
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
          <Route>
            <CloseTab path="/closetab"/>
          </Route>
       </Switch>
       <p>Quantidade de itens a adicionar: {this.state.quantidadedeitens}</p>
       <p>Valor total: {this.state.valoradicionado.toFixed(2)} € + {this.state.valortotal.toFixed(2)} €</p>
       </div>
     </Router>
    );
  }
}

>>>>>>> main

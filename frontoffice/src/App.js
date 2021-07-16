import './App.css';
import Paginadelogin from "./Paginadelogin"
import mainPage from './mainPage';
import backButton from './Components/backButton';
import React from "react"
import {Menu} from './Menu'
import { menuPart } from './Components/menuPart';
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
      "itemquantity": 0,
      "totalvalue": 0,
      "addedvalue": 0 
    }    
  }

  getBillAmount() {
    fetch("/addedvalue")
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
            itemquantity={this.state.itemquantity} 
            totalvalue={this.state.totalvalue} 
            addvalue={() => this.getBillAmount()} 
            stateToZero={() => this.stateToZero()} />
          </Route>
       </Switch>
       <p>Quantidade de itens: {this.state.itemquantity}</p>
       <p>Valor total: {this.state.addedvalue.toFixed(2)} € + {this.state.totalvalue.toFixed(2)} €</p>
       </div>
     </Router>
    );
  }
}


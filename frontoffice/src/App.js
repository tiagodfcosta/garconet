import logo from './logo.svg';
import './App.css';
<<<<<<< Updated upstream

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
=======
import Paginadelogin from "./Paginadelogin"
import PaginaPrincipal from './mainPage';
import backButton from './Components/backButton';
import React from "react"
import {Menu} from './Menu'
import { MenuPart } from './Components/MenuPart';
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
      "incrementedvalue": 0 
    }    
  }

  getBillAmount() {
    fetch("/accountvalue")
    .then(res => res.json())
    .then(json => this.setState((state) => ({
      incrementedvalue: json
    })))
    console.log(this.state.incrementedvalue)
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
    fetch("/qtdvalue")
    .then(res => res.json())
    .then(json => this.setState((state) => ({
      itemquantity: json.quantity,
      totalvalue: json.value,
      valoradicionado: json.totalvalue
    })))
    
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
          <PaginaPrincipal incrementedvalue={this.state.incrementedvalue}/>
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
       <p>Valor total: {this.state.incrementedvalue.toFixed(2)} € + {this.state.totalvalue.toFixed(2)} €</p>
       </div>
     </Router>
    );
  }
}
>>>>>>> Stashed changes

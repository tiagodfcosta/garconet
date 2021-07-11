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

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      "quantidadedeitens": 0,
      "valortotal": 0      
    }
    
  }

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
            <MenuPart handleState={this.handleState}/>
          </Route>
          <Route path="/menu">
            <Menu />
          </Route>
       </Switch>
       <p>Quantidade de itens: {this.state.quantidadedeitens}</p>
       <p>Valor total: € {this.state.valortotal}</p>
       </div>
     </Router>
    );
  }
}


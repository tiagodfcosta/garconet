import './App.css';
import React from 'react';
import Paginadelogin from "./Paginadelogin"
import PaginaPrincipal from './Paginaprincipal';
import BackButton from './Componentes/BackButton';
import React, { useEffect, useState } from "react"
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
          <PaginaPrincipal quantidade={this.state.quantidadedeitens} valortotal={this.state.valortotal}/>
          </Route>
          <Route path="/menu/:category">
            <MenuPart quantidade={this.state.quantidadedeitens} valortotal={this.state.valortotal}/>
          </Route>
          <Route path="/menu">
            <Menu quantidade={this.state.quantidadedeitens} valortotal={this.state.valortotal}/>
          </Route>
       </Switch>
       </div>
     </Router>
    );
  }
}

function MenuPart() {
  const {category} = useParams();

  const [prods, setProds] = useState([])    

  useEffect(() => {
    fetch("/category")
    .then(products => products.json())
    .then(json => setProds(json.products))

  }, [])

  return (
    <ul>{prods.map(e => {
      return <li>{e.nome}, {e.preço}</li>
    })}</ul>
  )
}

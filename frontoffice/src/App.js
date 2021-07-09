import './App.css';
import Paginadelogin from "./Paginadelogin"
import PaginaPrincipal from './Paginaprincipal';
<<<<<<< HEAD
import BackButton from './Componentes/BackButton';
=======
import React, { useEffect, useState } from "react"
>>>>>>> 2998ecd (useEffect)
import {Menu} from './Menu'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

export default function App() {
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
          <MenuPart/>
        </Route>
        <Route path="/menu">
          <Menu/>
        </Route>
     </Switch>
     </div>
   </Router>
  );
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
<<<<<<< HEAD
    <h1>teste</h1>
    // fetch("/category") 
=======
    <ul>{prods.map(e => {
      return <li>{e.nome}, {e.preço}</li>
    })}</ul>
>>>>>>> 2998ecd (useEffect)
  )
}
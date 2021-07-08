import './App.css';
import PaginaDeLogin from './Paginadelogin';
import PaginaPrincipal from './Paginaprincipal';
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
  const {category} = useParams()
  return (
    fetch("/category") 
  )
}
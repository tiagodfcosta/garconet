import './App.css';
import Paginadelogin from "./Paginadelogin"
import PaginaPrincipal from './Paginaprincipal';
import BackButton from './Componentes/BackButton';
import {Menu} from './Menu'
import { MenuPart } from './Componentes/MenuPart';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
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


import React, { Fragment } from "react";


import { BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Header from "./componentes/layouts/Header";
import Login from "./componentes/Login";
import Clientes from "./componentes/Clientes/Clientes";
import NuevoCliente from "./componentes/Clientes/NuevoCliente";
import EditarCliente from "./componentes/Clientes/EditarCliente";
import Tecnicos from "./componentes/Tecnicos/Tecnicos";
import NuevoTecnico from "./componentes/Tecnicos/NuevoTecnico";
import EditarTecnico from "./componentes/Tecnicos/EditarTecnico";
import OrdenesServicio from "./componentes/OrdenServicio/OrdenServicio";
import NuevaOrdenServicio from "./componentes/OrdenServicio/NuevaOrdenServicio";
import NuevoArticulo from "./componentes/Articulos/NuevoArticulo";
import Articulos from "./componentes/Articulos/Articulos";
import Session from './componentes/Session';
import Dashboard from './componentes/Dashboard/DashBoard';

// import $ from  './bootstrap/jquery.min.js'


const  App = ({refetch , session}) => {
  return (
      
      <Router>
        <Fragment>
          <Header session={session}/>
         { (session) ? null: <Redirect to="/login"/>}
          <div className="container gris mt-3">        
            <Switch>
              <Route exact path="/login" render={()=> <Login refetch={refetch}/>} />
              <Route exact path="/dashboard" render={()=> <Dashboard refetch={refetch} session={session}/>} />
              {/* <Route exact path="/login" component={Login} /> */}
              <Route exact path="/clientes" component={Clientes} />
              <Route exact path="/clientes/nuevo" component={NuevoCliente} />
              <Route
                exact
                path="/clientes/editar/:id"
                component={EditarCliente}
              />

              <Route exact path="/tecnicos" component={Tecnicos} />
              <Route exact path="/tecnicos/nuevo" component={NuevoTecnico} />
              <Route
                exact
                path="/tecnicos/editar/:id"  
                component={EditarTecnico}
              />

              <Route exact path="/ordenes" component={OrdenesServicio} />
              <Route
                exact
                path="/ordenes/nuevo"
                component={NuevaOrdenServicio}
              />
              <Route exact path="/articulos/" component={Articulos} />
              <Route
                exact
                path="/articulos/nuevo"
                component={NuevoArticulo}
              />
            </Switch>
          </div>
        </Fragment>
      </Router>
   
  );
}

const RootSession = Session(App);
export  {RootSession};



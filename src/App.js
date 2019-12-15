import React, { Fragment, Component } from "react";
import SidebarElement from "./componentes/layouts/MenuSidebar";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect 
} from "react-router-dom";
import Headert from "./componentes/layouts/Header";
import Login from "./componentes/Usuarios/Login";
import Clientes from "./componentes/Clientes/Clientes";
import NuevoCliente from "./componentes/Clientes/NuevoCliente";
import EditarCliente from "./componentes/Clientes/EditarCliente";
import Tecnicos from "./componentes/Tecnicos/Tecnicos";
import NuevoTecnico from "./componentes/Tecnicos/NuevoTecnico";
import SeleccionarTecnico from "./componentes/Tecnicos/SeleccionarTecnico";
import EditarTecnico from "./componentes/Tecnicos/EditarTecnico";
import Session from "./componentes/Session";
import OrdenesServicio from "./componentes/OrdenServicio/OrdenServicio";
import NuevaOrdenServicio from "./componentes/OrdenServicio/NuevaOrdenServicio";
import NuevoArticulo from "./componentes/Articulos/NuevoArticulo";
import Articulos from "./componentes/Articulos/Articulos";
import Dashboard from "./componentes/Dashboard/DashBoard";
import Registro from "./componentes/Usuarios/Registro";
import RecuperarPass from "./componentes/Usuarios/RecuperarPass";
import CodConfirmacion from "./componentes/Usuarios/CodConfirmacion";

class App extends Component {
  state={ view:false}

 setView = (data) =>{
  //  console.log(data)
   switch (data) {
     case 1: return this.setState( {view : !this.state.view})
     case false: return this.setState( {view : false})
     case true:return  this.setState( {view : true})   
       
   }
   
  
  }

  render() {    
    return (
      <Fragment> 
        <Router>
          <Header {...this.props} setView={this.setView}/>
          <SideBarBody {...this.props} setView={this.setView} view={ this.state.view}/>
        </Router>
      </Fragment>
    );
  }
}

class Body extends Component {
  render() {   
    return (
      <div className="container gris mt-5" id="principal">
        <div className="row my-5" />

        <Switch>
          <Route
            exact
            path="/login"
            render={() => <Login refetch={this.props.refetch} />}
          />
          <Route
            exact
            path="/registro"
            render={() => <Registro refetch={this.props.refetch} />}
          />
          <Route exact path="/recuperarpass" component={RecuperarPass} />} />
          <Route exact path="/confirmacion" component={CodConfirmacion} />} />
          <Route
            exact
            path="/dashboard"
            render={() => (
              <Dashboard
                refetch={this.props.refetch}
                session={this.propssession}
              />
            )}
          />
          {/* <Route exact path="/login" component={Login} /> */}
          <Route exact path="/clientes" component={Clientes} />
          <Route exact path="/clientes/nuevo" component={NuevoCliente} />
          <Route exact path="/clientes/editar/:id" component={EditarCliente} />
          <Route exact path="/tecnicos" component={Tecnicos} />
          <Route exact path="/tecnicos/nuevo" component={NuevoTecnico} />
          <Route
            exact
            path="/tecnicos/seleccionar"
            component={SeleccionarTecnico}
          />
          <Route exact path="/tecnicos/editar/:id" component={EditarTecnico} />
          <Route exact path="/reportes" component={OrdenesServicio} />
          <Route exact path="/ordenes/nuevo" component={NuevaOrdenServicio} />
          <Route exact path="/articulos/" component={Articulos} />
          <Route exact path="/articulos/nuevo" component={NuevoArticulo} />}
        </Switch>
      </div>
    );
  }
}



class Header extends Component {
  render() {    
    return (
      <Fragment>
        {filtro(this.props.session)}
        <Headert
          session={this.props.session}
          setView={this.props.setView}
        />
      </Fragment>
    );
  }
}

const filtro = session => {
  if (session) {
    const { estado } = session;
    // console.log(session);
    switch (estado) {
      case "CONFIRMADO":
        return <Redirect to="/dashboard" />;
      case "PENDIENTE":
        return <Redirect to="/confirmacion" />;
      case "SINSESSION":
        return <Redirect to="/login" />;
      case null:
        return <Redirect to="/login" />;
      default:
    }
  } else {
    
    return <Redirect to="/login" />;
  }
};
// -

const SideBarBody = SidebarElement(Body);
const RootSession = Session(App);

export default RootSession;

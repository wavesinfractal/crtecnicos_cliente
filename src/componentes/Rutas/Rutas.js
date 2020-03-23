import React from "react";
import { 
  Route,
  Switch,  
} from "react-router-dom";


import Login from "../../componentes/Usuarios/Login";
import Clientes from "../../componentes/Clientes/Clientes";
import NuevoCliente from "../../componentes/Clientes/NuevoCliente";
import EditarCliente from "../../componentes/Clientes/EditarCliente";
import Tecnicos from "../../componentes/Tecnicos/Tecnicos";
import SeleccionarTecnico from "../../componentes/Tecnicos/SeleccionarTecnico";
import OrdenesServicio from "../OrdenServicio/OrdenesServicio";
import NuevaOrdenServicio from "../../componentes/OrdenServicio/NuevaOrdenServicio";
import NuevoArticulo from "../../componentes/Articulos/NuevoArticulo";
import Articulos from "../../componentes/Articulos/Articulos";
import Dashboard from "../../componentes/Dashboard/DashBoard";
import Registro from "../../componentes/Usuarios/Registro";
import RecuperarPass from "../../componentes/Usuarios/RecuperarPass";
import CodConfirmacion from "../../componentes/Usuarios/CodConfirmacion";
import Lorem from "../layouts/Lorem";
const Rutas = props => {
  const { refetch, session } = props;
 

  return (
    // <div
    //   className="contenedor"
    //   style={{marginTop: "var(--height-header)"}}
    // >
    

        <div >
      <Switch>
        <Route exact path="/login" render={() => <Login {...props} />} />
        <Route exact path="/registro/:rol" render={() => <Registro {...props} />} />
        <Route exact path="/recuperarpass" component={RecuperarPass} />} />
        <Route exact path="/confirmacion" component={CodConfirmacion} />} />
        <Route
          exact
          path="/dashboard"
          render={() => <Dashboard refetch={refetch} session={session} />}
        />
        {/* <Route exact path="/login" component={Login} /> */}
        <Route exact path="/clientes" component={Clientes} />
        <Route exact path="/clientes/nuevo" component={NuevoCliente} />
        <Route exact path="/clientes/editar/:id" component={EditarCliente} />
        <Route exact path="/tecnicos" component={Tecnicos} />
        <Route
          exact
          path="/tecnicos/seleccionar"
          component={SeleccionarTecnico}
        />
        <Route
          exact
          path="/ordenes"
          render={() => <OrdenesServicio {...props} refetch={refetch} />}
        />
        <Route
          exact
          path="/ordenes/nuevo"
          render={() => <NuevaOrdenServicio {...props} refetch={refetch} />}
        />
        <Route exact path="/lorem" component={Lorem} />
        <Route
          exact
          path="/articulos/"
          render={() => <Articulos {...props} refetch={refetch} />}
        />
        <Route
          exact
          path="/articulos/nuevo"
          render={() => <NuevoArticulo {...props} refetch={refetch} />}
        />
      </Switch>
        </div>
    // </div>
  );
};
export default Rutas;

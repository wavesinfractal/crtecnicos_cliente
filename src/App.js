import React, { Fragment, useState} from "react";
import MenuSidebar from "./componentes/Menu/MenuSidebar";
import {
  BrowserRouter as Router,  
  Redirect
} from "react-router-dom";
import Rutas from "./componentes/Rutas/Rutas"
import Header from "./componentes/layouts/Header";
import Session from "./componentes/Session";


const App = props => {
   
  const { session } = props;
  const [view, setViewer] = useState("");


  const SetView = data => {    
    switch (data) {
      case 1:           
        return setViewer(!view);
        case false:           
        return setViewer(false);
      case true:
        return setViewer(true);
      default:
        return;
    }
  };

  return (
    <Fragment>
      <Router>
        <MenuSidebar {...props} view={view} setView={SetView}/>
        {filtro(session)} //Redirecciona en caso de no tener session
        <Header {...props} setView={SetView} />
        <Rutas {...props}/>
      </Router>
    </Fragment>
  );
};

// const SideBarBody = SidebarElement(Rutas);


const filtro = session => { //Filtro para las sessiones.
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

const RootSession = Session(App);

export default RootSession;

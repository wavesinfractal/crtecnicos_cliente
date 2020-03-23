import React, { Fragment, useState } from "react";
import MenuSidebar from "./componentes/Menu/MenuSidebar";
import { BrowserRouter as Router, Redirect } from "react-router-dom";

import Rutas from "./componentes/Rutas/Rutas";
import Header from "./componentes/layouts/Header/Header";
import Footer from "./componentes/layouts/Footer/Footer";
import Session from "./componentes/Session/Session";

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
        <MenuSidebar {...props} view={view} setView={SetView} />
        {filtro(session)}
        <Header {...props} setView={SetView} />
        <div
          className="className"
          style={{
            boxSizing: "border-box",
            paddingLeft: "5px",
            paddingRight: "5px",
            overflowX: "hidden",
            display: "grid",
            gridTemplateRows:
              "var(--height-header) calc(100vh + var(--height-header) + var(--height-footer))  var(--height-footer) "
          }}
        >
          <div className="Header-Space"></div>
          <Rutas {...props} />
          <div className="Footer-Space"></div>
        </div>
        <Footer />
      </Router>
    </Fragment>
  );
};

// Redirecciona en caso de no tener session
const filtro = session => {
  if (session) {
    const { status } = session;
    // console.log(session);
    switch (status) {
      case true:
        return <Redirect to="/dashboard" />;
      case false:
        return <Redirect to="/confirmacion" />;
      case null:
        return <Redirect to="/login" />;
      default:
    }
  } else {
    return <Redirect to="/login" />;
  }
};

const RootSession = Session(App);

export default RootSession;

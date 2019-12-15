import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import CerrarSession from "./CerrarSession";

// import AddToHomescreen from "react-add-to-homescreen";

const Botton = props => (
  <button
    className="navbar-toggler sidebar-toggler"
    type="button"
    data-toggle="collapse"
    data-target="#sidebar"
    aria-controls="navegacion"
    aria-expanded="false"
    aria-label="Menu"
    onClick={() =>
      setTimeout(() => {
        props.setView(1);
      }, 50)
    }
  >
    <span className="navbar-toggler-icon"></span>
  </button>
);

const Bottonfake =()=> (
  <button className="navbar-toggler sidebar-toggler" type="button">
    <span className="navbar-toggler-icon"></span>
  </button>
);

const Header = props => {
  const { nombre, estado } = props.session
    ? props.session
    : { nombre: "", apellido: "" };

  return (
    <nav className="navbar fixed-top  navbar-expand-lg navbar-dark bg-primary justify-content-between d-flex mb-3">
      <div className="container-fluid">
        {nombre === null && estado === "SINSESSION" ? (
         <Bottonfake/>
        ) : (
          <Botton {...props} />
        )}

        <a href="/" className="navbar-brand text-light font-weight-bold">
          CRTecnicos
        </a>

        {/* <div className="row d-flex align-item-center justify-content-end"
        <p className="text-right text-light ">{` ${nombre} ${apellido}`}</p>
        </div> */}

        <button
          className="navbar-toggler "
          type="button"
          data-toggle="collapse"
          data-target="#navegacion"
          aria-controls="navegacion"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <User />

        <div className="collapse navbar-collapse" id="sidebar">
          <ul className="navbar-nav ml-auto text-left">
            <li className="nav-item active"></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

const User = () => (
  <Fragment>
    {/* <AddToHomescreen
      onAddToHomescreenClick={alert(`
    1. Open Share menu
    2. Tap on "Add to Home Screen" button`)}
    /> */}
    <div className="collapse navbar-collapse" id="navegacion">
      <ul className="navbar-nav ml-auto text-right">
        <li className="nav-item active">
          <Link to={`/dashboard`} className="btn text-light">
            Tablero
          </Link>
          <Link to={`/tecnicos`} className="btn text-light">
            Tecnicos
          </Link>
          <Link to={`/ordenes`} className="btn text-light">
            Ordenes de servicio
          </Link>
          <Link to={`/tecnicos/seleccionar`} className="btn text-light">
            Seleccionar Tecnico
          </Link>

          <CerrarSession />
        </li>
      </ul>
    </div>
  </Fragment>
);

export default withRouter(Header);

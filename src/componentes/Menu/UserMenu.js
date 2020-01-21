import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
const UserMenu = withRouter(({ session, setView, history }) => {
  const { nombre, apellido1 } = session.nombre ? session.nombre : "";
  return (
    <Fragment>
      <div
        className="container-fluid bg-transparent"
        // style={{ height: "65px" }}
      />

      <div
        className="no-wrap text-primary bg-transparent my-3 text-center"
        style={{ height: "10vh" }}
      >
        <i aria-hidden="true" className="user icon large w-100  my-1"></i>
        <h1 className="h5">
          {nombre} {apellido1}
        </h1>
      </div>

      <ul
        className="list-group text-light bg-transparent text-center"
        onClick={() => setView(false)}
      >
        <li
          className="list-group-item bg-primary m-1"
          onClick={() => history.push("/dashboard")}
        >
          {" "}
          <i aria-hidden="true" className="home icon large w-100" />
          Inicio
        </li>
        <li
          className="list-group-item bg-primary m-1"
          onClick={() => history.push("/tecnicos")}
        >
          <i aria-hidden="true" className="user plus icon large w-100 " />
          Tecnicos
        </li>

        <li
          className="list-group-item bg-primary  m-1"
          onClick={() => history.push("/articulos")}
        >
          <i aria-hidden="true" className="user plus icon large w-100" />
          Articulos
        </li>
        <li
          className="list-group-item bg-primary  m-1"
          onClick={() => history.push("/ordenes")}
        >
          <i
            aria-hidden="true"
            className="camera icon text-light large w-100"
          />
          Ordenes
        </li>
        <li className="list-group-item bg-primary  m-1">
          <i
            aria-hidden="true"
            className="wrench icon text-light large w-100"
          />
          Reparaciones
        </li>

        <li
          className="list-group-item bg-primary  m-1"
          onClick={() => history.push("/lorem")}
        >
          <i
            aria-hidden="true"
            className="camera icon text-light large w-100"
          />
          Lorem
        </li>
        <li
          className="list-group-item bg-primary  m-1"
          onClick={() => history.push("/lorem")}
        >
          <i
            aria-hidden="true"
            className="camera icon text-light large w-100"
          />
          Lorem
        </li>
      </ul>
    </Fragment>
  );
});

export default UserMenu;

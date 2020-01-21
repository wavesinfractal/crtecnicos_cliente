import React, { Fragment, useRef, useEffect } from "react";
import { openFullscreen } from "./Screen";
import { Menu, Sidebar } from "semantic-ui-react";
import { withRouter } from "react-router-dom";

const MenuSidebar = Component => props => {
  
  const { setView, view, session } = props;

  return (
    <div
      className="pushable container-fluid bg-transparent"
      style={{ height: `${window.innerHeight}px` }}
    >
      <Sidebar
        as={Menu}
        animation="scale down"
        icon="labeled"
        inverted
        // onHide={}
        vertical
        visible={view}
        width="thin"
        fixed="left"
        className="bg-transparent"
        style={{ overflow: "hidden" }}
      >
        {session ? <BarUser setView={setView} session={session} /> : ""}
      </Sidebar>

      <div className="pusher">
        <Component {...props} />
      </div>
    </div>
  );
};
export default MenuSidebar;

const BarUser = withRouter(({ session, setView, history }) => {
  const { nombre, apellido1 } = session.nombre ? session.nombre : "";
  return (
    <Fragment>
      <div
        className="container-fluid bg-transparent"
        style={{ height: "65px" }}
      />

      <div className="text-primary bg-transparent my-3">
        <i aria-hidden="true" className="user icon large w-100  my-1"></i>
        <h1 className="h5  ">
          {nombre} {apellido1}
        </h1>
      </div>

      <ul
        className="list-group text-light bg-transparent"
        onClick={() => setView(false)}
      >
        <li
          className="list-group-item bg-primary   m-1"
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

        <li className="list-group-item bg-primary  m-1">
          <i
            aria-hidden="true"
            className="wrench icon text-light large w-100"
          />
          Reparaciones
        </li>

        <li className="list-group-item bg-primary  m-1">
          <i
            aria-hidden="true"
            className="camera icon text-light large w-100"
          />
          hola
        </li>
        <li
          className="list-group-item bg-primary"
          onClick={async () => await openFullscreen()}
        >
          {" "}
          <i
            aria-hidden="true"
            className="camera icon text-light large w-100"
          ></i>
          hola
        </li>
      </ul>
    </Fragment>
  );
});
// const BarUser = (BarraUser);

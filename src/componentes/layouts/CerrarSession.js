import { ApolloConsumer } from "react-apollo";
import { withRouter } from "react-router-dom";

import React from "react";

const cerrarUsuario = (cliente, history) => {
  localStorage.removeItem("token", "");
  cliente.resetStore();
  history.push("/login");
};

const CerrarSession = ({ history }) => {
  return (
    <ApolloConsumer>
      {cliente => {
        return (
          <button
            onClick={() => cerrarUsuario(cliente, history)}
            className="btn btn-light ml-md-2 mt-2"
          >
            Cerrar Sesion
          </button>
        );
      }}
    </ApolloConsumer>
  );
};

export default withRouter(CerrarSession);

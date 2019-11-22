import React, { Component, Fragment } from "react";
import { Query } from "react-apollo";
import { QueryConsultarCliente } from "../../Querys/Clientes";
import { MutationActualizarCliente } from "../../Mutations/Clientes";
import FormularioEditarCliente from "./FormularioEditarCliente";

class EditarCliente extends Component {
  render() {
    const { id } = this.props.match.params;

    return (
      <Fragment>
        <h1 className="text-center mt-5 h3">Editar Clientes</h1>
        <div className="container d-flex justify-content-center">
          <Query
            query={QueryConsultarCliente}
            variables={{ id }}
            refetchQueries={MutationActualizarCliente}
          >
            {({ loading, error, data, refetch }) => {
              if (loading) return "Cargando...";
              if (error) return `Error de graphql ${error}`;

              return (
                // console.log(data.getCliente),
                <FormularioEditarCliente
                  cliente={data.getCliente}                 
                  refetch={refetch}
                />
              );
            }}
          </Query>
        </div>
      </Fragment>
    );
  }
}

export default EditarCliente;

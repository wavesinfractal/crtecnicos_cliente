import React, { Component } from "react";
import { QueryTecnicos } from "../../Querys/Tecnicos";
import { Query, Mutation } from "react-apollo";
import { Link } from "react-router-dom";
import { suprimirTecnico } from "../../Mutations/Tecnicos";

class Tecnicos extends Component {
  render() {
    return (
      <Query
        query={QueryTecnicos}
        variables={{
          buscar: {
            index: "rol",
            value: "1"
          }
        }}
        pollInterval={1000}
      >
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error `;

          return (
            <div className="container flex  justify-content-center ">
              <table className="table table-borderless mt-5 bg-white border border-blue">
                <thead className="">
                  <tr>
                    <th className="text-left h5">Nombre</th>
                    <th className="text-center h5">Zona</th>
                    <th className="text-center h5">Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {data.getUsuarios.map(tecnico => {
                    return (
                      <tr key={tecnico.id}>
                        <td>
                          {tecnico.nombre.nombre} {tecnico.nombre.apellido1}
                        </td>
                        <td className="text-center">{tecnico.zona.canton}</td>

                        <td className="d-flex justify-content-center ">
                          <button
                            type="button"
                            className="btn btn-primary btn-sm mx-1"
                          >
                            Editar
                          </button>
                          <Mutation mutation={suprimirTecnico}>
                            {(eliminarTecnico, { loading, error, data }) => {
                              if (loading) return "Cargando...";
                              if (error) return error;
                              return (
                                <button
                                  type="button"
                                  className="btn btn-danger btn-sm  mx-1"
                                  onClick={() => {
                                    eliminarTecnico({
                                      variables: { id: tecnico.id }
                                    });
                                  }}
                                >
                                  Eliminar
                                </button>
                              );
                            }}
                          </Mutation>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className="row d-flex justify-content-center my-4">
                <div className="col-auto">
                  <button type="button " className="btn btn-success ">
                    <Link
                      to={`/tecnicos/nuevo`}
                      className="btn btn-sm text-light"
                    >
                      Nuevo Tecnico
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Tecnicos;

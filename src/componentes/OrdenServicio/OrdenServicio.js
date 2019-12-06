import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import { queryOrdenesServicio } from "../../Querys/OrdenServicio";
import { MutationEliminarCliente } from "../../Mutations/Clientes";
import Paginador from "../Paginador";
import Alerts from "../layouts/Alerts";
import { Link } from "react-router-dom";

class OrdenesServicio extends Component {
  state = {
    data: [],
    limite: 10,
    offset: 0,
    paginaActual: 1,
    alerta: { mostrar: false, mensaje: "" }
  };

  paginaAnterior = () => {
    this.setState({
      offset: this.state.offset - this.state.limite,
      paginaActual: this.state.paginaActual - 1
    });
  };

  paginaSiguiente = () => {
    this.setState({
      offset: this.state.offset + this.state.limite,
      paginaActual: this.state.paginaActual + 1
    });
  };
    render() {
        return (
            <Query
        query={queryOrdenesServicio}
        pollInterval={100}
        variables={{ limite: this.state.limite, offset: this.state.offset ,"buscar" : " { \"cliente\" : \"5dddf76c8fba5809bc708936\"  ,  \"estado\" : 0 } " }}
      >
        {({ loading, error, data, startPolling, stopPolling }) => {
          if (loading) return "Cargando...";
          if (error) return `Error ${error}`;
          // console.log(data.getClientes);

          return (
            <div className="container flex  justify-content-center">
              {this.state.alerta.mostrar ? (
                <Alerts mensaje={this.state.alerta.mensaje} />
              ) : (
                ""
              )}
              <table className="table  table-bordered mt-5">
                <thead className="bg-danger">
                  <tr>
                    <th scope="col">Orden</th>
                    <th scope="col " className="d-none d-md-block ">Tecnico</th>
                    <th scope="col">fecha</th>
                    <th scope="col" className="text-center ">
                      Opciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.getOrdenesServicio.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.orden}</td>
                        <td className="d-none d-md-block" >{item.tecnico}</td>
                        <td>{item.fechainicio}</td>
                        <td className="d-flex justify-content-around">
                          <Link
                            to={`/clientes/editar/${item.id}`}
                            className="btn btn-primary"
                            href="#"
                            role="button"
                          >
                            Editar
                          </Link>
                          <Mutation
                            mutation={MutationEliminarCliente}
                            onCompleted={(data) => {
                              this.setState({
                                alerta: {
                                  mostrar: true,
                                  mensaje: data.eliminarCliente
                                }
                              });
                            }}
                          >
                            {(eliminarCliente, { loading, error, data }) => {
                              if (loading) return "Cargando...";
                              if (error) return error;
                              const input = { id: item.id };

                              return (
                                <button
                                  
                                  className="btn btn-danger"
                                  onClick={() => {
                                    if (
                                      window.confirm(
                                        `Estas a punto de eliminar el cliente: ${item.nombre} ${item.apellido}.  \nDeseas continuar?`
                                      )
                                    ) {
                                      eliminarCliente({ variables: input });
                                    }
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
              <Paginador
                paginaAnterior={this.paginaAnterior}
                paginaSiguiente={this.paginaSiguiente}
                paginaActual={this.state.paginaActual}
                totalClientes={data.totalClientes}
                limite={this.state.limite}
              />

              <div className="row d-flex justify-content-center my-3">
                <div className="col-auto">
                  <button type="button " className="btn btn-success ">
                    <Link to={`/ordenes/nuevo`} className="btn btn-sm text-light">
                      Nueva Orden de Servicio
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

export default OrdenesServicio;
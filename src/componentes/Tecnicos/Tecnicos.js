import React, { Component } from "react";
import { QueryTecnicos } from "../../Querys/Tecnicos";
import { Query, Mutation } from "react-apollo";
import { Link } from "react-router-dom";
import {suprimirTecnico} from '../../Mutations/Tecnicos';

class Tecnicos extends Component {
  render() {
    return (
      <Query query={QueryTecnicos} 
      variables={{ buscar: "{}" }}
      pollInterval={100}
      >
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error `;
         

          return (
            <div className="container flex  justify-content-center">
              <table className="table  table-bordered mt-5">
                <thead className="bg-danger">
                  <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Empresa</th>
                    <th className="text-center ">Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {data.getTecnicos.map(tecnico => {
                    return (
                      <tr key={tecnico.id}>
                  <td>{tecnico.nombre.nombre} {tecnico.nombre.apellido1}</td>
                        <td>{tecnico.zona.canton}</td>
                       
                       
                        <td className="d-flex justify-content-around">
                          <button
                            type="button"
                            className="btn btn-primary btn-sm"
                          >
                            Editar
                          </button>
                          <Mutation mutation={suprimirTecnico}>
                            {(eliminarTecnico, { loading, error, data }) => {
                              if (loading) return "Cargando..."
                              if(error) return error
                              return(

                                <button
                                type="button"
                                className="btn btn-danger btn-sm"
                                onClick={()=>{
                                  eliminarTecnico({variables:{id: tecnico.id}})
                                 }}
                                >
                                Eliminar
                              </button>
                                )
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

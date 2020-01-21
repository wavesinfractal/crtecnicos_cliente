import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import {  Mutation } from "react-apollo";
import { queryOrdenesServicio } from "../../Querys/OrdenServicio";
import { MutationEliminarCliente } from "../../Mutations/Clientes";
import Paginador from "../Paginador";
import Alerts from "../layouts/Alerts";
import { Link } from "react-router-dom";

const OrdenesServicio = props => {  
  const [limite, setLimite] = useState(10);
  const [offset, setOffset] = useState(0);
  const [paginaActual, setPaginaActual] = useState(1);
  const [alerta, setAlerta] = useState({ mostrar: false, mensaje: "" });
  const { loading, error, data, startPolling, stopPolling } = useQuery(
    queryOrdenesServicio,
    {
      pollInterval: 100,
      variables: {
        limite: limite,
        offset: offset,
        buscar: ` { \"cliente\" : \"${props.session.id}\"  ,  \"estado\" : 0 } `
      }
    }
  );
  const paginaAnterior = () => {
    setOffset({
      offset: offset - limite,
      paginaActual: paginaActual - 1
    });
  };

  const paginaSiguiente = () => {
    setOffset({
      offset: offset + limite,
      paginaActual: paginaActual + 1
    });
  };

  if (loading) return "Cargando...";
  if (error) return `Error ${error}`;
  

  return (
    <div className="container flex  justify-content-center">
      {alerta.mostrar ? <Alerts mensaje={alerta.mensaje} /> : ""}
      <table className="table  table-bordered mt-5">
        <thead className="bg-light">
          <tr>
            <th scope="col">Orden</th>
            <th scope="col " className="d-none d-md-block ">
              Tecnico
            </th>
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
                <td className="d-none d-md-block">{item.tecnico}</td>
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
                    onCompleted={data => {
                      setAlerta({
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
        paginaAnterior={paginaAnterior}
        paginaSiguiente={paginaSiguiente}
        paginaActual={paginaActual}
        totalClientes={data.totalClientes}
        limite={limite}
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
};

export default OrdenesServicio;

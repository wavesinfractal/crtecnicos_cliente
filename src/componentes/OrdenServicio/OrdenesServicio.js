import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { queryOrdenesServicio } from "../../Querys/OrdenServicio";
import { MutationCancelarOrden } from "../../Mutations/OrdenServicio";
import Paginador from "../Paginador";
import Alerts from "../layouts/Alerts";
import { Link } from "react-router-dom";
import moment from "moment";

const OrdenesServicio = props => {
  const [limite, setLimite] = useState(30);
  const [offset, setOffset] = useState(0);
  const [paginaActual, setPaginaActual] = useState(1);
  const [alerta, setAlerta] = useState({ mostrar: false, mensaje: "" });
  // setLimite(0) ;
  // setPaginaActual(0);

  const { loading, error, data } = useQuery(queryOrdenesServicio, {
    pollInterval: 1000,
    variables: {
      limite: limite,
      offset: offset,
      buscar: [
        {
          index: "usuario",
          value: props.session.id
        },
        {
          index: "pendiente",
          value: "true"
        }
      ]
    }
   
  });
  const [cancelarOrdenServicio, { Mloading, merror }] = useMutation(
    MutationCancelarOrden
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
                <td className="d-none d-md-block">
                  {item.tecnico.nombre.nombre}
                </td>
                <td>{moment(item.fecha_inicio).format('L')}</td>
                <td className="d-flex justify-content-around">
                  <Link
                    to={`/clientes/editar/${item.id}`}
                    className="btn btn-primary"
                    href="#"
                    role="button"
                  >
                    Editar
                  </Link>

                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      if (
                        window.confirm(
                          `Estas a punto de eliminar La Orden: ${item.id} .  \nDeseas continuar?`
                        )
                      ) {
                        cancelarOrdenServicio({ variables: { id: item.id } });
                      }
                    }}
                  >
                    Eliminar
                  </button>
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

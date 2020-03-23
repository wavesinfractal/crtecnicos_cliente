import React, {useState} from "react";
import { BuscarArticulos } from "../../Querys/Articulos";
import { Link } from "react-router-dom";
import SessionHook from "../SessionHook";
import { useQuery } from "@apollo/react-hooks";

const Articulos = props => {
  const { session } = SessionHook();

  const { loading, error, data, refetch } = useQuery(BuscarArticulos, {
    pollInterval: 1000,
    variables: { buscar: { propietario: session.id } }
  });

  if (loading) return "loading...";
  if (error) return error;

  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <h1 className="h4">Mis Articulos</h1>
      </div>
      <div className="row">
        <div className="col">
          <ListaArticulos
            data={data}
            refetch={refetch}
            {...props}
          ></ListaArticulos>
        </div>
      </div>
      <div className="container my-5">
        <div className="row justify-content-center">
          <Link to="/articulos/nuevo" className="btn btn-success ">
            Nuevo Articulo
          </Link>
        </div>
      </div>
    </div>
  );
};

const ListaArticulos = props => {
  const { data, seleccion, cerrarModal } = props;
  return (
    <div className="container">
      <ul className="list-group">
        {data.getArticulos.map((item, index) => {
          return (
            <li
              key={index}
              className="list-group-item d-flex align-items-center justify-content-between"
            >
              <div className="">{item.modelo}</div>
              <div className="d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-success btn-sm   mx-1"
                  onClick={() => {
                    seleccion({ articulo: item });
                    cerrarModal();
                  }}
                >
                  Seleccionar
                </button>

                <button type="button" className="btn btn-primary btn-sm   mx-1">
                  Detalles
                </button>

                <button type="button" className="btn btn-danger  btn-sm   mx-1">
                  Eliminar
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Articulos;

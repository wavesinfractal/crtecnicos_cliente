import React, { useState } from "react";
import {useHistory} from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { MutNuevoArticulo } from "../../Mutations/Articulos";

const NuevoArticulo = props => {
  const history = useHistory();
  console.log(props.session.id);
  const [propietario, setPropietario] = useState("");
  const [marca, setMarca] = useState("");
  const [serie, setSerie] = useState("");
  const [modelo, setModelo] = useState("");
  const [historial, setHistorial] = useState("");
  const [imagenes, setImagenes] = useState("");
  const [mantenimiento, setMantenimiento] = useState("");

  const [crearArticulo, { loading, data, error }] = useMutation(
    MutNuevoArticulo
  );
  const EnviarForm = e => {
    e.preventDefault();

    const inputData = {
      propietario: props.session.id,
      serie: serie,
      modelo: modelo,
      historial: { reporte: "5df86dc6a8a6c13e1c820b2e" },
      imagenes: {
        imagen: "0007532_lavadora-automatica-mabe-lmh79104sbab0.jpg"
      },
      proxmantenimiento: mantenimiento
    };
    crearArticulo({ variables: { inputData } }).then(() => { history.push("/articulos");});
  };
  return (
    <div className="container d-flex justify-content-center mt-5 border-2">
      <form
        className="col-md-8 m-3"
        onSubmit={e => {
          EnviarForm(e);
        }}
      >
        <div className="row ">
          <div className="col">
            <div className="container border border-5">
              <img
                src="https://www.tiendamexpress.com/content/images/thumbs/0007532_lavadora-automatica-mabe-lmh79104sbab0.jpeg"
                alt=""
                className="img img-fluid m-4"
              />
            </div>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label>Linea</label>
            <select className="form-control">
              <option value="LINEABLANCA">Electrodomesticos</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label>Marca</label>
            <input
              value={marca}
              type="text"
              className="form-control"
              placeholder="Marca"
              onChange={e => {
                setMarca(e.target.value);
              }}
            />
          </div>
          <div className="form-group col-md-6">
            <label>Modelo</label>
            <input
              value={modelo}
              type="text"
              className="form-control"
              placeholder="Modelo"
              onChange={e => {
                setModelo(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label>Serie</label>
            <input
              value={serie}
              type="text"
              className="form-control"
              placeholder="Serie"
              onChange={e => {
                setSerie(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-4">
            <label>Mantenimiento</label>
            <input
              value={mantenimiento}
              type="date"
              className="form-control"
              placeholder="Mantenimiento"
              onChange={e => {
                setMantenimiento(e.target.value);
              }}
            />
          </div>
          <div className="form-group col-4">
            <label>Linea</label>
            <select className="form-control">
              <option value="Mensual">Mensual</option>
              <option value="Anual">Anual</option>
            </select>
          </div>
        </div>

        <button type="submit" className="btn btn-success float-right">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default NuevoArticulo;

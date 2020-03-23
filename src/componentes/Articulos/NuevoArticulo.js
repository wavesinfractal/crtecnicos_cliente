import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { MutNuevoArticulo } from "../../Mutations/Articulos";
// import { createHashHistory } from 'history'
// const history = createHashHistory()
const NuevoArticulo = props => {
  const history = useHistory();
  const [marca, setMarca] = useState("");
  const [serie, setSerie] = useState("");
  const [modelo, setModelo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagenes, setImagenes] = useState("");

  const [crearArticulo, { loading, data, error }] = useMutation(
    MutNuevoArticulo
  );
  const EnviarForm = e => {
    e.preventDefault();

    const inputData = {
      propietario: props.session.id,
      serie: serie,
      modelo: modelo,
      descripcion: descripcion,
      imagenes: {
        imagen: "0007532_lavadora-automatica-mabe-lmh79104sbab0.jpg"
      }
    };
    // console.log(inputData)
    crearArticulo({ variables: { inputData } }).then(() => {
      history.push("/articulos");
    });
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
            <div className="d-flex justify-content-center container border border-5">
              <img
                src="https://www.tiendamexpress.com/content/images/thumbs/0007532_lavadora-automatica-mabe-lmh79104sbab0.jpeg"
                alt=""
                className="img img-fluid m-4"
                style={{ maxHeight: "250px" }}
              />
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-12">
            <label htmlFor="">Descripcion</label>
            <input
              value={descripcion}
              type="text"
              className="form-control"
              placeholder="Descripcion"
              onChange={e => {
                setDescripcion(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-6">
            <label>Linea</label>
            <select className="form-control">
              <option value="LINEABLANCA">Electrodomesticos</option>
            </select>
          </div>

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
        <button type="button" className="btn btn-success float-right" onClick={()=> history.goBack()}>
          Guardar Cambios
        </button>
        <button type="submit" className="btn btn-success float-right">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default NuevoArticulo;

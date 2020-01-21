import React, { useEffect, useState, useRef } from "react";
// import createPersistedState from "use-persisted-state";
import { MutationNuevaOrden } from "../../Mutations/OrdenServicio";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import SeleccionarTecnico from "../Tecnicos/SeleccionarTecnico";
import Modal from "../Modal";
import Articulos from "../Articulos/Articulos";
import Sectores from "../layouts/Sectores";
import Alerts from "../layouts/Alerts";
import $ from "jquery";

const NuevaOrdenServicio = props => {
  let history = useHistory();
  const refSerie = useRef(null);
  const refFalla = useRef(null);
  const refDireccion = useRef(null);
  const refTecnico = useRef(null);
  const refZona = useRef(null);
  // const useFallaState = createPersistedState("falla");

  const [crearOrdenServicio, { loading, error }] = useMutation(
    MutationNuevaOrden
  );

  const [cliente, setCliente] = useState({
    id: "",
    nombre: "",
    apellido1: "",
    apellido2: ""
  });

  const [articulo, setArticulo] = useState("");
  const [tecnico, setTecnico] = useState({
    id: "",
    nombre: { nombre: "", apellido1: "", apellido2: "" }
  });
  const [falla, setFalla] = useState("");
  const [direccion, setDireccion] = useState("");
  const [modal, setModal] = useState(0);
  const [msgError, setError] = useState(false);
  const [zona, setZona] = useState({ provincia: "", canton: "", distrito: "" });
  const [zonaText, setzonaText] = useState("");
  const [alerta, setAlerta] = useState({
    mostrar: false,
    mensaje: "",
    color: ""
  });
  useEffect(() => {
    $("#myModal").modal("show");
  }, []);

  useEffect(() => {
    if (alerta.mostrar) {
      var timeId = setTimeout(() => {
        setAlerta({
          mostrar: false,
          mensaje: "",
          color: ""
        });
      }, 3000);
    }
    return () => {
      clearTimeout(timeId);
    };
  }, [alerta]);

  // useEffect(() => {
  //   const referencias = [refSerie, refFalla,  refDireccion, refTecnico, refZona];
  //   referencias.map(data => {
  //     let input = data.current;
  //     input.setCustomValidity('Invalid')
  //     console.log("object")
  //   })
  // },[])
  useEffect(() => {
    const referencias = [refZona, refTecnico, refSerie,refFalla,refDireccion];
    refDireccion.current.value = direccion
    refFalla.current.value = falla   
    referencias.map(data => {
      let input = data.current;         
      if (input.value !== "") {
                let valid = input.validity.valid;
        if (valid) {
          input.classList.add("is-valid");
          input.classList.remove("is-invalid");
        } else {
          input.classList.add("is-invalid");
          input.classList.remove("is-valid");
        }
      } else {
        input.classList.remove("is-valid", "is-invalid");
      }
      return;
    });
  }, [tecnico, articulo, falla, direccion, zonaText]);

  const seleccion = data => {     
    if (data.tecnico)  setTecnico(data.tecnico) 
   if (data.articulo) setArticulo(data.articulo)   
   
  };

  const getData = (data, text) => {
    if (data.provincia !== "" || data.canton !== "" || data.distrito !== "")
      setZona({ ...data });
      setzonaText(text);

    $("#MiCollapse").collapse("hide");
  };

  const EnviarMutation = (e, crearUsuario) => {
    e.preventDefault();

    // if (true) {
    //   setAlerta({
    //     mostrar: true,
    //     mensaje: "todos los campos son necesarios",
    //     color: "alert-warning"
    //   });
    //   return;
    // } else {
    //   setAlerta({ mostrar: false, mensaje: "" });
    // }

    const input = {
      cliente: props.session.id,
      tecnico: tecnico.id,
      serie: articulo.id,
      falla: falla,
      direccion: direccion
    };   
    crearOrdenServicio({
      variables: { input }
    }).then(() => {
      history.push("/ordenes");
    });
  };

  const abrirModal = () => {
    switch (modal) {
      case 0:
        return "";
      // break;
      case 1:
        return (
          <Modal
            titulo="Seleccione un Articulo"
            seleccion={seleccion}
            cerrarModal={cerrarModal}
            componente={SeleccionarTecnico}
          />
        );
      // break;
      case 2:
        return (
          <Modal
            titulo="Seleccione un Tecnico"
            seleccion={seleccion}
            cerrarModal={cerrarModal}
            componente={Articulos}
          />
        );      
      default:     
    }
  };

  const cerrarModal = () => {
    setModal(0);
  };
  if (loading) return "loading...";
  if (error) return error;

  return (
    <div className="row d-flex justify-content-center mt-5">
      <div className="col-md-8 ">
        {abrirModal()}
        {alerta.mostrar ? <Alerts data={alerta} /> : ""}
        <form
          className=" m-3"
          onSubmit={e => {
            EnviarMutation(e);
          }}
        >
          <div className="form-row">
            <div className="form-group col-12 ">
              <label htmlFor="zona">zona</label>

              <input
                style={{ textAlign: "center" }}
                id="zona"
                ref={refZona}
                required
                type="text"
                maxLength="20"
                className={"form-control uneditable-input"}
                placeholder="Selecione su zona"
                defaultValue={zonaText}
                data-toggle="collapse"
                href="#MiCollapse"
                onKeyDown={e => {
                  $("#MiCollapse").collapse("show");
                  if (e.keyCode === 13)
                    document.getElementById("provincia").focus();
                  e.preventDefault();
                }}
                onClick={e => {
                  document.getElementById("provincia").focus();
                }}
              />
            </div>

            <div className="collapse  container-fluid" id="MiCollapse">
              <div className="form-group form-row ">
                <Sectores
                  className={"form-control"}
                  getData={getData}
                  values={zona}
                />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6 ">
              <label htmlFor="tecnico">Tecnico</label>
              <input
                required
                id="tecnico"
                ref={refTecnico}
                defaultValue={
                  ( tecnico.nombre.nombre != "" || tecnico.nombre.apellido1 != "") 
                    ? `${tecnico.nombre.nombre} ${tecnico.nombre.apellido1}`
                    : ""
                }
                readOnly                
                className="form-control text-center"
                onClick={() => setModal(1)}
                minLength="10"
                maxLength="10"
                autoComplete="off"                
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="articulo">Articulo</label>
              <input
                required
                defaultValue={ articulo.modelo}
                ref={refSerie}
                id="articulo"                
                readOnly
                className="form-control text-center"                
                onClick={() => setModal(2)}              
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col">
              <div className="form-group">
                <label htmlFor="falla">Falla:</label>
                <textarea
                  required
                  ref={refFalla}
                  className="form-control"
                  rows="3"
                  maxLength="50"
                  minLength="25"
                  onChange={e => {
                    setFalla(e.target.value);                    
                  }}
                  title="Escriba al menos 25 letras."
                />
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col">
              <div className="form-group">
                <label htmlFor="direccion">Direccion:</label>
                <textarea
                  required
                  ref={refDireccion}
                  id="direccion"
                  name="direccion"
                  className="form-control"
                  rows="3"
                  maxLength="100"
                  minLength="40"
                  title="La direccion debe contener mas de 40 letras"
                  onChange={e => {
                    setDireccion(e.target.value);
                  }}
                 
                />
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-success float-right">
            Enviar Orden de Servcio
          </button>
      
        </form>
      </div>
    </div>
  );
};

export default NuevaOrdenServicio;

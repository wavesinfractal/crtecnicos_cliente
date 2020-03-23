import React, { Fragment, useEffect, useState, useRef } from "react";
import { useMutation } from "@apollo/react-hooks";
import { withRouter } from "react-router-dom";
import { MutCrearCodigo, MutEnviarCodigo } from "../../Mutations/Registro";
import Alerts from "../layouts/Alerts";
import Loader from "../layouts/Loader";
const CodConfirmacion = props => {
  const refInput = useRef(null);
  const { movil, email } = props;

  const [crearCod, { loading: Loading2 }] = useMutation(MutCrearCodigo);
  const [EnviarCodigo, { loading: Loading1 }] = useMutation(MutEnviarCodigo);
  const [estado, setEstado] = useState("");
  const [alerta, setAlerta] = useState({
    mostrar: false,
    mensaje: "",
    color: ""
  });

  useEffect(() => {
    crearCod({
      variables: { inputData: { movil: Number(movil), email: email } }
    }).then(data => {
      setEstado(data.data.CodConfirmacion);
    });
  }, [movil, email, crearCod]);


  useEffect(() => {
    if (alerta.mostrar) {
      var timeId = setTimeout(() => {
        setAlerta({
          mostrar: false,
          mensaje: "",
          color: ""
        });
        // props.history.push("/login");
      }, 3000);
    }

    return () => {
      clearTimeout(timeId);
    };
  }, [alerta]);

  const SendCode = () => {
    const texto = Number(refInput.current.value);
    EnviarCodigo({
      variables: {
        inputData: { movil: Number(movil), email: email, codigo: texto }
      }
    }).then(data => {
      if (data.data.SendConfirmacion === "Usuario Confirmado") {
        setAlerta({              
          mostrar: true,
          mensaje: data.data.SendConfirmacion,
          color: "alert-success"              
      });
        
      }
    });
  };
  if (Loading1) return <Loader />;
  if (Loading2) return <Loader />;
  return (
    <Fragment>
      <div className="container d-flex  flex-column   justify-content-center col-sm-10  col-md-5">
        <h1 className="h5 text-center w-100">
          Este es el codigo de confirmacion
        </h1>
        {console.log(alerta)}
      {alerta.mostrar ? <Alerts data={alerta} /> : ""}
        <p className="text-center w-100">{estado}</p>
        <div className="w-100 my-2" />
        <input
          ref={refInput}
          className="text-center"
          type="number"
          placeholder="Introduzca su codigo de verificacion"
          maxLength="6"
        />
        <button
          type="button"
          className="btn btn-primary my-2"
          onClick={e => {
            SendCode();
          }}
        >
          Enviar
        </button>
        <button
          type="button"
          className="btn btn-primary my-2"
          onClick={e => {
            
          }}
        >
          Enviar
        </button>
      </div>
    </Fragment>
  );
};

export default withRouter(CodConfirmacion);

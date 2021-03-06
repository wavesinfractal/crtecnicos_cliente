import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { MutationLogin } from "../../Mutations/General";
import { withRouter, Link } from "react-router-dom";
import Alerts from "../layouts/Alerts";
import ImgLogin from "../../descarga.png";

const Login = props => {
  const [alerta, setAlerta] = useState({
    mostrar: false,
    mensaje: "",
    color: ""
  });

  const [movil, setMovil] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("Cliente");
  
  const clearState = () => {
    setPassword("");
    setMovil("");
  };
  const [login, { loading }] = useMutation(MutationLogin);

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

  useEffect(() => {
    return () => props.refetch();
  }, [props]);

  const SUBMIT = e => {
    e.preventDefault();
    const input = {
      movil: Number(movil),
      password: password
    };

    login({ variables: input }).then(async data => {
      const { token, mensaje } = data.data.login;

      if (token !== null)
        return (
          mensajeAlert(mensaje, "alert-success"),
          await localStorage.setItem(
            "token",
            token,

            await setTimeout(() => {
              props.history.push("/dashboard");
            }, 500)
          )
        );

      if (mensaje) {
        mensajeAlert(mensaje, "alert-danger");
      }
      clearState();
    });
  };

  const validar = u => {
    const novalido = !movil || !password;
    return novalido;
  };

  const mensajeAlert = (message, color) => {
    clearState();
    setAlerta({
      mostrar: true,
      mensaje: message,
      color
    });
  };

  return (
    loading ? "...loading" : "",
    (
      <div className="container full-height">
        {alerta.mostrar ? <Alerts data={alerta} /> : null}
        <div className="row flex justify-content-center align-items-center full-height mt-4">
          <div className="col-11 col-sm-10 col-md-8">
            <div className="form-box">
              <form onSubmit={e => SUBMIT(e)}>
                <fieldset>
                  
                  <div className="d-flex justify-content-between my-5 ">                    
                    <button
                      className="btn btn-primary flex-grow-1 mx-2 float-center "
                      type="button"
                      onClick={()=>setRol("Cliente")}
                    >
                      Cliente
                    </button>
                    <button
                      className="btn btn-primary  flex-grow-1 mx-2 float-center "
                      type="button"
                      onClick={()=>setRol("Tecnico")}
                    >
                      Tecnico
                    </button>
                    <button
                      className="btn btn-primary flex-grow-1 mx-2 float-center"
                      type="button"
                      onClick={()=>setRol("Taller")}
                    >
                      Taller
                    </button>
                  </div>
                  <div className="row d-flex justify-content-center">
                    <div className="col-4">
                      <img
                        alt="Imagen"
                        id="avatar"
                        className="img img-fluid"
                        src={ImgLogin}
                      />
                    </div>
                  </div>

                  <h1 className="h3 text-center">Login {rol}</h1>



                  <input
                    className="form-control my-2"
                    type="number"
                    id="movil"
                    name="movil"
                    placeholder="movil"
                    value={movil}
                    onChange={e => {
                      setMovil(e.target.value);
                    }}
                  />
                  <input
                    className="form-control my-2"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="contraseña"
                    value={password}
                    onChange={e => {
                      setPassword(e.target.value);
                    }}
                  />
                  <div className="row d-flex justify-content-center mt-3">
                    <div className="col-12 col-sm-10 d-flex flex-column justify-content-center">
                      <button
                        disabled={validar()}
                        className="btn btn-primary btn-block "
                        type="submit"
                      >
                        Iniciar sesión
                      </button>
                      <Link
                        to={`/registro/${rol}`}
                        className="btn btn-success  my-3 float-center mx-md-5"
                        type="button"
                        params={{ testvalue: "hello" }}

                      >
                        Crear cuenta {rol}
                      </Link>
                      <Link
                        to="/recuperarpass"
                        className="text-lowercase  my-3 my float-center text-center border-0"
                        type="link"
                        params={{ testvalue: "hello" }}
                        
                      >
                        ¿Olvidaste tu cuenta?{" "}
                      </Link>
                    </div>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default withRouter(Login);

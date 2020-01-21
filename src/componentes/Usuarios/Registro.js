import React, { useState, useRef, useEffect } from "react";
import { mutationNuevoUsuario } from "../../Mutations/Usuarios";
import { withRouter } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import Sectores from "../layouts/Sectores";
import Alerts from "../layouts/Alerts";
import CodConfirmacion from "./CodConfirmacion";
import Loader from "../layouts/Loader";
import $ from "jquery";
const Registro = props => {
  const refNombre = useRef(null);
  const refApellido1 = useRef(null);
  const refConfpassword = useRef(null);
  const refPassword = useRef(null);
  const refCedula = useRef(null);
  const refEmail = useRef(null);
  const refMovil = useRef(null);
  const refNacimiento = useRef(null);
  const refDireccion = useRef(null);
  const refZona = useRef(null);
  const refButtonSubmit = useRef(null);

  const [inputpass, setInputpass] = useState(true);

  const [nombre, setNombre] = useState("");
  const [apellido1, setApellido1] = useState("");
  const [cedula, setCedula] = useState("");
  const [email, setEmail] = useState("");
  const [confpassword, setConfpassword] = useState("");
  const [password, setPassword] = useState("");
  const [movil, setMovil] = useState("");
  const [nacimiento, setNacimiento] = useState("");
  const [zona, setZona] = useState({ provincia: "", canton: "", distrito: "" });
  const [zonaText, setzonaText] = useState("");

  const [direccion, setDireccion] = useState("");
  const [alerta, setAlerta] = useState({
    mostrar: false,
    mensaje: "",
    color: ""
  });
  const [confirmacion, setConfirmacion] = useState(false);
  useEffect(() => {
    refNombre.current.focus();
  }, []);

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
  useEffect(() => {
    const referencias = [
      refNombre,
      refApellido1,
      refConfpassword,
      refPassword,
      refCedula,
      refEmail,
      refMovil,
      refNacimiento,
      refDireccion,
      refZona
    ];

    referencias.map(data => {
      let input = data.current;
      refPassword.current.validity.valid
        ? setInputpass(false)
        : setInputpass(true);

      if (input.name === "confpassword") {
        if (password === confpassword && confpassword !== "") {
          input.setCustomValidity("");
        } else {
          input.setCustomValidity("La contraseñas no coinciden.");
        }
      }

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
  }, [
    nombre,
    apellido1,
    cedula,
    email,
    password,
    confpassword,
    movil,
    nacimiento,
    zona,
    direccion
  ]);

  const getData = (data, text) => {
    if (data.provincia !== "" || data.canton !== "" || data.distrito !== "")
      setZona({ ...data });
    setzonaText(text);

    $("#MiCollapse").collapse("hide");
  };
  const [crearUsuario, { loading }] = useMutation(mutationNuevoUsuario);
  const EnviarMutation = e => {
    e.preventDefault();
    setAlerta({ alerta: { mostrar: false, mensaje: "" } });
    const inputData = {
      nombre: {
        nombre: nombre,
        apellido1: apellido1,
        apellido2: ""
      },
      password: password.trim(),
      cedula: Number(cedula.trim()),
      email: email.trim(),
      movil: Number(movil),
      nacimiento: nacimiento.trim(),
      zona: zona,
      direccion: direccion.trim()
    };
    // console.log(inputData);
    crearUsuario({ variables: { inputData } }).then(data => {
      const mensaje = data.data.crearUsuario.mensaje;
      console.log(mensaje);
      if (data.provincia === "" || data.canton === "" || data.distrito === "") {
        setAlerta({
          mostrar: true,
          mensaje: "Seleccione Una Zona",
          color: "alert-warning"
        });
        return null;
      }

      if (mensaje === "Se a creado la cuenta") {
        setAlerta({
          mostrar: true,
          mensaje: mensaje,
          color: "alert-success"
        });

        setTimeout(() => setConfirmacion(true), 3000);
      }
      if (mensaje === "El Movil ya existe") {
        refMovil.current.setCustomValidity(mensaje);
        refMovil.current.focus();
      }
      if (mensaje === "El Email ya existe") {
        refEmail.current.setCustomValidity(mensaje);
        refMovil.current.focus();
      }
    });
  };

  if (loading) return <Loader />;
  return confirmacion ? (
    <CodConfirmacion email={email} movil={movil} />
  ) : (
    <div className="row d-flex  justify-content-center  mt-3">
      {alerta.mostrar ? <Alerts data={alerta} /> : ""}

      <form
        // noValidate
        className="col-md-8 m-3 needs-validation"
        onSubmit={e => {
          e.preventDefault();
          EnviarMutation(e, crearUsuario);
        }}
      >
        <div className="form-row d-flex justify-content-center">
          <div className="form-group col-auto text-center h4">Registrese</div>
        </div>

        <div className="form-row">
          <div className="form-group  col-md-6">
            <label htmlFor="nombre">Nombre</label>
            <input
              ref={refNombre}
              required
              // autoFocus
              type="text"
              className={"form-control"}
              placeholder="Nombre"
              minLength="2"
              maxLength="20"
              defaultValue={nombre}
              onChange={e => {
                setNombre(e.target.value);
              }}
            />
          </div>

          <div className="form-group col-md-6">
            <label htmlFor="apellido">Apellido </label>
            <input
              ref={refApellido1}
              required
              type="text"
              className={"form-control"}
              placeholder="Apellido"
              minLength="5"
              maxLength="20"
              defaultValue={apellido1}
              onChange={e => {
                setApellido1(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="cedula">Cedula</label>
            <input
              ref={refCedula}
              required
              type="number"
              className="form-control"
              placeholder="0-0000-0000"
              max="300000000"
              min="99999999"
              defaultValue={cedula}
              onChange={e => {
                setCedula(e.target.value);
              }}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="email">Email</label>
            <input
              ref={refEmail}
              required
              type="email"
              className="form-control"
              placeholder="ejemplo@gmail.com"
              defaultValue={"nulluser29@gmail.com"}
              onChange={e => {
                e.target.setCustomValidity("");
                setEmail(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="">Contraseña</label>
            <input
              ref={refPassword}
              required
              type="password"
              minLength="10"
              className={"form-control"}
              placeholder="10 caracteres"
              defaultValue={password}
              onChange={e => {
                setPassword(e.target.value);
                setConfpassword("");
              }}
            />
          </div>
          <div className="form-group col-md-6">
            <label>Confirmar Contraseña</label>
            <input
              disabled={inputpass}
              required
              name="confpassword"
              ref={refConfpassword}
              type="confpassword"
              className="form-control"
              value={confpassword}
              onChange={e => {
                setConfpassword(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="movil">Movil</label>
            <input
              ref={refMovil}
              name="movil"
              required
              type="tel"
              className={"form-control "}
              placeholder="Movil"
              maxLength="8"
              minLength="8"
              pattern="[0-9]+"
              defaultValue={movil}
              onChange={e => {
                e.target.setCustomValidity("");
                setMovil(e.target.value);
              }}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="nacimiento">Fecha de nacimiento</label>
            <input
              id="nacimiento"
              ref={refNacimiento}
              required
              type="date"
              className={"form-control"}
              placeholder="Fecha de nacimiento"
              defaultValue={nacimiento}
              onChange={e => {
                setNacimiento(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="form-group form-row ">
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

        <div className="form-group">
          <label htmlFor="direccion">Direccion:</label>
          <textarea
            required
            ref={refDireccion}
            defaultValue={direccion}
            rows="3"
            maxLength="100"
            minLength="40"
            className={"form-control"}
            onChange={e => {
              setDireccion(e.target.value);
            }}
          />
        </div>

        <button
          ref={refButtonSubmit}
          type="submit"
          className="btn btn-success float-right"
        >
          Guardar Cambios
        </button>
        <button
          className="btn btn-success float-right m-4"
          onClick={() => {
            setConfirmacion(true);
          }}
        >
          daled
        </button>
      </form>
    </div>
  );
};

export default withRouter(Registro);

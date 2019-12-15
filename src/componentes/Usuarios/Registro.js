import React, { Component } from "react";
import { mutationNuevoUsuario } from "../../Mutations/Usuarios";
import { withRouter } from "react-router-dom";
import { Mutation } from "react-apollo";
import Sectores from "../layouts/Sectores";
import Alerts from "../layouts/Alerts";
import CodConfirmacion from "./CodConfirmacion"
import $ from "jquery";
class Registro extends Component {
  state = {
    nombre: { data: "", valid: false },
    apellido1: { data: "", valid: false },
    apellido2: { data: "", valid: false },
    password: { data: "", valid: false },
    cedula: { data: "", valid: false },
    email: { data: "", valid: false },
    movil: { data: "", valid: false },
    nacimiento: { data: "", valid: false },
    zona: { data: { provincia: 0, canton: 0, distrito: 0 }, valid: false },
    direccion: { data: "", valid: false },
    alerta: { mostrar: false, mensaje: "", color: "" },
    confirmacion: false
  };
    
openModal = ()=>{
  
  setTimeout(()=> {
    $("#confirmacion").modal("show") 
    $('.modal-backdrop').remove()
   }) 
}
 
 confirmacion = ()=>{
 
 }
  getData = data => {
    // console.log(data)
    if (
      this.state.provincia !== "" ||
      this.state.canton !== "" ||
      this.state.distrito !== ""
    )
      this.setState({ zona: { data: { ...data }, valid: true } });
  };

  ActualizarState = e => {
    const { name, value } = e.target;
    var data = document.getElementById(name);
    this.setState({ [name]: { data: value, valid: data.validity.valid } });
  };

  EnviarMutation = (e, crearUsuario) => {
    e.preventDefault();

    if (
      this.state.nombre.valid === false ||
      this.state.apellido1.valid === false ||
      this.state.password.valid === false ||
      this.state.cedula.valid === false ||
      this.state.email.valid === false ||
      this.state.movil.valid === false ||
      this.state.nacimiento.valid === false ||
      this.state.zona.valid === false ||
      this.state.direccion.valid === false
    ) {
      // console.log("verdadaero")
      this.setState({
        alerta: {
          mostrar: true,
          mensaje: "todos los campos son necesarios",
          color: "alert-danger"
        }
      });
      return;
    } else {
      // console.log("falso")
      this.setState({ alerta: { mostrar: false, mensaje: "" } });
    }

    const inputData = {
      nombre: {
        nombre: this.state.nombre.data,
        apellido1: this.state.apellido1.data,
        apellido2: ""
      },
      password: this.state.password.data,
      cedula: Number(this.state.cedula.data),
      email: this.state.email.data,
      movil: Number(this.state.movil.data),
      nacimiento: this.state.nacimiento.data,
      zona: this.state.zona.data,
      direccion: this.state.direccion.data
    };
    // console.log(inputData);
    crearUsuario({ variables: { inputData } });
  };

  render() {
    // console.log(this.state.email.valid);



    return (this.state.confirmacion) ?  <CodConfirmacion/> :
    
    
    (
     
      <div className="row d-flex  justify-content-center  mt-3">
        { this.confirmacion() }
        {this.state.alerta.mostrar ? <Alerts data={this.state.alerta} /> : ""}
        <Mutation
          mutation={mutationNuevoUsuario}
          onCompleted={data => {
            this.setState({
              alerta: {
                mostrar: true,
                mensaje: data.crearUsuario.mensaje,
                color: "alert-success"
              }
            });
            setTimeout(() => {
              this.setState({confirmacion:true})
              // this.props.history.push("/confirmar");
            }, 2000);
          }}
        >
          {(crearUsuario, { loading, error, data }) => {
            if (loading) return "Cargando...";
            if (error) return error;

            return ( 
             
              <form
                // noValidate
                className="col-md-8 m-3 needs-validation"
                onSubmit={e => this.EnviarMutation(e, crearUsuario)}
              >
                <div className="form-row d-flex justify-content-center">
                  <div className="form-group col-auto text-center h4">
                    Registrese
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="nombre">Nombre</label>

                    <input
                      autoFocus
                      required
                      id="nombre"
                      name="nombre"
                      type="text"
                      className={`form-control ${
                        this.state.nombre.data
                          ? this.state.nombre.valid
                            ? "is-valid"
                            : "is-invalid"
                          : ""
                      }`}
                      placeholder="Nombre"
                      minLength="2"
                      maxLength="20"
                      defaultValue={this.state.nombre.data}
                      onChange={e => {
                        this.ActualizarState(e);
                      }}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="apellido">Apellido </label>
                    <input
                      required
                      id="apellido1"
                      name="apellido1"
                      type="text"
                      className={`form-control ${
                        this.state.apellido1.data
                          ? this.state.apellido1.valid
                            ? "is-valid"
                            : "is-invalid"
                          : ""
                      }`}
                      placeholder="Apellido"
                      minLength="5"
                      maxLength="20"
                      defaultValue={this.state.apellido1.data}
                      onChange={e => {
                        this.ActualizarState(e);
                      }}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="cedula">Cedula</label>
                    <input
                      required
                      id="cedula"
                      name="cedula"
                      type="number"
                      className={`form-control ${
                        this.state.cedula.data
                          ? this.state.cedula.valid
                            ? "is-valid"
                            : "is-invalid"
                          : ""
                      }`}
                      placeholder="0-0000-0000"
                      max="300000000"
                      min="99999999"
                      defaultValue={this.state.cedula.data}
                      onChange={e => {
                        this.ActualizarState(e);
                      }}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="email">Email</label>
                    <input
                      required
                      id="email"
                      name="email"
                      type="email"
                      className={`form-control ${
                        this.state.email.data
                          ? this.state.email.valid
                            ? "is-valid"
                            : "is-invalid"
                          : ""
                      }`}
                      placeholder="ejemplo@gmail.com"
                      defaultValue={this.state.email.data}
                      onChange={e => {
                        this.ActualizarState(e);
                      }}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="">Contraseña</label>
                    <input
                      required
                      id="password"
                      name="password"
                      type="password"
                      minLength="10"
                      className={`form-control ${
                        this.state.password.data
                          ? this.state.password.valid
                            ? "is-valid"
                            : "is-invalid"
                          : ""
                      }`}
                      placeholder="Cedula"
                      defaultValue={this.state.password.data}
                      onChange={e => {
                        this.ActualizarState(e);
                      }}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Confirmar Contraseña</label>
                    <input
                      type="password"
                      className={`form-control ${
                        this.state.password.data
                          ? this.state.password.valid
                            ? "is-valid"
                            : "is-invalid"
                          : ""
                      }`}
                      defaultValue={this.state.password.data}
                      onChange={e => {}}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="movil">Movil</label>
                    <input
                      required
                      id="movil"
                      name="movil"
                      type="tel"
                      className={`form-control ${
                        this.state.movil.data
                          ? this.state.movil.valid
                            ? "is-valid"
                            : "is-invalid"
                          : ""
                      }`}
                      placeholder="Movil"
                      maxLength="8"
                      minLength="8"
                      pattern="[0-9]+"
                      defaultValue={this.state.movil.data}
                      onChange={e => {
                        this.ActualizarState(e);
                      }}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="nacimiento">Fecha de nacimiento</label>
                    <input
                      required
                      id="nacimiento"
                      name="nacimiento"
                      type="date"
                      className={`form-control ${
                        this.state.nacimiento.data
                          ? this.state.nacimiento.valid
                            ? "is-valid"
                            : "is-invalid"
                          : ""
                      }`}
                      placeholder="Fecha de nacimiento"
                      defaultValue={this.state.nacimiento.data}
                      onChange={e => {
                        this.ActualizarState(e);
                      }}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <Sectores
                    getData={this.getData}
                    values={this.state.zona.data}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="direccion">Direccion:</label>
                  <textarea
                    required
                    id="direccion"
                    name="direccion"                    
                    rows="3"
                    maxLength="100"
                    minLength="40"
                    className={`form-control ${
                      this.state.direccion.data
                        ? this.state.direccion.valid
                          ? "is-valid"
                          : "is-invalid"
                        : ""
                    }`}
                    onChange={e => {
                      this.ActualizarState(e);
                    }}
                    defaultValue={this.state.direccion.data}
                  />
                </div>


 <button type="submit" className="btn btn-success float-right">
                  Guardar Cambios
                </button>
               
              </form>
            );
          }}
        </Mutation>

  
      </div>
    );
  }
}

export default withRouter(Registro);

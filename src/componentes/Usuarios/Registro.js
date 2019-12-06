import React, { Component } from "react";
import { mutationNuevoUsuario } from "../../Mutations/Usuarios";
import { withRouter } from "react-router-dom";
import { Mutation } from "react-apollo";
import Sectores from "../layouts/Sectores";
import Alerts from "../layouts/Alerts";
class Registro extends Component {
  state = {
    nombre: "",
    apellido: "",
    password: "",
    cedula: "",
    email: "",
    movil: "",
    nacimiento: "",
    zona: {},
    direccion: "",
    alerta: { mostrar: false, mensaje: "", color: "" }
  };

  getData = data => {
    this.setState({ zona: { ...data } });
    // console.log(this);
  };
  ActualizarState = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  EnviarMutation = (e, crearUsuario) => {
    e.preventDefault();

    if (
      this.state.nombre === "" ||
      this.state.apellido === "" ||
      this.state.password === "" ||
      this.state.cedula === "" ||
      this.state.email === "" ||
      this.state.movil === "" ||
      this.state.nacimiento === "" ||
      this.state.zona === "" ||
      this.state.direccion === ""
    ) {
      this.setState({
        alerta: {
          mostrar: true,
          mensaje: "todos los campos son necesarios",
          color: "alert-danger"
        }
      });
      return;
    } else {
      this.setState({ alerta: { mostrar: false, mensaje: "" } });
    }

    const inputData = {
      nombre: this.state.nombre,
      apellido: this.state.apellido,
      password: this.state.password,
      cedula: Number(this.state.cedula),
      email: this.state.email,
      movil: Number(this.state.movil),
      nacimiento: this.state.nacimiento,
      zona: this.state.zona,
      direccion: this.state.direccion
    };
    
    crearUsuario({ variables: { inputData } });
  };

  render() {
    return (
      <div className="row d-flex  justify-content-center  mt-3">
        {this.state.alerta.mostrar ? <Alerts data={this.state.alerta} /> : ""}
        <Mutation
          mutation={mutationNuevoUsuario}
          onCompleted={(data) => {            
            this.setState({ alerta: { mostrar: true, mensaje: data.crearUsuario.mensaje, color:"alert-success" } })
            setTimeout(()=>{ this.props.history.push("/confirmar")},2000)
          
          }
          
          }
        >
          {(crearUsuario, { loading, error, data }) => {
            if (loading) return "Cargando...";
            if (error) return error;

            return (
              <form
                className="col-md-8 m-3"
                onSubmit={e => this.EnviarMutation(e, crearUsuario)}
              >
                <div className="form-row d-flex justify-content-center">
                  <div className="form-group col-auto text-center h4">
                    Registrese
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Nombre</label>
                    <input
                      name="nombre"
                      type="text"
                      className="form-control"
                      placeholder="Nombre"
                      defaultValue= {this.state.nombre}
                      onChange={e => {
                        this.ActualizarState(e);
                      }}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Apellido</label>
                    <input
                      name="apellido"
                      type="text"
                      className="form-control"
                      placeholder="Apellido"
                      defaultValue= {this.state.apellido}
                      onChange={e => {
                        this.ActualizarState(e);
                      }}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Cedula</label>
                    <input
                      name="cedula"
                      type="number"
                      className="form-control"
                      placeholder="Cedula"
                      defaultValue= {this.state.movil}
                      onChange={e => {
                        this.ActualizarState(e);
                      }}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Email</label>
                    <input
                      name="email"
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      defaultValue= {this.state.email}
                      onChange={e => {
                        this.ActualizarState(e);
                      }}
                    />
                  </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label>Contraseña</label>
                      <input
                        name="password"
                        type="password"
                        className="form-control"
                        placeholder="Cedula"
                        defaultValue= {this.state.password}
                        onChange={e => {
                          this.ActualizarState(e);
                        }}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label>Confirmar Contraseña</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Contraseña"
                        defaultValue= {this.state.password}
                        onChange={e => {}}
                      />
                    </div>
                  </div>
                
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Movil</label>
                    <input
                      name="movil"
                      type="number"
                      className="form-control"
                      placeholder="Movil"
                      defaultValue= {this.state.movil}
                      onChange={e => {
                        this.ActualizarState(e);
                      }}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Fecha de nacimiento</label>
                    <input
                      name="nacimiento"
                      type="text"
                      className="form-control"
                      placeholder="Fecha de nacimiento"
                      defaultValue= {this.state.nacimiento}
                      onChange={e => {
                        this.ActualizarState(e);
                      }}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <Sectores getData={this.getData} values={this.state.zona}/>
                </div>
                <div className="form-group">
                  <label htmlFor="comment">Direccion:</label>
                  <textarea
                    name="direccion"
                    className="form-control"
                    rows="3"
                    id="comment"
                    onChange={e => {
                      this.ActualizarState(e);
                    }}
                    defaultValue={this.state.direccion}
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

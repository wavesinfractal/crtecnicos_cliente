import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { MutationNuevaOrden } from "../../Mutations/OrdenServicio";
// import SeleccionTecnico from "../Tecnicos/SeleccionTecnico";
import SeleccionarTecnico from "../Tecnicos/SeleccionarTecnico";
import Modal from "../Modal";
// import Modali from "../layouts/Modal";
import Articulos from "../Articulos/Articulos";
import Sectores from "../layouts/Sectores"
import $ from "jquery";

class NuevaOrdenServicio extends Component {
  state = {
    cliente: { data: "", valid: false },
    tecnico: {
      data: { nombre: "", apellido1: "", apellido2: "" },
      valid: false
    },
    serie: { data: "", valid: false },
    falla: { data: "", valid: false },
    direccion: { data: "", valid: false },
    modal: 0,
    error: false,
    zona: { data: { provincia: 0, canton: 0, distrito: 0 }, valid: false },
  };

  ActualizarState = e => {
    const { name, value } = e.target;
    var data = document.getElementById(name);
    this.setState({ [name]: { data: value, valid: data.validity.valid } });
  };

  seleccion = data => {
    var tec = document.getElementById("tecnico");
    this.setState({
      tecnico: { data: data.tecnico.nombre, valid: tec.validity.valid }
    });
  };

  EnviarMutation = (e, crearUsuario) => {
    e.preventDefault();

    if (
      this.state.cliente.valid === "" ||
      this.state.tecnico.valid === "" ||
      this.state.serie.valid === "" ||
      this.state.falla.valid === "" ||
      this.state.direccion.valid === ""
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

    const input = {
      cliente: this.state.cliente.id,
      tecnico: this.state.tecnico.id,
      serie: this.state.serie,
      falla: this.state.falla,
      direccion: this.state.direccion
    };
    console.log(input);
    // crearOrdenServicio({
    //   variables: { input }
    // });
  };

  abrirModal = () => {
    switch (this.state.modal) {
      case 0:
        return "";
      // break;
      case 1:
        return (
          <Modal
            titulo="Seleccione un Articulo"
            seleccion={this.seleccion}
            cerrarModal={this.cerrarModal}
            componente={SeleccionarTecnico}
          />
        );
      // break;
      case 2:
        return (
          <Modal
            titulo="Seleccione un Tecnico"
            seleccion={this.seleccion}
            cerrarModal={this.cerrarModal}
            componente={Articulos}
          />
        );
      // break;
      default:
      // break;
    }
  };

  cerrarModal = () => {
    this.setState({ modal: 0 });
  };

  componentDidUpdate() {
    $("#myModal").modal("show");
  }

  render() {
    return (
      <div className="row d-flex justify-content-center mt-5">
        <div className="col-md-8 ">
          {this.abrirModal()}

          {this.state.error ? (
            <p className="alert alert-danger p-3 text-center ">
              Todos los campos son obligatorios
            </p>
          ) : (
            ""
          )}

          <Mutation
            mutation={MutationNuevaOrden}
            onCompleted={() => this.props.history.push("/clientes")}
          >
            {(crearOrdenServicio, { loading, error, data }) => {
              if (loading) return "loading...";
              if (error) return error;
              return (
                <form className=" m-3">
                  <div className="form-row ">  
                      <Sectores
                      getData={this.getData}
                      values={this.state.zona.data}
                      />
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="tecnico">Tecnico</label>
                      <button
                        id="tecnico"
                        name="tecnico"
                        type="button"
                        className={`form-control ${
                          this.state.tecnico.data.nombre
                            ? this.state.tecnico.valid
                              ? "is-valid"
                              : "is-invalid"
                            : ""
                        }`}
                        onClick={() => this.setState({ modal: 1 })}
                        onChange={e => {
                          this.ActualizarState(e);
                        }}
                      >
                        {this.state.tecnico.data.nombre}{" "}
                        {this.state.tecnico.data.apellido1}
                      </button>
                    </div>
                    <div className="form-group col-md-6">
                      <label>Articulo</label>
                      <button
                        required
                        id="articulo"
                        name="articulo"
                        type="button"
                        className="form-control"
                        onClick={() => this.setState({ modal: 2 })}
                        onChange={e => {
                          this.ActualizarState(e);
                        }}
                      >
                        {this.state.serie.data}
                      </button>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col">
                      <div className="form-group">
                        <label htmlFor="falla">Falla:</label>
                        <textarea
                          name="falla"
                          id="falla"
                          className={`form-control ${
                            this.state.falla.data
                              ? this.state.falla.valid
                                ? "is-valid"
                                : "is-invalid"
                              : ""
                          }`}
                          rows="3"
                          maxLength="100"
                          minLength="40"
                          onChange={e => {
                            this.ActualizarState(e);
                          }}
                          defaultValue={this.state.falla.data}
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
                          id="direccion"
                          name="direccion"
                          className={`form-control ${
                            this.state.direccion.data
                              ? this.state.direccion.valid
                                ? "is-valid"
                                : "is-invalid"
                              : ""
                          }`}
                          rows="3"
                          maxLength="100"
                          minLength="40"
                          title="La direccion debe contener mas de 40 letras"
                          onChange={e => {
                            this.ActualizarState(e);
                          }}
                          defaultValue={this.state.direccion.data}
                        />
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-success float-right">
                    Enviar Orden de Servcio
                  </button>
                </form>
              );
            }}
          </Mutation>
        </div>
      </div>
    );
  }
}

export default NuevaOrdenServicio;

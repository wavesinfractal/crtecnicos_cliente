import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { MutationNuevaOrden } from "../../Mutations/OrdenServicio";
// import SeleccionTecnico from "../Tecnicos/SeleccionTecnico";
import SeleccionarTecnico from "../Tecnicos/SeleccionarTecnico";
import Modal from "../Modal";
import Modali from "../layouts/Modal";
import Articulos from "../Articulos/Articulos";

import $ from "jquery";

class NuevaOrdenServicio extends Component {
  state = {
    cliente: {},
    tecnico: {},
    serie: "",
    falla: "",
    direccion: "",
    modal: 0,
    error: false
  };

  seleccionarTecnico = ok => {
    this.setState(ok);
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
            seleccion={this.seleccionarTecnico}
            cerrarModal={this.cerrarModal}
            componente={SeleccionarTecnico}
          />
        );
        // break;
      case 2:
        return (
          <Modal
            titulo="Seleccione un Tecnico"
            seleccion={this.seleccionarTecnico}
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
    this.setState({ modal: 0 })
    
  };

  componentDidUpdate() {
    $("#myModal").modal("show")
  }

 

  render() {
    return (
      <div className="row d-flex justify-content-center mt-5">
      
        <div className="col-md-8 ">
          {this.abrirModal()}
         


  



         <button class="ui button" onClick={()=>$('.ui.modal')
  .modal('show')}>Long Modal</button>


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
              <form
                className=" m-3"
                onSubmit={e => {
                  e.preventDefault();

                  if (
                    this.state.cliente === "" ||
                    this.state.tecnico === "" ||
                    this.state.serie === "" ||
                    this.state.falla === "" ||
                    this.state.direccion === ""
                  ) {
                    this.setState({ error: true });
                    return;
                  } else {
                    this.setState({ error: false });
                  }

                  const input = {
                    cliente: this.state.cliente.id,
                    tecnico: this.state.tecnico.id,
                    serie: this.state.serie,
                    falla: this.state.falla,
                    direccion: this.state.direccion
                  };

                  crearOrdenServicio({
                    variables: { input }
                  });
                }}
              >
                <div className="form-row d-flex justify-content-between">
                  <div className="form-group col-6">
                    <label>Ubicacion</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                    />
                  </div>
                  <div className="form-group col-6">
                    <label>Cliente</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Empresa"
                      onChange={e => {
                        this.setState({ cliente: e.target.value });
                      }}
                    />
                  </div>
                </div>
        
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Tecnico</label>
                    <button
                      type="button"
                      className="form-control"
                      onClick={() => this.setState({ modal: 1 })}
                    >
                      {this.state.tecnico.nombre}
                    </button>
                  </div>
                  <div className="form-group col-md-6">
                    <label>Articulo</label>
                    <button
                      type="button"
                      className="form-control "
                      onClick={() => this.setState({ modal: 2 })}
                    >
                      {this.state.serie}
                    </button>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col">
                    <div className="form-group">
                      <label htmlFor="commentario">Falla:</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        id="commentario"
                        onChange={e => {
                          this.setState({ falla: e.target.value });
                        }}
                        defaultValue={this.state.falla}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col">
                    <div className="form-group">
                      <label htmlFor="comment">Direccion:</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        id="comment"
                        onChange={e =>
                          this.setState({ direccion: e.target.value })
                        }
                        defaultValue={this.state.direccion}
                      />
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-success float-right">
                  Guardar Cambios
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

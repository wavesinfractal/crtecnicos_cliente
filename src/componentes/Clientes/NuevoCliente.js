import React, { Component, Fragment } from "react";
import { Mutation } from "react-apollo";
import { MutationCrearCliente } from "../../Mutations/Clientes";

class NuevoCliente extends Component {
  state = {
    cliente: {
      nombre: "",
      apellido: "",
      empresa: "",
      edad: "",      
      tipo: ""
    },
    error: false,
    emails: []
  };

  agregarMail = () => {
    this.setState({ emails: this.state.emails.concat([{ email: "" }]) });
  };

  quitarMail = i => {
    // console.log(this.state.emails.filter((mail, index) => i !== index));
    this.setState({
      emails: this.state.emails.filter((mail, index) => i !== index)
    });
  };

  leerCampo = (i, e) => {
    this.setState({
      emails: this.state.emails.map((email, index) => {
        if (i === index) {
          //Modifique el campo en el que este escribiendo
          return {
            ...email, //Spread Operetor Agrega al Array los Campos que se van iterando
            email: e.target.value, // modifica el campo que se esta escribiendo
            
          };
        } else {
          return {
            ...email //retorne todo si no es el mismo index  
          };         
        }
      })
    });  
    
  };

  render() {
    
    return (
      <Fragment>
        <h1 className="text-center mt-5 h3">Nuevo Clientes</h1>
        {this.state.error ? (
          <p className="alert alert-danger p-3 text-center">
            Todos los campos son obligatorios
          </p>
        ) : (
          ""
        )}
        <div className="row d-flex justify-content-center">
          <Mutation
            mutation={MutationCrearCliente}
            onCompleted={() => this.props.history.push("/clientes")}
          >
            {(crearCliente, { loading, error, data }) => {
              return (
                <form
                  className="col-md-8 m-3 mt-5"
                  onSubmit={e => {
                    e.preventDefault();

                    if (
                      this.state.cliente.nombre === "" ||
                      this.state.cliente.apellido === "" ||
                      this.state.cliente.empresa === "" ||
                      this.state.cliente.edad === "" ||
                      this.state.cliente.tipo === "" 
                      
                    ) {
                      this.setState({ error: true });
                      return;
                    } else {
                      this.setState({ error: false });
                    }
                   
                    
                    const input = {
                      nombre: this.state.cliente.nombre,
                      apellido: this.state.cliente.apellido,
                      empresa: this.state.cliente.empresa,
                      edad: Number(this.state.cliente.edad),
                      tipo: this.state.cliente.tipo,
                      emails:this.state.emails
                    };
                  
                    

                    crearCliente({
                      variables: { input }
                    });
                  }}
                >
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label>Nombre</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nombre"
                        onChange={e => {
                          this.setState({
                            cliente: {
                              ...this.state.cliente,
                              nombre: e.target.value
                            }
                          });
                        }}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label>Apellido</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Apellido"
                        onChange={e => {
                          this.setState({
                            cliente: {
                              ...this.state.cliente,
                              apellido: e.target.value
                            }
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-12">
                      <label>Empresa</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Empresa"
                        onChange={e => {
                          this.setState({
                            cliente: {
                              ...this.state.cliente,
                              empresa: e.target.value
                            }
                          });
                        }}
                      />
                    </div>
                    {this.state.emails.map((data, index) => {
                      return (
                        <div key={index} className="form-group col-md-12">
                          <label>{`Email ${index + 1}`}</label>
                          <div className="input-group">
                            <input
                              value={this.state.emails[index].email}
                              type="email"
                              className="form-control "
                              placeholder="Email"
                              onChange={e => this.leerCampo(index, e)}
                            />
                            <div className="input-group-append">
                              <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => this.quitarMail(index)}
                              >
                                &times; Eliminar
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    <div className="form-group d-flex justify-content-center col-12">
                      <button
                        type="button"
                        className="btn btn-warning"
                        onClick={() => this.agregarMail()}
                      >
                        + Agregar Mail
                      </button>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label>Edad</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Edad"
                        onChange={e => {
                          this.setState({
                            cliente: {
                              ...this.state.cliente,
                              edad: Number(e.target.value)
                            }
                          });
                        }}
                      />
                    </div>
                    <div
                      className="form-group col-md-6"
                      
                    >
                      <label>Tipo Cliente</label>
                      <select className="form-control"
                      onChange={e => {
                        this.setState({
                          cliente: {
                            ...this.state.cliente,
                            tipo: e.target.value
                          }
                        });
                      }}
                      >
                        <option value="">Elegir...</option>
                        <option value="PREMIUM">PREMIUM</option>
                        <option value="BASICO">BÁSICO</option>
                      </select>
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
      </Fragment>
    );
  }
}

export default NuevoCliente;

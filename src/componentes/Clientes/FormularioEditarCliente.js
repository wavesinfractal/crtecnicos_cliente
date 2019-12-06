import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { MutationActualizarCliente } from "../../Mutations/Clientes";
import { Mutation } from "react-apollo";

 
class FormularioEditarCliente extends Component {
  state = {
    cliente: this.props.cliente,
    emails: this.props.cliente.emails
  };
 
  agregarMail = () => {
    this.setState({
      emails: this.state.emails.concat([{ email: "" }])
    });
  };

  quitarMail = i => {
    this.setState({
      emails: this.state.emails.filter((mail, index) => i !== index) //DEvolver todo lo que no sea igual a index
    });
  };

  leerCampo = (i, e) => {
    this.setState({
      emails: this.state.emails.map((email, index) => {
        if (i === index) {
          //Modifique el campo en el que este escribiendo
          return {          
            email: e.target.value // modifica el campo que se esta escribiendo
          };
        } else {
          return {
            ...email //retorne los mails que no contengan el mismo index que esta escribiendo
          };
        }
      })
    });
  };

  render() {
    return (
      <Mutation
        mutation={MutationActualizarCliente}
        onCompleted={() =>
          this.props.refetch().then(() => {
            this.props.history.push("/clientes");
          })
        }
      >
        {(actualizarCliente, { loading, error, data }) => {
          if (loading) return "Cargando...";
          if (error) return error;

          return (
            <form
              className="col-md-8 m-3"
              onSubmit={e => {
                e.preventDefault();

                const input = {
                  id: this.state.cliente.id,
                  nombre: this.state.cliente.nombre,
                  apellido: this.state.cliente.apellido,
                  empresa: this.state.cliente.empresa,
                  edad: Number(this.state.cliente.edad),
                  emails: this.state.emails,
                  tipo: this.state.cliente.tipo
                };

                actualizarCliente({ variables: { input } });
              }}
            >
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Nombre</label>
                  <input
                    defaultValue={this.state.cliente.nombre}
                    type="text"
                    className="form-control"
                    onChange={e =>
                      this.setState({
                        cliente: {
                          ...this.state.cliente,
                          nombre: e.target.value
                        }
                      })
                    }
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Apellido</label>
                  <input
                    defaultValue={this.state.cliente.apellido}
                    type="text"
                    className="form-control"
                    onChange={e =>
                      this.setState({
                        cliente: {
                          ...this.state.cliente,
                          apellido: e.target.value
                        }
                      })
                    }
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col-md-12">
                  <label>Empresa</label>
                  <input
                    value={this.state.cliente.empresa}
                    type="text"
                    className="form-control"
                    onChange={e =>
                      this.setState({
                        cliente: {
                          ...this.state.cliente,
                          empresa: e.target.value
                        }
                      })
                    }
                  />
                </div>

                <button
                  className="btn btn-warning my-3"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseExample"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  Emails
                </button>
                <div className="collapse w-100 my-1" id="collapseExample">
                  <div className="card card-body">
                    {                    
                      this.state.emails.map((input, index) => (
                      <div key={index} className="form-group col-md-12">
                        <label>Email {index + 1} : </label>
                        <div className="input-group">
                          <input
                            value={this.state.emails[index].email}
                            type="email"
                            placeholder={`Email`}
                            className="form-control"
                            onChange={e => this.leerCampo(index, e)}
                          />
                          <div className="input-group-append">
                            <button
                              className="btn btn-danger"
                              type="button"
                              onClick={() => this.quitarMail(index)}
                            >
                              &times; Eliminar
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="form-group d-flex justify-content-center col-md-12">
                      <button
                        onClick={() => this.agregarMail()}
                        type="button"
                        className="btn btn-warning"
                      >
                        + Agregar Email
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Edad</label>
                  <input
                    defaultValue={this.state.cliente.edad}
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Tipo Cliente</label>
                  <select
                    className="form-control"
                    defaultValue={this.state.cliente.tipo}
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
    );
  }
}

export default withRouter(FormularioEditarCliente);

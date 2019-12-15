import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { MutationLogin } from "../../Mutations/General";
import { withRouter, Link } from "react-router-dom";
import Alerts from "../layouts/Alerts";
import ImgLogin from "../../descarga.png";
const elstate = {
  movil: "",
  password: ""
};

class Login extends Component {
  state = {
    ...elstate,
    alerta: { mostrar: false, mensaje: "", color: "" }
  };

  sendlogin = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  SUBMIT = (e, login) => {
    e.preventDefault();
    const input = {
      movil: Number(this.state.movil),
      password: this.state.password
    };

    login({ variables: input }).then(async data => {
        const { token, mensaje } = data.data.login;
      if (token !== null)
        return (
          this.mensajeAlert(mensaje),
          await localStorage.setItem(
            "token",
            token,
            
            await  setTimeout(()=>{ this.props.history.push("/dashboard")},500),
          )
        );

      if (mensaje) {
        this.mensajeAlert(mensaje);
      }
      this.setState({ ...elstate });
    });
  };

  componentWillUnmount() { 
    this.props.refetch()
  }

  validar = u => {
    const { movil, password } = this.state;
    const novalido = !movil || !password;

    return novalido;
  };

  mensajeAlert = mensaje => {
    this.setState(
      {
        ...elstate,
        alerta: {
          mostrar: true,
          mensaje: mensaje,
          color: "alert-warning"
        }
      },
      () => {
        setTimeout(() => {
          this.setState({
            alerta: {
              mostrar: false,
              mensaje: "",
              color: ""
            }
          });
        }, 3000);
      }
    );
  };

  render() {
    return (
      <Mutation mutation={MutationLogin}>
        {(login, { loading, error, data }) => {
          if (loading) return loading;
          if (error) return error;
          return (
            <div className="container full-height">
              {this.state.alerta.mostrar ? (
                <Alerts data={this.state.alerta} />
              ) : (
                ""
              )}
              <div className="row flex justify-content-center align-items-center full-height mt-4">
                <div className="col-11 col-sm-10 col-md-8">
                  <div className="form-box">
                    <form onSubmit={e => this.SUBMIT(e, login)}>
                      <fieldset>
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

                        <input
                          className="form-control my-2"
                          type="number"
                          id="movil"
                          name="movil"
                          placeholder="movil"
                          onChange={e => {
                            this.sendlogin(e);
                          }}
                        />
                        <input
                          className="form-control my-2"
                          type="password"
                          id="password"
                          name="password"
                          placeholder="contraseña"
                          onChange={e => {
                            this.sendlogin(e);
                          }}
                        />
                        <div className="row d-flex justify-content-center my-3 p-5">
                          <div className="col-12 col-sm-10 d-flex flex-column justify-content-center">
                            <button
                              disabled={this.validar()}
                              className="btn btn-primary btn-block "
                              type="submit"
                            >
                              Iniciar sesión
                            </button>
                            <Link
                              to="/registro"
                              className="btn btn-success  my-3 float-center mx-md-5"
                              type="button"
                            >
                              Crear cuenta nueva{" "}
                            </Link>
                            <Link
                              to="/recuperarpass"
                              className="text-lowercase  my-3 my float-center text-center border-0"
                              type="link"
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
          );
        }}
      </Mutation>
    );
  }
}

export default withRouter(Login);

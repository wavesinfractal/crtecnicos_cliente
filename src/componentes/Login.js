import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { MutationLogin } from "../Mutations/General";
import { withRouter } from "react-router-dom";
import Alerts from "../componentes/layouts/Alerts";

import ImgLogin from "../descarga.png"
const elstate = {
  movil: "",
  password: ""
};


class Login extends Component {
  state = {
    ...elstate,
    alerta: { mostrar: false, mensaje: "" }
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

    login({ variables: input }).then( data=>{
      console.log(data)
      const {token,mensaje} = data.data.login         
          if (token !== null) return   ( this.mensajeAlert(mensaje),
           localStorage.setItem('token',token,
           
          this.props.history.push('/dashboard')
          )) 

           if (mensaje) {this.mensajeAlert(mensaje)};
      this.setState({ ...elstate });
       
    });
    
  };

 componentWillUnmount()
{this.props.refetch()}

  validar = u => {
    const { movil, password } = this.state;
    const novalido = !movil || !password;

    return novalido;
  };

 mensajeAlert = (mensaje)=> {

  this.setState(
    {...elstate,
      alerta: {
        mostrar: true,
        mensaje: mensaje
      }
    },
    () => {
      setTimeout(() => {
        this.setState({
          alerta: {
            mostrar: false,
            mensaje: ""
          }
        });
       
      },3000);
    }
  );
 }
  solonumeros = (e) => 
 {
var key = window.event ? e.which : e.keyCode;
     if(key < 48 || key > 57)
         e.preventDefault();
 }

  render() {
    
    return (
      <Mutation
        mutation={MutationLogin}
        
      >
        {(login, { loading, error, data }) => {
          if (loading) return loading;
          if (error) return error;
          return (
            <div className="container full-height">
              {this.state.alerta.mostrar ? (
                <Alerts mensaje={this.state.alerta.mensaje} />
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
                          type="text"
                          onKeyPress={(e)=> this.solonumeros(e)}
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
                        <button                          
                          className="btn btn-success  my-3 float-center "
                          type="button"
                          >
                          Crear cuenta nueva{" "}
                        </button>

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

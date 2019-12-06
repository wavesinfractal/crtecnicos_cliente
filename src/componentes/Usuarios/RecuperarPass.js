import React, { Component } from "react";

class RecuperarPass extends Component {
  render() {
    return (
      <div className="row d-flex  justify-content-center  mt-3">
        <form className="col-md-8 m-3">
          <div className="form-row d-flex justify-content-center">
            <div className="form-group col-auto text-center h4">
              Recuperar Contraseña
            </div>
          </div>

          <div className="form-row ">
            <div className="form-group text-center col">
              <label>Tipo Cliente</label>
              <select className="form-control">
                <option value="">Elegir...</option>
                <option value="Email">Email</option>
                <option value="movil">Numero Telefonico</option>
              </select>
              <div className="w-100" />

              <input
                type="text"
                className="form-control my-2"
                placeholder=""
                onChange={e => {}}
              />

              <button type="button" className="btn btn-success float-right">
                Enviar Codigo
              </button>

              <div className="form-row mt-5 ">
                <div className="form-group text-center col">
                  <label>Introduzca su codigo de recuperacion</label>
                  <input
                    type="text"
                    className="form-control my-2"
                    placeholder="Codigo de 6 digitos"
                    onChange={e => {}}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default RecuperarPass;

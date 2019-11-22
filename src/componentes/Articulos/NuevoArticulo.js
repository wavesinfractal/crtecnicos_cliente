import React, { Component } from "react";

class NuevoArticulo extends Component {
  render() {
    return (
      <div class="container d-flex justify-content-center mt-5 border-2">
        <form className="col-md-8 m-3">
          <div className="row ">
            <div className="col">
              <div className="container border border-5">
                <img
                  src="https://files.encuentra24.com/large/pa/14/81/23/73/14812373_0e0f26.jpg"
                  alt=""
                  className="img img-fluid m-4"
                />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label>Marca</label>
              <input type="text" className="form-control" placeholder="Marca" />
            </div>
            <div className="form-group col-md-6">
              <label>Modelo</label>
              <input
                type="text"
                className="form-control"
                placeholder="Modelo"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label>Serie</label>
              <input type="text" className="form-control" placeholder="Serie" />
            </div>
            <div className="form-group col-md-6">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label>Cantidad de reparaciones</label>
              <input type="text" className="form-control" placeholder="" />
            </div>
            <div className="form-group col-md-6">
              <label>Linea</label>
              <select className="form-control">
                
                <option value="LINEABLANCA">Electrodomesticos</option>
               
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-success float-right">
            Guardar Cambios
          </button>
        </form>
      </div>
    );
  }
}

export default NuevoArticulo;

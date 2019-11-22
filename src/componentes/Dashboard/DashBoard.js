import React, { Component } from 'react';

class DashBoard extends Component {
    render() {
        
        const {nombre, apellido} = (this.props.session) ?  this.props.session : {nombre:"",apellido:""}
        return (
            <div>
                <h1 className="text-center ">Tablero</h1>
                <p>{nombre} {apellido}</p>
                <div className="card-columns">
  <div className="card bg-primary">
    <div className="card-body text-center text-light">
      <p className="card-text">Servicios Pendientes</p>
    </div>
  </div>
  <div className="card bg-warning">
    <div className="card-body text-center">
      <p className="card-text">Mi lista de Articulos</p>
    </div>
  </div>
  <div className="card bg-success">
    <div className="card-body text-center">
      <p className="card-text">Mis Tecnicos Favoritos</p>
    </div>
  </div>
  <div className="card bg-danger">
    <div className="card-body text-center">
      <p className="card-text">Historial de Servicio</p>
    </div>
  </div>
  <div className="card bg-light">
    <div className="card-body text-center">
      <p className="card-text">Some text inside the fifth card</p>
    </div>
  </div>
  <div className="card bg-info">
    <div className="card-body text-center">
      <p className="card-text">Some text inside the sixth card</p>
    </div>
  </div>
</div>

            </div>
        );
    }
}
export default DashBoard;
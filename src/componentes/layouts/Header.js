import React, { Component } from "react";
import {Link} from 'react-router-dom';
import CerrarSession from './CerrarSession';

class Header extends Component {

  render() {
    const {nombre, apellido} = (this.props.session) ?  this.props.session : {nombre:"",apellido:""}
     
        
       return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between d-flex mb-3">
        
        <div className="container">
        <button className="navbar-toggler sidebar-toggler" type="button" data-toggle="sidebar-show">
                  <span className="navbar-toggler-icon"></span>
        </button>
          <a href="/" className="navbar-brand text-light font-weight-bold">CRTecnicos</a>
          {/* <div className="row d-flex align-item-center justify-content-end">

          <p className="text-right text-light ">{` ${nombre} ${apellido}`}</p>
          </div> */}
    
          <button
            className="navbar-toggler "
            type="button"
            data-toggle="collapse"
            data-target="#navegacion"
            aria-controls="navegacion"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navegacion">
            <ul className="navbar-nav ml-auto text-right">
              <li className="nav-item active">
                {/* <Link to={`/login`} className="btn text-light">Login</Link>                 */}
                <Link to={`/clientes`} className="btn text-light">Cliente</Link>                
                <Link to={`/tecnicos`} className="btn text-light">Tecnicos</Link>               
                <Link to={`/ordenes`} className="btn text-light">Ordenes de servicio</Link>
                <Link to={`/ordenes/nuevo`} className="btn text-light">Nueva orden de servivio</Link>
                <CerrarSession/>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;

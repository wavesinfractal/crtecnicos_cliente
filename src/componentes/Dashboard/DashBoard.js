import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

class DashBoard extends Component {
  // componentWillUnmount() {
  //   this.props.refetch()
  // }
  render() {
    
    return (
      <Fragment>
        <div className="row  text-center">
          <h1 className="h4 w-100">Tablero</h1>
        </div>
        <div className="row justify-content-center my-3">
          <div className="col-sm-10 justify-content-center  text-center ">
            <Link
              type="button"
              className="btn btn-lg btn-primary btn-block text-center text-light my-3"
              to="/ordenes/nuevo"
            >
              Reportar Articulo
            </Link>
            <Link
              type="button"
              className="btn btn-lg btn-primary btn-block text-center text-light my-3"
              to="/reportes"
            >
              Panel de Control
            </Link>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default DashBoard;

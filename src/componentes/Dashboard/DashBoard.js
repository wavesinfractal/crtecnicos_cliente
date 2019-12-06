import React, { Component } from "react";
import { Link } from "react-router-dom";

class DashBoard extends Component {
  // componentWillUnmount() { 
  //   this.props.refetch()
  // }
  render() {
  
    const { nombre, apellido } = this.props.session
      ? this.props.session
      : { nombre: "", apellido: "" };
    return (
      
      
        

     
        <div className="row justify-content-center my-3">
        <h1 className="text-center h5">Tablero</h1>
         <div className="col-sm-10 justify-content-center  text-center ">

           
       <Link type="button" className="btn btn-lg btn-primary btn-block text-center text-light my-2" to="/ordenes/nuevo">
             Reportar Articulo Dañado
            </Link>
       
       
       
       <Link type="button" className="btn btn-lg btn-primary btn-block  text-center text-light my-2" to="/reportes">
             Panel de Control
            </Link>
       </div>
        
         </div>
        

        

       

  
    );
  }
}
export default DashBoard;

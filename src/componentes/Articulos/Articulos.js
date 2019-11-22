import React, { Component } from "react";
import { BuscarArticulos } from "../../Querys/Articulos";
import { Query } from "react-apollo";

class Articulos extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <Query query={BuscarArticulos}>
              {({ loading, error, data }) => {
                if (loading) return "loading...";
                if (error) return error;

                return (
                  <div className="container">
                    <ul className="list-group">
                      {data.getArticulos.map((item, index) => {
                        return (
                          <li key={index} className="list-group-item">
                            {item.modelo} 
                             <button 
                             data-dismiss="modal"
                             onClick={()=>{
                              this.props.seleccion({ serie : item.serie});
                              this.props.cerrarModal();
                              }}
                             className="btn btn-success btn-sm float-right mx-1">Seleccionar
                             </button>
                             <button className="btn btn-primary  btn-sm float-right mx-1">Ver Detalles</button>

                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              }}
            </Query>
          </div>
        </div> 
        <div className="container my-5">

        <div className="row justify-content-center">
          <div className="col-4">
           <button className="btn btn-primary btn-block">Nuevo Articulo</button>
          </div>
          <div className="col-4">
          <button className="btn btn-primary btn-block">Nuevo Articulo</button>
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default Articulos;

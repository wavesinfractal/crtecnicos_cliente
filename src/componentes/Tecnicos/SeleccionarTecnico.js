import React, { Component } from "react";
import { QueryTecnicos } from "../../Querys/Tecnicos";
import { Query } from "react-apollo";
// import { Link } from "react-router-dom";
// import {suprimirTecnico} from '../../Mutations/Tecnicos';
export default class SeleccionarTecnico extends Component {
  render() {
    return (
      <Query
        query={QueryTecnicos}
        variables={{ buscar: "{}" }}
        pollInterval={100}
      >
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error `;         
          return (
            <div className="container ">
              <div className="row d-flex  justify-content-center">
                {data.getTecnicos.map((data, index) => (
                  <div   key={data.id} className="col d-flex  justify-content-center text-center">
                    <div className="ui card my-2">
                      <div className="content ">
                        <div className="right floated meta">14h</div>
                        <img
                          className="ui avatar image"
                          src="http://192.168.1.10/objetos/01.jpg"
                          alt="imagen Tecnico"
                        />
                        {`${data.nombre.nombre} ${data.nombre.apellido1}`, console.log(data)} 
                      </div>
                      <div className="content ">
                        <div className="right floated meta">14h</div>                       
                        {`${data.zona.canton} ${data.zona.distrito}`} 
                      </div>
                  
                      <div className="content ">
                        
                        <span className="right floated">
                          <i className="star icon text-warning"></i>
                          17 likes
                        </span>
                        <span className="left floated">
                        <i className="comment icon"></i>3 comments
                        </span>
                      </div>
                      <div className="extra content">
                        <div className="container-fluid">

                        <div className="row d-flex  justify-content-center">
                          <div className="col-6"><button type="button" className="btn btn-block btn-sm btn-primary ">Seleccionar</button></div>
                          <div className="col-6"><button type="button" className="btn btn-block btn-sm btn-primary ">Ver Informacion</button></div>

                        </div>
                        </div>
                      
                      


                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

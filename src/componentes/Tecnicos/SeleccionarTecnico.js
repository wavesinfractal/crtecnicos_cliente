import React, { Component, useRef, useEffect } from "react";
import { QueryTecnicos } from "../../Querys/Tecnicos";
import { Query } from "react-apollo";
// import { Link } from "react-router-dom";
// import {suprimirTecnico} from '../../Mutations/Tecnicos';
const SeleccionarTecnico = props => {
  const starts = useRef(null);

  useEffect(() => {
    // calificar()
    // return () => {
    //   cleanup
    // };
  }, []);

  const calificar = num => {
    const starTotal = 5;
    const starPercentage = (num / starTotal) * 100;
    const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;    
    return starPercentageRounded;
  };

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
          <div className="container" >
            <div className="row d-flex  justify-content-center">
              {data.getTecnicos.map((data, index) => (
                <div
                  key={data.id}
                  className="col d-flex  justify-content-center text-center"
                >
                  <div className="ui card my-2">
                    <div className="d-flex flex-column" style={{backgroud: "#444"}}>

                     <figure className="figure">
                       <img src={`http://192.168.1.10/objetos/${data.id}.jpg`} className="figure-img img-fluid rounded p-3" alt=""/>
                       <figcaption className="h4">{`${data.nombre.nombre} ${data.nombre.apellido1}` }</figcaption>
                     </figure>

                      {/* <img 
                        className="img img-thumbnail img-fluid"
                        src="http://192.168.1.10/objetos/01.jpg"
                        alt="imagen Tecnico" 
                      /> */}
                      
                    </div>
                    <div className="content ">                     
                      {`${data.zona.canton} ${data.zona.distrito}`}
                    </div>

                    <div className="content">
                      <span className="right floated" >
                        <div ref={starts} className="dataa">
                          <div className="stars-outer">
                            <div
                              className="stars-inner"
                              style={{ width: `${calificar(data.raking)}` }}
                            ></div>
                          </div>
                        </div>

                    
                      </span>
                      <span className="left floated">
                        <i className="comment icon"></i>3 comments
                      </span>
                    </div>
                    <div className="extra content">
                      <div className="container-fluid">
                        <div className="row d-flex  justify-content-center">
                          <div className="col-6">
                            <button
                              type="button"
                              className="btn btn-block btn-sm btn-success"
                              onClick={() => {
                                props.seleccion({
                                  tecnico: {
                                    id: data.id,
                                    nombre: data.nombre,
                                    cedula: data.cedula
                                  }
                                });
                                props.cerrarModal();
                              }}
                            >
                              Seleccionar
                            </button>
                          </div>
                          <div className="col-6">
                            <button
                              type="button"
                              className="btn btn-block btn-sm btn-success "
                            >
                              Ver Informacion
                            </button>
                          </div>
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
};

export default SeleccionarTecnico;

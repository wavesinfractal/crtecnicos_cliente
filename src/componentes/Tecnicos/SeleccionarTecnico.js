import React,  {useRef } from "react";
import { QueryTecnicos } from "../../Querys/Tecnicos";
import { Query } from "react-apollo";
import "./index.css";
const SeleccionarTecnico = props => {
  const starts = useRef(null);

  const calificar = num => {
    const starTotal = 5;
    const starPercentage = (num / starTotal) * 100;
    const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
    return starPercentageRounded;
  };
  function search(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].tipo === nameKey) {
            return myArray[i].url;
        }
    }
}
  return (
    <Query
      query={QueryTecnicos}
      variables={{ buscar: {
        index: "rol",
        value: "1"
      } }}
      pollInterval={100}
    >
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error `;
        return (
          <div className="contenedor-tarjeta ">
            <div className="tarjetas">
              {console.log(data)}
              
              {data.getUsuarios.map((data, index) => (
                <div key={data.id} className="tarjeta">
                  <div
                    className="d-flex justify-content-center"
                    style={{ backgroud: "#444" }}
                  >
                    <div className="container">
                     
                    <img
                      src={search("thumb", data.imagenes)}
                      className="imagen figure-img img-fluid rounded p-3"    
                      alt="tecnico"                  
                    />
                  </div>
                  </div>

                  <div className="tarjeta-contenido">
                    {`${data.nombre.nombre} ${data.nombre.apellido1}`}
                    {`${data.zona.canton} ${data.zona.distrito}`}

                    <div ref={starts} className="dataa">
                      <div className="stars-outer">
                        <div
                          className="stars-inner"
                          style={{ width: `${calificar(data.tecnicoid.raking)}` }}
                        />
                      </div>
                    </div>

                    <span>
                      <i className="comment icon" />3 comments
                    </span>
                  </div>

                  <div className="tarjeta-pie">
                    <button
                      type="button"
                      className="boton"
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

                    <button type="button" className="boton">
                      Ver
                    </button>
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

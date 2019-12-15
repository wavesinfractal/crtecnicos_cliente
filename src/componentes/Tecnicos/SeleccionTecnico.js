// import React, { Component } from "react";
// // import { Query } from "react-apollo";
// // import FiltroBusqueda from "./FiltroBusqueda";
// import Slider from "react-slick";

// class SeleccionTecnico extends Component {
//   render() {
//     var settings = {
//       dots: true,
//       infinite: true,
//       speed: 900,
//       slidesToShow: 1,
//       slidesToScroll: 1
//     };
//     const data = [
//       {
//         id: "5dca4278a0c3f12af02d6340",
//         nombre: "Alexader Nuñez",
//         skills: "tecnico en linea blanca",
//         imagen: "http://192.168.1.10/objetos/01.jpg",
//         cedula: "203457789"
//       },
//       {
//         id: "5dca4278a0c3f12af02d6258",
//         nombre: "Luis turbina",
//         skills: "tecnico en linea blanca",
//         imagen: "http://192.168.1.10/objetos/02.jpg",
//         cedula: "20sss7789"
//       },
//       {
//         id: "5dca4278a0c3f12af02d6456",
//         nombre: "Joacsan jimenez",
//         skills: "tecnico en linea blanca",
//         imagen: "http://192.168.1.10/objetos/03.jpg",
//         cedula: "235457743"
//       }
//     ];
//     return (
//       <Slider {...settings}>
//         {data.map((datos, index) => (
//           <div key={index} className="container ">
//             <div className="card ">
//               <div className="row d-flex justify-content-center">
//                 <div className="col-8 col-sm-10 col-lg-12  text-center">
//                   <img
//                     className="card-img-top "
//                     src={datos.imagen}
//                     alt="Card "
//                   />
//                 </div>
//               </div>
//               <div className="card-body row d-flex justify-content-center">
//                 <div className="col">
//                   <div className="row d-flex justify-content-center">
//                     <h6 className="card-title  h6 ">{datos.nombre}</h6>
//                   </div>

//                   <div className="row d-flex justify-content-center my-3">
//                     <p className="card-text ">{datos.skills}</p>
//                   </div>
//                   <div className="row d-flex justify-content-around ">
//                     <div className="col ">
//                       <button
//                         type="button"
//                         name=""
//                         id=""
//                         className="btn btn-primary btn btn-block flex-wrap  "
//                         data-dismiss="modal"
//                         onClick={() => {

//                           this.props.seleccion({
//                             tecnico: {
//                               id: datos.id,
//                               nombre: datos.nombre,
//                               cedula: datos.cedula
//                             }
//                           });
//                           this.props.cerrarModal();
//                         }}
//                       >
//                         Seleccionar
//                       </button>
//                     </div>
//                     <div className="col">
//                       <button
//                         type="button"
//                         name=""
//                         id=""
//                         className="btn btn-primary btn btn-block flex-wrap  "
//                         data-dismiss="modal"
//                         onClick={() => {}}
//                       >
//                         Ver detalles
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </Slider>
//     );
//   }
// }

// export default SeleccionTecnico;

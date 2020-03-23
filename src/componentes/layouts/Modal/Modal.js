import React, { Fragment, useRef, useEffect } from "react";
import "./Modal.css"
// import $ from "jquery";
const Modal = (props) => {

  const modalRef = useRef(null);
 const Componente = props.componente

  useEffect(() => {    
  abrirModal()
  }, [props.init]);



  const cerrarModal1 = () =>{
    modalRef.current.style.display = "none"
    props.setModal(0)
  }

  const abrirModal =() =>{
    setTimeout(() => {  
      modalRef.current.style.display = "block"
    }, 100);
  }

  return (
    <Fragment>      
      <div className="modal" ref={modalRef} >
        <div className="container-modal">
          <span  className="close" onClick={()=> cerrarModal1()}>&times;</span>
          {
            <Componente
              seleccion={props.seleccion}
              cerrarModal={cerrarModal1}
            />
          }
        </div>
      </div>
    </Fragment>
  );
};

export default Modal;


 //     $(".modal-backdrop").remove();
      // $("#myModal").modal("show");
      //     $("#myModal").on("hidden.bs.modal", () => this.props.cerrarModal());
      //     $(".modal-backdrop").remove();
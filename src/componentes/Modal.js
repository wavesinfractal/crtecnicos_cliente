import React, { Component } from "react";
import $ from "jquery";
class Modal extends Component {
 
  componentDidMount (){
    setTimeout(()=>{     
      $('.modal-backdrop').remove()
      $("#myModal").modal("show")    
      $("#myModal").on('hidden.bs.modal',  () =>  this.props.cerrarModal())    
      $('.modal-backdrop').remove();  
    },100)   
   

    
  }

  render() {
    return (
      <div className="modal" id="myModal">
        <div className="modal-dialog ">
          <div className="modal-content bg-light border-0">
            <div className="modal-header ">
              <div className="container-fluid">
                <div className="row d-flex justify-content-around  ">
                  <div className="col-auto text-left">
                    <button
                      type="button"
                      className="btn btn-sm btn-rounded btn-primary"
                      
                    >
                      x
                    </button>
                  </div>

                  <div className="col-auto  text-center">
                    <h1 className=" h5-md h6 ">{this.props.titulo}</h1>
                  </div>
                  
                  <div className="col-auto  text-right">
                  <span 
                  
                  type="button"
                  className="badge badge-pill badge-danger h5"
                  data-dismiss="modal"
                  onClick={() => this.props.cerrarModal()}
                  >Danger</span>
                    
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-body bg-transparent">
            {
              <this.props.componente
                seleccion={this.props.seleccion}
                cerrarModal={this.props.cerrarModal}                
              />
            }
            </div>
            <div className="modal-footer"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;

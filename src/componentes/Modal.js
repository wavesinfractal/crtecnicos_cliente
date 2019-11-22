import React, { Component } from "react";

class Modal extends Component {
  render() {
    return (
      <div className="modal" id="myModal">
        <div className="modal-dialog ">
          <div className="modal-content">
            <div className="modal-header ">
              <div className="container">
                <div className="row d-flex justify-content-around  ">
                  <div className="col text-left">
                    <button
                      type="button"
                      className="btn btn-sm btn-rounded btn-primary"
                      
                    >
                      Atras
                    </button>
                  </div>

                  <div className="col  text-center">
                    <h1 className="h5">{this.props.titulo}</h1>
                  </div>

                  <div className="col  text-right">
                    <button
                      type="button"
                      className="btn btn-sm btn-rounded btn-danger"
                      data-dismiss="modal"
                      onClick={() => this.props.cerrarModal()}
                    >
                      x
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-body "></div>
            {
              <this.props.componente
                seleccion={this.props.seleccion}
                cerrarModal={this.props.cerrarModal}
              />
            }
            <div className="modal-footer"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;

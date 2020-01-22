import React, { Component, Fragment } from "react";
import $ from "jquery";
class Modal extends Component {
  componentDidMount() {
    setTimeout(() => {
      $(".modal-backdrop").remove();
      $("#myModal").modal("show");
      $("#myModal").on("hidden.bs.modal", () => this.props.cerrarModal());
      $(".modal-backdrop").remove();
    }, 100);
  }

  render() {
    return (
      <Fragment>
        <h2>Modal Example</h2>

        

        <div id="myModal" class="modal">
        
          <div class="container-modal">
            <span class="close">&times;</span>
            {
            <this.props.componente
              seleccion={this.props.seleccion}
              cerrarModal={this.props.cerrarModal}
            />
          }
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Modal;

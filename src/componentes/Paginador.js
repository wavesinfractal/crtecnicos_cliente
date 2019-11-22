import React, { Component } from "react";

class Paginador extends Component {
  state = {
    paginas: Math.ceil(
      Number(this.props.totalClientes) / Number(this.props.limite)
    )
  };

  btnAtras = () => {
    if (this.props.paginaActual !== 1)
      return (
        <button
          className="btn btn-primary mx-3"
          onClick={this.props.paginaAnterior}
        >
          Atras
        </button>
      );
  };

  btnAdelante = () => {
    if (this.props.paginaActual !== this.state.paginas) {
      return (
        <button
          className="btn btn-primary mx-3"
          onClick={this.props.paginaSiguiente}
        >
          Adelante
        </button>
      );
    }
  };

  render() {
    return (
      <div className="d-flex justify-content-center my-5">
        {this.btnAtras()}
        {this.btnAdelante()}
      </div>
    );
  }
}

export default Paginador;

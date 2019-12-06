import React, { Component, Fragment } from "react";

class Sectores extends Component {
  state = {
    provincias: [],
    cantones: [],
    distritos: [],
    provincia: this.props.values.provincia,
    canton: this.props.values.canton ,
    distrito: this.props.values.distrito
  };
  controller = new AbortController();
  componentWillMount() {
    this.getProvincias();
  }
  componentWillUnmount() {
    this.controller.abort();
  }

  getDatos = () => {    
    const { provincia, canton, distrito } = this.state;
    this.props.getData({ provincia, canton, distrito });
  };

  getProvincias = async () => {
    let response = await fetch(
      `https://ubicaciones.paginasweb.cr/provincias.json`,
      { signal: this.controller.signal }
    );
    let provincias = await response.json();

    for (let prop in provincias) {
      this.setState({ provincias: Object.values(provincias) });
    
    }
  };

  getCanton = async provincia => {
    await this.setState({ provincia: Number(provincia) });

    let response = await fetch(
      `https://ubicaciones.paginasweb.cr/provincia/${this.state.provincia}/cantones.json`,
      { signal: this.controller.signal }
    );
    let cantones = await response.json();
    for (let prop in cantones) {
      prop = 1;
      this.setState({ cantones: Object.values(cantones) });
    }
  };

  getDistritos = async canton => {
    await this.setState({ canton: Number(canton) });

    let response = await fetch(
      `https://ubicaciones.paginasweb.cr/provincia/${this.state.provincia}/canton/${this.state.canton}/distritos.json`,
      { signal: this.controller.signal }
    );
    let distritos = await response.json();
    for (const prop in distritos) {
      this.setState({ distritos: Object.values(distritos) });
    }
  };
  sendCallback = async distrito => {
    
    await this.setState({ distrito: Number(distrito) });
    await this.getDatos();
  };

  render() {
    return (
      <Fragment>
        <div className="form-group col-md-4">
          <label>Provincia</label>
          <select
            className="form-control"
            defaultValue={this.state.provincia}
            onChange={e => {
              this.getCanton(Number(e.target.value));
            }}
          >
            <option value="">Elegir...</option>
            {this.state.provincias.map((data, index) => (
              <option key={index} value={index + 1}>
                {data}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group col-md-4">
          <label>Canton</label>
          <select
            className="form-control"
            defaultValue={this.state.canton}
            onChange={e => {
              this.getDistritos(e.target.value);
            }}
          >
            <option value="">Elegir...</option>
            {this.state.cantones.map((data, index) => (
              <option key={index} value={index + 1}>
                {data}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group col-md-4">
          <label>Distrito</label>
          <select
            className="form-control"
            defaultValue={this.state.distrito}
            onChange={e => this.sendCallback(e.target.value)}
          >
            <option value="">Elegir...</option>
            {this.state.distritos.map((data, index) => (
              <option key={index} value={index + 1}>
                {data}
              </option>
            ))}
          </select>         
        </div>
      </Fragment>
    );
  }
}

export default Sectores;

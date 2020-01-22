import React, { Fragment, useState, useEffect, useRef } from "react";

const Sectores = props => {
  const [provincias, setProvincias] = useState([]);
  const [cantones, setCantones] = useState([]);
  const [distritos, setDistritos] = useState([]);
  const [provincia, setProvincia] = useState(props.values.provincia);
  const [canton, setCanton] = useState(props.values.canton);
  const [distrito, setDistrito] = useState(props.values.distrito);
  

  useEffect(() => {
    const controller = new AbortController();
    getProvincias(controller);

    if (provincia > 0) {
      getCantones(controller);
    }
    if (canton > 0 && provincia > 0) {
      getDistritos(controller);
    }
    if (canton > 0 && provincia > 0 && distrito > 0) {
      sendDatos();
      // controller.abort();
    }
    return () => {      
      controller.abort();
    };
  }, [provincia, canton, distrito]);

  const refProvincia = useRef(null);
  const refCanton = useRef(null);
  const refDistrito = useRef(null);

  const sendDatos = () => {

     var Provincia =  refProvincia.current.options[refProvincia.current.value].text
     var Canton = refCanton.current.options[refCanton.current.value].text  
     var Distrito = refDistrito.current.options[refDistrito.current.value].text


     Provincia = (Provincia === "Elegir...")?null: Provincia
     Canton = (Canton === "Elegir...")?null: Canton
     Distrito = (Distrito === "Elegir...")?null: Distrito
      
     const texto = Array(Provincia, Canton,  Distrito)


   

    props.getData({ provincia, canton, distrito },texto.join(" - "));



  };

  const getProvincias = async controller => {
    let response = await fetch(
      `https://ubicaciones.paginasweb.cr/provincias.json`,
      { signal: controller.signal }
    );
    let provincias = await response.json();
    setProvincias(provincias);
  };

  const getCantones = async controller => {
    let response = await fetch(
      `https://ubicaciones.paginasweb.cr/provincia/${provincia}/cantones.json`,
      { signal: controller.signal }
    );
    let cantones = await response.json();
    setCantones(cantones);
  };

  const getDistritos = async controller => {
    let response = await fetch(
      `https://ubicaciones.paginasweb.cr/provincia/${provincia}/canton/${canton}/distritos.json`,
      { signal: controller.signal }
    );
    let distritos = await response.json();
    setDistritos(distritos);
  };

  return (
    <Fragment>
      <div className="form-group col-sm-4">
        <label>Provincia</label>
        <select
         required
         id="provincia"
          ref={refProvincia}
          className="form-control"
          onChange={e => {
            // refCanton.current.value =  "0";
            refCanton.current.selectedIndex = 0;
            refDistrito.current.selectedIndex = 0;
            setCantones([]);
            setDistritos([]);
            setCanton("");
            setDistrito("");
            setProvincia(Number(e.target.value));
          }}
        >
          <option value="0">Elegir...</option>
          {Object.values(provincias).map((data, index) => (            
            <option key={index} value={index + 1}>
              {data}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group col-sm-4">
        <label>Canton</label>
        <select
          required
          ref={refCanton}
          className="form-control"
          onChange={e => {
            setCanton(Number(e.target.value));
            refDistrito.current.selectedIndex = 0;
            setDistritos([]);
          }}
        >
          <option value="0">Elegir...</option>
          {Object.values(cantones).map((data, index) => (
            <option key={index} value={index + 1}>
              {data}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group col-sm-4">
        <label>Distrito</label>
        <select
         required
            ref={refDistrito}
            className="form-control"
            onChange={e => {
            setDistrito(Number(e.target.value));
          }}
        >
          <option value="0">Elegir...</option>
          {Object.values(distritos).map((data, index) => (            
            <option key={index} value={index + 1}>
              {data}
            </option>
          ))}
        </select>
      </div>
    </Fragment>
  );
};

export default Sectores;

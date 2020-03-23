import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import CerrarSession from "../CerrarSession";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import "./index.css"
// import AddToHomescreen from "react-add-to-homescreen";





const Header = props => {
 
  return (
    <nav className="header">
     
      
          <Botton {...props} />
       

        <a href="/" className="icon-nav">
          CRTECNICOS
        </a>
      

        <button
          className="button-nav"
          type="button"
          data-toggle="collapse"
          data-target="#navegacion"
          aria-controls="navegacion"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
           <FontAwesomeIcon icon={faBars} size="2x" style={{color:"#fff"}}/>
        </button>

        <User />

        <div className="collapse navbar-collapse" id="sidebar">
          <ul className="navbar-nav ml-auto text-left">
            <li className="nav-item active"></li>
          </ul>
        </div>
     
    </nav>
  );
};

const User = () => (
  <Fragment>
    {/* <AddToHomescreen
      onAddToHomescreenClick={alert(`
    1. Open Share menu
    2. Tap on "Add to Home Screen" button`)}
    /> */}
    <div className="collapse navbar-collapse" id="navegacion">
      <ul className="navbar-nav ml-auto text-right">
        <li className="nav-item active">
          <Link to={`/dashboard`} className="btn text-light">
            Tablero
          </Link>
          <Link to={`/tecnicos`} className="btn text-light">
            Tecnicos
          </Link>
          <Link to={`/ordenes`} className="btn text-light">
            Ordenes de servicio
          </Link>
          <Link to={`/tecnicos/seleccionar`} className="btn text-light">
            Seleccionar Tecnico
          </Link>
          <Link to={`/lorem`} className="btn text-light">
 lorem
          </Link>

          <CerrarSession />
        </li>
      </ul>
    </div>
  </Fragment>
);



const Botton = props => (  
  <button
    className="button-nav"
    type="button"  
    onClick={() =>
      setTimeout(() => {
        props.setView(1);
      }, 50)
    }
    >    
    <FontAwesomeIcon icon={faBars} size="2x" style={{color:"#fff"}}/>
  </button>
);

const Bottonfake =()=> (  
  <FontAwesomeIcon icon={faBars} size="2x" style={{color:"#fff"}}/> 
);

export default withRouter(Header);

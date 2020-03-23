import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import {
  faChevronCircleLeft,
  faChevronCircleRight
} from "@fortawesome/free-solid-svg-icons";
const Footer = () => {

  var history = useHistory()
  var Style = {
    display: "grid",
    gridTemplateColumns: "1fr 3fr 1fr",
    height: "var(--height-footer)",
    width: "100vw",
    position: "fixed",
    top: "calc(100vh - var(--height-footer))"
  };

  return (
    <div className=" align-items-center bg-primary " style={Style}>
      <button
      style={{height: " 100%"}}
        className="button-nav"
        type="button"
        onClick={()=>{history.goBack()}}
      >
        <FontAwesomeIcon
          icon={faChevronCircleLeft}
          size="2x"
          style={{ color: "#fff" }}
        />
      </button>
      <div className="central">
        <p className="text-light">este es el fotter</p>
      </div>
      <button
       style={{height: " 100%"}}
        className="button-nav"
        type="button"
        data-toggle="collapse"
        onClick={()=>{history.goForward()}}
      >
        <FontAwesomeIcon
          icon={faChevronCircleRight}
          size="2x"
          style={{ color: "#fff" }}
        />
      </button>
    </div>
  );
};

export default Footer;

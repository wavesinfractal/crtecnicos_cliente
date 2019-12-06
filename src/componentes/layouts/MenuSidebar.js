import React, {  Fragment } from "react";
// import { Header, Icon, Image, Menu, Segment, Sidebar } from "semantic-ui-react";
import { openFullscreen } from "./Screen";
// import { openFullscreen, closeFullscreen } from "./Screen"
import { Menu, Sidebar } from "semantic-ui-react";
// import React, { Component } from "react";

const MenuSidebar = Component => props => {
  const WithStateComponent = () => {   
  
console.log(props.view);

    return (
      <div className="pushable">
        <Sidebar
          as={Menu}
          animation="overlay"
          icon="labeled"
          inverted
          closable={true}
          vertical
          visible={props.view}
          width="thin"
        >
          {props.session ? (
            <BarUser setView={props.setView} session={props.session} />
          ) : (
            ""
          )}
        </Sidebar>

        <div className="pusher" >
          <div >
                      <Component  {...props} />
          </div>
        </div>
      </div>
    );
  };
  return WithStateComponent();
};
export default MenuSidebar;

const BarUser = ({ session, setView }) => {
  const { nombre } = session ? session : "";
  // console.log(session);
  return (
    <Fragment> 
      <vid className="container-fluid mt-5">
      
   

      <h1 className=" h4 text-light text-center mt-5">{nombre}</h1>
      <ul className="list-group ">
        <li className="list-group-item bg-primary">
          {" "}
          <i
            aria-hidden="true"
            className="home icon text-light large w-100"
          ></i>
          hola
        </li>
        <li className="list-group-item bg-primary">
          {" "}
          <i
            aria-hidden="true"
            className="camera icon text-light large w-100"
          ></i>
          hola
        </li>
        <li className="list-group-item bg-primary">
          {" "}
          <i
            aria-hidden="true"
            className="camera icon text-light large w-100"
          ></i>
          hola
        </li>
        <li className="list-group-item bg-primary">
          {" "}
          <i
            aria-hidden="true"
            className="camera icon text-light large w-100"
          ></i>
          hola
        </li>
        <li className="list-group-item bg-primary">
          {" "}
          <i
            aria-hidden="true"
            className="camera icon text-light large w-100"
          ></i>
          hola
        </li>
        <li className="list-group-item bg-primary">
          {" "}
          <i
            aria-hidden="true"
            className="camera icon text-light large w-100"
          ></i>
          hola
        </li>
        <li
          className="list-group-item bg-primary"
          onClick={async () => await openFullscreen()}
        >
          {" "}
          <i
            aria-hidden="true"
            className="camera icon text-light large w-100"
          ></i>
          hola
        </li>
      </ul>
      </vid>
    </Fragment>
  );
};

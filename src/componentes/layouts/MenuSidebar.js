import React, {  Fragment } from "react";
// import { Header, Icon, Image, Menu, Segment, Sidebar } from "semantic-ui-react";
import { openFullscreen } from "./Screen";
// import { openFullscreen, closeFullscreen } from "./Screen"
import { Menu, Sidebar } from "semantic-ui-react";
// import {Link}from 'react-router-dom'
// import React, { Component } from "react";
import $ from "jquery";

const MenuSidebar = Component => props => {
  const WithStateComponent = () => {   
  
    $(document).ready(function(){
      var heightw = $(window).height();
        $("#principal").height(heightw);
      //  console.log(h$(".sidebar"))
      // var toto = (heightw > heightv)? $('#principal').height(heightw ): $('#principal').height("auto" )

     
      
    });

    return (
      <div className="pushable container-fluid" id="principal" >
      <Sidebar
            as={Menu}
            animation="scale down"
            icon="labeled"
            inverted
            // onHide={}
            vertical
            visible={props.view}
            width="thin"
            fixed="left"
          >
          {props.session ? (
            <BarUser setView={props.setView} session={props.session} />
          ) : (
            ""
          )}
           </Sidebar>

        <div className="pusher"   onClick={()=> props.setView(false)}>
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
  
  const { nombre, apellido1 } = (session.nombre) ? session.nombre : "";
  // const { nombre } = (nombre) ? session : "";
  
  return (
    <Fragment> 
      <div className="container-fluid" style={{height:'65px'}} />
      
   
         
  <h1 className=" h5 text-light text-center my-3">{nombre}{" "}{apellido1}</h1>
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
    
    </Fragment>
  );
};

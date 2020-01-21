import React from 'react';
import $ from "jquery";

const Loader = () => {
  $(document).ready(function() {
    var height = $(window).height();
    $("#listo").height(height-150);      
  });
  
 
    return (
      
      <div className="d-flex justify-content-center align-items-center" id="listo">    
      <div className="spinner-border big" role="status"  style={{width : "5rem", height: "5rem"}}>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
    
    );
};

export default Loader;
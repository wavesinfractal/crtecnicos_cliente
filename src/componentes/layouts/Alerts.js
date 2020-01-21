import React from "react";

export default  ({ data }) => 
   (       
    <div className="container">
      <div className={`row d-flex justify-content-center`}>
        <div className="col-lg-8">
          <p className={`alert text-center ${data.color}`}>{data.mensaje}</p>
        </div>
      </div>
    </div>
  );


 

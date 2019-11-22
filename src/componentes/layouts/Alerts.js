import React from "react";

const Alerts = ({ mensaje }) => {
  return (
   
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-lg-8">
          <p className="alert alert-success text-center">{mensaje}</p>
        </div>
      </div>
    </div>
  );
};

export default Alerts;

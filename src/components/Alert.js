import React from "react";

const Alert = (props) => {
  return (
    props.alert && ( <div className="container  position-relative">
        <div className={`alert alert-${props.alert.type} alert-dismissible fade show position-absolute w-100`}
          role="alert" >
          <strong>{props.alert.type}</strong>:{props.alert.message}
        </div>
      </div>
    )
  );
};

export default Alert;

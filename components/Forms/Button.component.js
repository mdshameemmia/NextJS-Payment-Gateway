import React from "react";

const Button = ({ className, type, children, event }) => (
  <button className={className} type={type} onClick={event}>
    {children}
  </button>
);

export default Button;

import React from "react";
import classes from "./MyInput.module.css";

const MyInput = ({ className, ...props }) => {
  return <input className={`${classes.myinput} ${className}`} {...props} />;
};

export default MyInput;

import React from "react";
import classes from "./MyBtn.module.css";
const MyBtn = ({ className, ...props }) => {
  return (
    <button className={`${classes.mybtn} ${className}`} {...props}></button>
  );
};

export default MyBtn;

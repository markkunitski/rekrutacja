import React from "react";
import classes from "./MyAnchor.module.css";
const MyAnchor = ({ className, ...props }) => {
  return (
    <a className={`${classes.myanchor} ${className}`} {...props}></a>
  );
};

export default MyAnchor;

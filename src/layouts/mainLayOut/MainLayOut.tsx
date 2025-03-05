import React from "react";
import classes from "./mainLayOut.module.css";

const MainLayOut: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <div className={classes.mainContainer}>{children}</div>;
};

export default MainLayOut;

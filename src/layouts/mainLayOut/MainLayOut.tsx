import React from "react";
import classes from "./mainLayOut.module.css";
import MainLayOutNavBar from "./mainLayOutNavBar/MainLayOutNavBar";

const MainLayOut: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <>
    <MainLayOutNavBar />
    <div className={classes.mainContainer}>
      {children}
    </div>
  </>
};

export default MainLayOut;

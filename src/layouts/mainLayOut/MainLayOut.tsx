import React from "react";
import classes from "./mainLayOut.module.css";
import MainLayOutNavBar from "./mainLayOutNavBar/MainLayOutNavBar";

type MainLayOutProps = {
  children?: React.ReactNode;
};

const MainLayOut: React.FC<MainLayOutProps> = ({ children }) => {
  return (
    <>
      <MainLayOutNavBar />
      <div className={classes.mainContainer}>{children}</div>
    </>
  );
};

export default MainLayOut;

// Title.js
import React from "react";
import classes from "./Title.module.css";
import logo from "./slugpic.png"; // Import the local image

                


function Title(props) {
  return (
    <div className={classes.title}>
      <div className={classes.logo}>
        <img src={logo} alt="Logo" className={classes.logoImg} />
        <div className={classes.words}>{props.children}</div>
      </div>
    </div>
  );
}

export default Title;

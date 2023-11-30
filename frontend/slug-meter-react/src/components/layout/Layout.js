import React from "react";
import classes from "./Layout.module.css";
import MainNavigation from "./MainNavigation";
import Title from "./Title";

function Layout(props) {
  return (
    <div>
      <Title>Slug Meter</Title>
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}

export default Layout;

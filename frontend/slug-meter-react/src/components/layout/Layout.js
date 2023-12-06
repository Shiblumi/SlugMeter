import React from "react";
import classes from "./Layout.module.css";
import MainNavigation from "./MainNavigation";
import Title from "./Title";
import Card from "../ui/Card";

//Contains generic layout for any page on the site
function Layout(props) {
  return (
    <div>
      <Card>
        <div>
          <Title>Slug Meter</Title>
          <MainNavigation />
        </div>
      </Card>
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}

export default Layout;

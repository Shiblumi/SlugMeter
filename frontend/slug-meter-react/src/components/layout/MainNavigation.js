// MainNavigation.js
import React from "react";
import { Link, NavLink } from "react-router-dom"; // Assuming you're using React Router
import classes from "./MainNavigation.module.css";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            <Link to="/">Live</Link>
          </li>
          <li>
            <Link to="/Trends">Trends</Link>
          </li>
          <li>
            <Link to="/About">About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;

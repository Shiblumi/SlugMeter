// MainNavigation.js
import React from "react";
import { Link, NavLink } from "react-router-dom"; // Assuming you're using React Router
import classes from "./MainNavigation.module.css";
import { useState, useEffect } from "react";

function MainNavigation() {
  const [currentPage, setCurrentPage] = useState("Live");

  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <div className={`${(currentPage == "Live") ? classes.currentPage : ""}`} onClick={()=>{
                setCurrentPage("Live");
              }}>Live</div>
            </Link>
          </li>
          <li>
            <Link to="/Trends">
              <div className={`${(currentPage == "Trends") ? classes.currentPage : ""}`} onClick={()=>{
                setCurrentPage("Trends");
              }}>Trends</div>
              </Link>
          </li>
          <li>
            <Link to="/About">
              <div className={`${(currentPage == "About") ? classes.currentPage : ""}`} onClick={()=>{
                setCurrentPage("About");
              }}>About</div>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;

import { Link } from "react-router-dom";

import classes from "./MainNavigation.module.css";

// Will be embedded into other code rather than being loaded as a page
function MainNavigation() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>Slug Meter</div>
      <nav>
        <ul>
          <li>
            <Link to="/">Main Page</Link>
          </li>
          <li>
            <Link to="/page-one">Page1</Link>
          </li>
          <li>
            <Link to="/page-two">Page2</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;

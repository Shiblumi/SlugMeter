import { useRouter } from 'next/router';
import classes from "./MainNavigation.module.css";
import { useState, useEffect } from "react";

function MainNavigation() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(router.pathname);

  useEffect(() => {
    const handleRouteChange = (url) => {
      setCurrentPage(url);
    }

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    }
  }, [])

  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            <a
              href="/"
              className={currentPage === "/" ? classes.currentPage : ""}
              onClick={() => setCurrentPage("/")}
            >
              Live
            </a>
          </li>
          <li>
            <a
              href="/Trends"
              className={currentPage === "/Trends" ? classes.currentPage : ""}
              onClick={() => setCurrentPage("/Trends")}
            >
              Trends
            </a>
          </li>
          <li>
            <a
              href="/About"
              className={currentPage === "/About" ? classes.currentPage : ""}
              onClick={() => setCurrentPage("/About")}
            >
              About
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
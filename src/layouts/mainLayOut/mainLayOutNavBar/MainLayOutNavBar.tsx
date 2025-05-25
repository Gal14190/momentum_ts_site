import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import classes from "./mainLayOutNavBar.module.css";
// import { getTokenData } from "../../../store/storeUtils";
// import { UserData } from "../../../types/api/users";

const MainLayOutNavBar: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  // const defaultUser: UserData = { username: "Guest", role: "user" };
  // const userData: UserData = getTokenData<UserData>("user") ?? defaultUser

  // Close navbar when clicking outside the entire container (button + nav)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Close navbar on window resize above breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  const links = [
    { path: "/", label: "Home" },
    // הוסף כאן קישורים נוספים לפי הצורך
  ];

  return (
    <div ref={containerRef}>
      <div
        className={`${classes.curved1} ${isOpen ? classes.navbarOpen : ""}`}
      />
      <div
        className={`${classes.curved2} ${isOpen ? classes.navbarOpen : ""}`}
      />

      <button
        aria-label="Toggle Navigation Menu"
        className={`${classes.menuButton} ${
          isOpen ? classes.menuButtonOpen : ""
        }`}
        onClick={() => setIsOpen(prev => !prev)}
      >
        <div
          className={`${classes.line} ${isOpen ? classes.lineTop : ""}`}
        />
        <div
          className={`${classes.line} ${isOpen ? classes.lineMiddle : ""}`}
        />
        <div
          className={`${classes.line} ${isOpen ? classes.lineBottom : ""}`}
        />
      </button>

      <nav
        className={`${classes.navbar} ${
          isOpen ? classes.navbarOpen : ""
        }`}
      >
        <div className={classes.links}>
          {links.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`${classes.link} ${
                location.pathname === path ? classes.activeLink : ""
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default MainLayOutNavBar;

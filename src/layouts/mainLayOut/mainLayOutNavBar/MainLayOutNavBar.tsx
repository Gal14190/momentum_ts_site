import { useLocation } from "react-router-dom";
import classes from "./mainLayOutNavBar.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTokenData } from "../../../store/storeUtils";
import { UserData } from "../../../types/api/users";

const MainLayOutNavBar = () => {
     const location = useLocation();
     const defaultUser: UserData = { username: "Guest", role: "user" };
     const userData: UserData = getTokenData<UserData>("user") ?? defaultUser
     const [isOpen, setIsOpen] = useState(false);

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
          { path: "/about", label: "About Us" },
          { path: "/contact", label: "Contact" },
     ];

     return (
          <>
               <div className={`${classes.curved1} ${isOpen ? classes.navbarOpen : ""}`} />
               <div className={`${classes.curved2} ${isOpen ? classes.navbarOpen : ""}`} />
               <button aria-label="Toggle Navigation Menu" className={`${classes.menuButton} ${isOpen ? classes.menuButtonOpen : ""}`} onClick={() => setIsOpen(!isOpen)}>
                    <div className={`${classes.line} ${isOpen ? classes.lineTop : ""}`}></div>
                    <div className={`${classes.line} ${isOpen ? classes.lineMiddle : ""}`}></div>
                    <div className={`${classes.line} ${isOpen ? classes.lineBottom : ""}`}></div>
               </button>
               <div className={`${classes.navbar} ${isOpen ? classes.navbarOpen : ""}`}>
                    <div className={classes.links}>
                         {links.map(({ path, label }) => (
                              <Link
                                   key={path}
                                   to={path}
                                   className={`${classes.link} ${location.pathname === path ? classes.activeLink : ""}`}
                              >
                                   {label}
                              </Link>
                         ))}
                    </div>
                    {(userData.role !== "user" || isOpen) &&
                         <div className={classes.userInfo}>
                              {userData.username} - {userData.role}
                         </div>
                    }
               </div>
          </>
     );
};

export default MainLayOutNavBar;

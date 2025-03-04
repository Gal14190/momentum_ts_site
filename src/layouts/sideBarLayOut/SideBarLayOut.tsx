import React, { useState, useCallback, useEffect } from "react";
import classes from "./sideBarLayOut.module.css";
import L from "leaflet";
import sideBarLeftIcon from "../../assets/icons/generals/sidebar-left.svg"
import sideBarRightIcon from "../../assets/icons/generals/sidebar-right.svg"
import SVGComponent from "../../components/SVGComponent";

export default function SideBarLayout({ children }: { children: React.ReactNode }) {
  const [isFullyHidden, setIsFullyHidden] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
  const [isSidebarVisible, setIsSidebarVisible] = useState(!isMobileView);

  const toggleSidebar = () => {
    if (isSidebarVisible) {
      setIsFullyHidden(true);
      setTimeout(() => {
        setIsSidebarVisible(false);
      }, 0);
    } else {
      setIsFullyHidden(false);
      setTimeout(() => {
        setIsSidebarVisible(true);
      }, 0);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      setIsMobileView(isMobile);
      if (!isMobile) {
        setIsSidebarVisible(true);
        setIsFullyHidden(false);
      } else {
        setIsSidebarVisible(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const ref = useCallback((element: HTMLDivElement | null) => {
    if (!element) return;
    L.DomEvent.disableClickPropagation(element);
    L.DomEvent.disableScrollPropagation(element);
  }, []);

  return (
    <>
      {isMobileView && (
        <button
          className={`${classes.sidebarToggleButton} ${isFullyHidden ? classes.leftView : classes.rightView}`}
          onClick={toggleSidebar}
        >
          {isSidebarVisible ? (
            <SVGComponent src={sideBarLeftIcon} size="1.5rem" />
          ) : (
            <SVGComponent src={sideBarRightIcon} size="1.5rem" />
          )}
        </button>
      )}

      {!isFullyHidden && (
        <div
          ref={ref}
          className={`${classes.sidebarLayout} ${isSidebarVisible ? classes.isVisible : ""}`}
        >
          {children}
        </div>
      )}
    </>
  );
}

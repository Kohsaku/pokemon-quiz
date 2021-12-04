import React from "react";
import { Link } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
import SidebarData from "./SidebarData";
import { makeStyles } from "@material-ui/core";

import "./MenuSidebar.css";

const MenuSidebar = (props) => {
  const useStyle = makeStyles((theme) => ({
    CloseIcon: {
      color: "#fbc531",
    },
  }));

  const classes = useStyle();
  return (
    <div className="MenuSidebar">
      <nav className={props.sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items" onClick={props.handleSidebar}>
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
              <CloseIcon className={classes.CloseIcon} />
            </Link>
          </li>
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.className}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default MenuSidebar;

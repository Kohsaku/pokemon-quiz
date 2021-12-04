import React from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles, IconButton } from "@material-ui/core";

import "./Header.css";

const Header = (props) => {
  const useStyle = makeStyles((theme) => ({
    MenuIcon: {
      color: "#fbc531",
    },
    Link: {
      color: "#fbc531",
    },
  }));

  const classes = useStyle();
  return (
    <div className="App-header">
      <IconButton className={classes.MenuIcon} onClick={props.handleSidebar}>
        <MenuIcon />
      </IconButton>
      <h2>Pokemon Quiz</h2>
      {props.isLogin ? (
        <Link
          className={classes.Link}
          to="/login"
          onClick={props.handleSignOut}
        >
          Logout
        </Link>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  );
};

export default Header;

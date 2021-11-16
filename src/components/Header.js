import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../api/firebase";
import MenuIcon from "@material-ui/icons/Menu";
import { IconButton } from "@material-ui/core";

import "./Header.css";

const Header = (props) => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [isLogin]);

  return (
    <div className="App-header">
      <IconButton onClick={props.handleSidebar}>
        <MenuIcon color="primary" />
      </IconButton>
      <h2>Pokemon Quiz</h2>
      {isLogin ? (
        <Link to="/login" onClick={setIsLogin(false)}>
          Logout
        </Link>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  );
};

export default Header;

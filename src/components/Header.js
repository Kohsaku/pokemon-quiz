import React from 'react';
import { Link } from "react-router-dom";
import { auth } from '../api/firebase';
import MenuIcon from '@material-ui/icons/Menu';
import { IconButton } from '@material-ui/core';

import './Header.css';

const Header = props => {
  const user = auth.currentUser;
  return(
    <div className="App-header">
      <IconButton onClick={props.handleSidebar}>
        <MenuIcon color="primary" />
      </IconButton>
      <h2>Pokemon Quiz</h2>
      {user ?  (
        <Link to="/" onClick={props.handleSignOut}>
          Logout
        </Link>) : (
        <Link to="/login">Login</Link>
      )}
  </div>
  );
}

export default Header;
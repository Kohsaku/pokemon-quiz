import React from 'react';
import { Link } from "react-router-dom";
import { auth } from '../api/firebase';

const Header = props => {
  const user = auth.currentUser;
  return(
    <div className="App-header">
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
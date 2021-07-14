import React from 'react';
import { Link } from "react-router-dom";

const Header = () => {
  return(
    <div className="App-header">
      <h2>Pokemon Quiz</h2>
      <Link to="/login">Login</Link>
  </div>
  );
}

export default Header;
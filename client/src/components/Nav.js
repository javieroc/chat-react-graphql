import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../services';
import './Nav.css';

const Nav = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light navbar-space">
      <a className="navbar-brand">Chat</a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          {
            isAuthenticated() &&
            <li className="nav-item">
              <Link className="nav-link" to="/">Rooms</Link>
            </li>
          }
          {
            !isAuthenticated() &&
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
          }
          {
            !isAuthenticated() &&
            <li className="nav-item">
              <Link className="nav-link" to="/register">Register</Link>
            </li>
          }
        </ul>
      </div>
    </nav>
  );
};

export default Nav;

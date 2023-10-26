import React from "react";
import authService from "../services/auth-service";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark sticky-top">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          Course Reviews
        </Link>
        <div className="navbar-nav me-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              All Courses
            </Link>
          </li>
          <li className="nav-item">
            {authService.isLogin() && (
              <Link to="/myreview" className="nav-link">
                My Reviews
              </Link>
            )}
          </li>
          <li className="nav-item">
            {authService.isLogin() && (
              <Link to="/profile" className="nav-link">
                My Account
              </Link>
            )}
          </li>
          <li className="nav-item">
            {authService.isLogin() ? (
              <a href="/" onClick={authService.logout} className="nav-link">
                Logout
              </a>
            ) : (
              <Link to="/login" className="nav-link">
                Login
              </Link>
            )}
          </li>
          <li className="nav-item">
            {!authService.isLogin() && (
              <Link to="/register" className="nav-link">
                Register
              </Link>
            )}
          </li>
        </div>
      </div>
    </nav>
  );
};

export default Nav;

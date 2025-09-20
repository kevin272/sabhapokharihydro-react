import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header-header-two">
      <div className="header-main-h2 header--sticky">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="main-haeder-wrapper-h2">
                <Link to="/" className="logo-area">
                  <img
                    src="assets/images/Header-logo (1).png"
                    alt="logo"
                    width="150%"
                  />
                </Link>
                <div className="header-nav main-nav-one">
                  <nav>
                    <ul>
                      <li><Link className="nav-link" to="/">HOME</Link></li>
                      <li><Link className="nav-link" to="/aboutus">About</Link></li>
                      <li><Link className="nav-link" to="/gallery">Gallery</Link></li>
                      <li className="has-dropdown">
                        <Link className="nav-link" to="#">Team</Link>
                        <ul className="submenu">
                          <li><Link to="/team">Team</Link></li>
                          <li><Link to="/team-details">Message from the Team</Link></li>
                        </ul>
                      </li>
                      <li><Link className="nav-link" to="/blog">BLOG</Link></li>
                      <li className="has-dropdown">
                        <Link className="nav-link" to="#">PROJECT</Link>
                        <ul className="submenu">
                          <li><Link to="/project-details">Lakhuwa Khola</Link></li>
                        </ul>
                      </li>
                      <li><Link className="nav-link" to="/contact">CONTACT</Link></li>
                    </ul>
                  </nav>
                </div>
                <div className="actions-area">
                  <div className="menu-btn" id="menu-btn">
                    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect y="14" width="20" height="2" fill="#4AAB3D" />
                      <rect y="7" width="20" height="2" fill="#4AAB3D" />
                      <rect width="20" height="2" fill="#4AAB3D" />
                    </svg>
                  </div>
                  <a href="tel:+977-9851363591" className="rts-btn btn-primary">Call for help: +977-9851363591</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

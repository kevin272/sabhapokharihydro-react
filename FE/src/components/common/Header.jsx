import React from "react";
import { Link } from "react-router-dom";

export default function Header1() {
  return (
    <header className="header-four header--sticky">
      <div className="header-left">
        <Link to="/" className="logo-area">
          <img
            src="https://sabhapokharihydro.com.np/assets/tenant/uploads/media-uploader/sabhapokharihydro/83687671-f81a-4038-a2ae-7887b8e06ef81745994808.png"
            alt="logo"
          />
        </Link>
      </div>

      <div className="nav-area">
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
      </div>

      <div className="header-right">
        <div className="action-button-menu">
          <div id="menu-btn">
            {/* Keep your SVG here */}
          </div>
        </div>
      </div>
    </header>
  );
}

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../config/axios.config";

// Optional: tiny util to truncate long titles
const ellipsize = (str = "", n = 28) => (str.length > n ? str.slice(0, n - 1) + "…" : str);

const Header = () => {
   const [projItems, setProjItems] = useState([]);
  const [projLoading, setProjLoading] = useState(true);
  const [projError, setProjError] = useState(null);

  useEffect(() => {
    let alive = true;

    const fetchProjects = async () => {
      setProjLoading(true);
      setProjError(null);

      try {
        // Preferred lightweight endpoint (already filtered + limited)
        const res = await axiosInstance.get("/projects/featured/list");
        const list =
          Array.isArray(res?.data?.data) ? res.data.data :
          Array.isArray(res?.data) ? res.data :
          [];

        if (!alive) return;
        if (list.length) {
          setProjItems(list);
          setProjLoading(false);
          return;
        }

        // Fallback: general listing filtered by featured
        const res2 = await axiosInstance.get("/projects?featured=true");
        const list2 =
          Array.isArray(res2?.data?.data) ? res2.data.data :
          Array.isArray(res2?.data) ? res2.data :
          [];
        if (!alive) return;

        setProjItems(list2);
        setProjLoading(false);
      } catch (err) {
        if (!alive) return;
        setProjError(err?.response?.data?.message || err?.message || "Failed to load projects");
        setProjLoading(false);
      }
    };

    fetchProjects();
    return () => { alive = false; };
  }, []);
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
                      {/* PROJECT dropdown populated from backend */}
                                    <li className="has-dropdown">
                                      <Link className="nav-link" to="#">PROJECT</Link>
                                      <ul className="submenu">
                                        {projLoading && (
                                          <li style={{ opacity: 0.7, pointerEvents: "none" }}>
                                            <span>Loading…</span>
                                          </li>
                                        )}
                      
                                        {!projLoading && projError && (
                                          <>
                                            <li style={{ opacity: 0.8 }}>
                                              <span style={{ color: "#c00" }}>Failed to load</span>
                                            </li>
                      
                                          </>
                                        )}
                      
                                        {!projLoading && !projError && projItems.length === 0 && (
                                          <>
                                            <li style={{ opacity: 0.8 }}>
                                              <span>No projects yet</span>
                                            </li>
                                          </>
                                        )}
                      
                                        {!projLoading && !projError && projItems.map((p) => (
                                          <li key={p._id}>
                                            <Link to={`/project/${p._id}`}>
                                              {ellipsize(p.title || "Untitled")}
                                            </Link>
                                          </li>
                                        ))}
                      
                      
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

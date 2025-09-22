import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../config/axios.config";

// Optional: tiny util to truncate long titles
const ellipsize = (str = "", n = 28) => (str.length > n ? str.slice(0, n - 1) + "…" : str);

export default function Header1() {
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

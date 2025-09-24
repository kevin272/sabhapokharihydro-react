import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../config/axios.config";
import SidebarOffcanvas from "./MobileMenu";

// Optional: tiny util to truncate long titles
const ellipsize = (str = "", n = 28) => (str.length > n ? str.slice(0, n - 1) + "…" : str);

export default function Header1() {
  const [projItems, setProjItems] = useState([]);
  const [projLoading, setProjLoading] = useState(true);
  const [projError, setProjError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false); // ⬅️ sidebar state

  useEffect(() => {
    let alive = true;

    const fetchProjects = async () => {
      setProjLoading(true);
      setProjError(null);

      try {
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
    <>
      {/* Off-canvas sidebar (includes mobile menu markup) */}
      <SidebarOffcanvas
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        projItems={projItems}
        projLoading={projLoading}
        projError={projError}
      />

      <header className="header-four header--sticky">
        <div className="header-left">
          <Link to="/" className="logo-area">
            <img
              src="https://sabhapokharihydro.com.np/assets/tenant/uploads/media-uploader/sabhapokharihydro/83687671-f81a-4038-a2ae-7887b8e06ef81745994808.png"
              alt="logo"
              style={{ maxWidth: "100%", height: "auto", display: "block" }}
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

                {/* use has-dropdown if your CSS needs it */}
                <li className="has-dropdown">
                  <a href="#" className="nav-link" onClick={(e) => e.preventDefault()}>Team</a>
                  <ul className="submenu">
                    <li><Link to="/team">Team</Link></li>
                    <li><Link to="/team-details">Message from the Team</Link></li>
                  </ul>
                </li>

                <li><Link className="nav-link" to="/blog">BLOG</Link></li>

                {/* PROJECT dropdown populated from backend */}
                <li className="has-dropdown">
                  <a href="#" className="nav-link" onClick={(e) => e.preventDefault()}>PROJECT</a>
                  <ul className="submenu">
                    {projLoading && (
                      <li style={{ opacity: 0.7, pointerEvents: "none" }}>
                        <span>Loading…</span>
                      </li>
                    )}

                    {!projLoading && projError && (
                      <li style={{ opacity: 0.8 }}>
                        <span style={{ color: "#c00" }}>Failed to load</span>
                      </li>
                    )}

                    {!projLoading && !projError && projItems.length === 0 && (
                      <li style={{ opacity: 0.8 }}>
                        <span>No projects yet</span>
                      </li>
                    )}

                    {!projLoading && !projError && projItems.map((p) => (
                      <li key={p._id}>
                        <Link to={`/project/${p._id}`}>{ellipsize(p.title || "Untitled")}</Link>
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
            <div
              id="menu-btn"
              className="menu-btn"
              onClick={() => setSidebarOpen(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setSidebarOpen(true)}
              aria-label="Open mobile menu"
            >
              {/* hamburger icon */}
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="4" height="4" fill="white" />
                        <rect y="7" width="4" height="4" fill="white" />
                        <rect y="14" width="4" height="4" fill="white" />
                        <rect x="7" width="4" height="4" fill="white" />
                        <rect x="7" y="7" width="4" height="4" fill="white" />
                        <rect x="7" y="14" width="4" height="4" fill="white" />
                        <rect x="14" width="4" height="4" fill="white" />
                        <rect x="14" y="7" width="4" height="4" fill="white" />
                        <rect x="14" y="14" width="4" height="4" fill="white" />
                    </svg>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

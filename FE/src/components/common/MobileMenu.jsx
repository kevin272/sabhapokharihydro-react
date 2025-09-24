// src/components/common/SidebarOffcanvas.jsx
import { useEffect, useRef, useState } from "react"; // ⬅ add useState
import { Link, useLocation } from "react-router-dom";

const cx = (...a) => a.filter(Boolean).join(" ");

export default function SidebarOffcanvas({
  isOpen,
  onClose,
  projItems = [],
  projLoading = false,
  projError = null,
}) {
  const { pathname } = useLocation();
  const panelRef = useRef(null);

  // NEW: local state for dropdowns (closed initially)
  const [openPages, setOpenPages] = useState(false);
  const [openProject, setOpenProject] = useState(false); // optional, for consistency

  // Close on route change
  useEffect(() => { if (isOpen) onClose?.(); }, [pathname]);

  // ESC key to close
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    const prev = document.body.style.overflow;
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = prev || "";
    return () => { document.body.style.overflow = prev || ""; };
  }, [isOpen]);

  // Focus panel on open
  useEffect(() => {
    if (isOpen && panelRef.current) panelRef.current.focus();
  }, [isOpen]);

  const handleBackdrop = (e) => {
    if (e.target.classList.contains("sidebar-backdrop")) onClose?.();
  };

  return (
    <>
      <div
        className={cx("sidebar-backdrop", isOpen && "open")}
        onClick={handleBackdrop}
        aria-hidden={!isOpen}
      />

      <aside
        id="side-bar"
        className={cx("side-bar", "header-two", isOpen && "open")}
        role="dialog"
        aria-modal="true"
        aria-label="Sidebar"
        ref={panelRef}
        tabIndex={-1}
      >
        <button className="close-icon-menu" onClick={onClose} aria-label="Close menu">
          <i className="far fa-times" />
        </button>

        {/* inner menu area desktop start */}
        <div className="inner-main-wrapper-desk">
          <div className="thumbnail">
            <img
              src="https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqANu4qrBeHfY7f6KGT1heIHmY1ffgqnk8BK_ft3Nl1MA8dYwxMF9JPlDTO1ced9kbFoPAdVZliLrMpw07jFxrpvCuKv9OOuByLEJ3xAdkNGI3impUkrnVgvNJC8qcjLoL-ioLjzL1-WYZE=s1360-w1360-h1020-rw"
              alt="Sabhapokhari Hydropower Project"
            />
          </div>
          <div className="inner-content">
            <h4 className="title">Powering Nepal with Clean Hydropower</h4>
            <p className="disc">
              Sabhapokhari Hydropower Limited is dedicated to developing Nepal’s renewable energy potential.
            </p>
            <div className="footer">
              <h4 className="title">Want to know more?</h4>
              <Link to="/project" className="rts-btn btn-primary">Explore Project</Link>
            </div>
          </div>
        </div>

        {/* mobile menu area start */}
        <div className="mobile-menu-main">
          <nav className="nav-main mainmenu-nav mt--30">
            <ul className="mainmenu metismenu" id="mobile-menu-active">
              <li>
                <Link className="main" to="/">HOME</Link>
              </li>

              {/* PAGES dropdown — closed initially */}
              <li className="has-droupdown">
  {/* keep href for CSS targeting, but prevent default click */}
  <a
    href="#"
    className="main"
    onClick={(e) => e.preventDefault()}
  >
    PAGES
  </a>
  {/* ⬇️ remove "mm-show" so it stays closed initially */}
  <ul className="submenu mm-collapse">
    <li><Link to="/aboutus">About Us</Link></li>
    <li><Link to="/gallery">Gallery</Link></li>
    <li><Link to="/team">Team</Link></li>
    <li><Link to="/team-details">Team Details</Link></li>
  </ul>
</li>

              <li>
                <Link className="main" to="/blog">BLOG</Link>
              </li>

              {/* PROJECT dropdown — also closed initially (optional) */}
              <li className="has-droupdown">
  <a
    href="#"
    className="main"
    onClick={(e) => e.preventDefault()}
  >
    PROJECT
  </a>
  <ul className="submenu mm-collapse">
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
                      <Link to={`/project/${p._id}`}>{p.title || "Untitled"}</Link>
                    </li>
                  ))}
                </ul>
              </li>
              


              <li>
                <Link className="main" to="/contact">CONTACT</Link>
              </li>
            </ul>
          </nav>

          <div className="rts-social-style-one pl--20 mt--100">
            <ul>
              <li><a href="#"><i className="fa-brands fa-facebook-f" /></a></li>
              <li><a href="#"><i className="fa-brands fa-twitter" /></a></li>
              <li><a href="#"><i className="fa-brands fa-youtube" /></a></li>
              <li><a href="#"><i className="fa-brands fa-linkedin-in" /></a></li>
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
}

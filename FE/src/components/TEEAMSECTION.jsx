import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../config/axios.config";

// ---- URL helpers ----
const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/+$/, "");
const SERVER_URL = API_URL.replace(/\/api$/, "");
const joinImageUrl = (p) => {
  if (!p) return "";
  // support { url: "/uploads/x.jpg" } or plain strings
  const raw = typeof p === "string" ? p : (p.url || "");
  return /^https?:\/\//i.test(raw) ? raw : `${SERVER_URL}${raw.startsWith("/") ? "" : "/"}${raw}`;
};

// Parse various sendResponse shapes safely
const toArray = (body) =>
  Array.isArray(body?.data?.data) ? body.data.data :
  Array.isArray(body?.data)      ? body.data :
  Array.isArray(body)            ? body :
  [];

export default function TeamSection() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await axiosInstance.get("/team"); // ✅ backend route
        if (!alive) return;
        setTeam(toArray(res));
      } catch (e) {
        console.error(e);
        if (!alive) return;
        setErr(e?.response?.data?.message || e?.message || "Failed to load team");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  return (
    <div className="rts-team-area rts-section-gap">
      <div className="container">
        <div className="row g-5">
          {/* Loading / error / empty states (kept minimal to not disturb layout) */}
          {loading && (
            <div className="col-12">
              <p style={{ opacity: 0.7 }}>Loading team…</p>
            </div>
          )}
          {!loading && err && (
            <div className="col-12">
              <p style={{ color: "#c00" }}>{err}</p>
            </div>
          )}
          {!loading && !err && team.length === 0 && (
            <div className="col-12">
              <p style={{ opacity: 0.8 }}>No team members yet.</p>
            </div>
          )}

          {!loading && !err && team.map((member, idx) => {
            const img =
              member.img || member.image || member.photo || member.thumbnail || "";
            const name = member.name || member.fullName || "Unnamed";
            const role = member.role || member.position || member.title || "";
            const imgSrc = img ? joinImageUrl(img) : "https://via.placeholder.com/600x750?text=No+Image";

            // Optional socials on the member object (fallback to #)
            const {
              facebook = "#",
              twitter = "#",
              whatsapp = "#",
              instagram = "#",
            } = member.socials || {};

            return (
              <div className="col-lg-4 col-md-6 col-sm-12 col-12" key={member._id || idx}>
                {/* single team area */}
                <div className="rts-single-team-one">
                  <Link className="thumbnail" to="/team-details">
                        <div className="team-thumb">

                    <img
                      src={imgSrc}
                      alt={(role || name).toLowerCase().replace(/\s+/g, "-")}
                      loading="lazy"
                      onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/600x750?text=No+Image"; }}
                    />
                    </div>
                  </Link>

                  <div className="inner-content">
                    <div className="main_con">
                      <Link to="/team-details">
                        <h5 className="title">{name}</h5>
                      </Link>
                      <span>{role}</span>
                    </div>

                    <div className="share-icon">
                      <div className="share-icons-wrapper">
                        <ul>
                          <li><a href={facebook}><i className="fa-brands fa-facebook-f" /></a></li>
                          <li><a href={twitter}><i className="fa-brands fa-twitter" /></a></li>
                          <li><a href={whatsapp}><i className="fa-brands fa-whatsapp" /></a></li>
                          <li><a href={instagram}><i className="fa-brands fa-instagram" /></a></li>
                        </ul>
                      </div>
                      <i className="fa-sharp fa-regular fa-share-nodes" />
                    </div>
                  </div>
                </div>
                {/* single team area end */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

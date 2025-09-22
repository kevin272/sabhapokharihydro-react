// src/pages/ProjectPage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../config/axios.config";

// ---- helpers ----
const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/+$/, "");
const ORIGIN = (() => { try { return new URL(API_URL).origin; } catch { return ""; } })();

function toImgUrl(input) {
  if (!input) return "";
  let p = String((input && input.url) ? input.url : input).trim();
  p = p.replace(/^['"]|['"]$/g, "").replace(/\\/g, "/").replace(/([^:]\/)\/+/g, "$1");
  if (/^https?:\/\//i.test(p)) return p;
  if (p.startsWith("/api/")) return `${ORIGIN}${p}`;
  if (!p.startsWith("/")) p = `/${p}`;
  return `${ORIGIN}${p}`;
}

export default function ProjectPage() {
  const { id } = useParams();                  // route: /project/:id  (or /projects/:id)
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await axiosInstance.get(`/projects/${id}`);
        const body = res?.data;
        const item = body?.data ?? body ?? null;
        if (!alive) return;
        setProject(item);
      } catch (e) {
        if (!alive) return;
        setProject(null);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [id]);

  if (loading) {
    return (
      <div className="rts-project-details-area rts-section-gap">
        <div className="container"><p className="mt--20">Loading project…</p></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="rts-project-details-area rts-section-gap">
        <div className="container"><p className="mt--20">Project not found.</p></div>
      </div>
    );
  }

  // ---- normalize fields to match your desired view ----
  const image = toImgUrl(project.image || project.thumbnail || (project.images?.[0]?.url ?? ""));
  const title = project.title || project.name || "Project";
  const description = project.description || project.overview || "";

  // Info panel values (use nested `info` or flat fields)
  const capacity =
    project.info?.capacity ??
    project.capacity ?? project.capacityMw ?? project.capacityMW ?? "";
  const location =
    project.info?.location ?? project.location ?? "";
  const status =
    project.info?.status ?? project.status ?? "";
  const developer =
    project.info?.developer ?? project.developer ?? "";

  // Helper to render value rows only when present
  const InfoRow = ({ icon, label, value, last }) => {
    if (!value) return null;
    return (
      <div className={`single-info${last ? " last" : ""}`}>
        <div className="info-ico"><i className={icon}></i></div>
        <div className="info-details">
          <span>{label}</span>
          <h6 className="name">{String(label).includes("Capacity") && !String(value).includes("MW") ? `${value} MW` : value}</h6>
        </div>
      </div>
    );
  };

  return (
    <div className="rts-project-details-area rts-section-gap">
      <div className="container">
        {/* Row: Thumbnail */}
        <div className="row">
          <div className="col-lg-12">
            <div className="project-details-area-main">
              <div className="thumbnail">
                {image ? (
                  <img
                    src={image}
                    alt="project-details"
                    onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/1200x675?text=No+Image"; }}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>

        {/* Row: Content + Sidebar */}
        <div className="row">
          {/* Left column */}
          <div className="col-lg-8 pr--30">
            <div className="portfolio-disc-content">
              <div className="title-area">
                <span>Project details</span>
                <h4 className="title">{title}</h4>
              </div>
              <p className="disc">{description}</p>
            </div>
          </div>

          {/* Right column */}
          <div className="col-lg-4">
            <div className="big-bg-porduct-details">
              <div className="project-info">
                <div className="info-head">
                  <h5 className="title">Project Information</h5>
                </div>
                <div className="info-body">
                  <InfoRow icon="fas fa-bolt" label="Capacity:" value={capacity} />
                  <InfoRow icon="fas fa-map-marker-alt" label="Location:" value={location} />
                  <InfoRow icon="fas fa-check-circle" label="Status:" value={status} />
                  <InfoRow icon="fas fa-industry" label="Developer:" value={developer} last />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
}

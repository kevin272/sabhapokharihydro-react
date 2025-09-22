import { useEffect, useState } from "react";
import axiosInstance from "../config/axios.config";

// ---- helpers ----
const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/+$/, "");
const ORIGIN = (() => { try { return new URL(API_URL).origin; } catch { return ""; } })();

function toImgUrl(input) {
  if (!input) return "";
  let p = String((input && input.url) ? input.url : input).trim();
  p = p.replace(/^['"]|['"]$/g, "").replace(/\\/g, "/").replace(/([^:]\/)\/+/g, "$1");
  if (/^https?:\/.*/i.test(p)) return p;
  if (p.startsWith("/api/")) return `${ORIGIN}${p}`;
  if (!p.startsWith("/")) p = `/${p}`;
  return `${ORIGIN}${p}`;
}

export default function LatestProject() {
  const [project, setProject] = useState(null);

  function pickFirstProject(payload) {
    if (!payload) return null;
    if (Array.isArray(payload)) return payload[0] || null;
    const cands = [payload.data, payload.items, payload.results, payload.docs, payload.projects, payload.project];
    for (const c of cands) {
      if (!c) continue;
      if (Array.isArray(c)) return c[0] || null;
      if (typeof c === "object") return c;
    }
    if (typeof payload === "object" && (payload.title || payload.name)) return payload;
    return null;
  }

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await axiosInstance.get("/projects", { params: { latest: true, limit: 1 } });
        const item = pickFirstProject(data);
        if (!alive) return;
        setProject(item);
      } catch (error) {
        console.error("Error fetching latest project:", error);
        if (!alive) return;
        setProject(null);
      }
    })();
    return () => { alive = false; };
  }, []);

  if (!project) return null;

  const image = toImgUrl(project.image || project.thumbnail || (project.images?.[0]?.url ?? ""));
  const title = project.title || project.name || "Untitled Project";
  const short = project.shortDescription || project.tagline || (project.description ? `${String(project.description).slice(0, 200)}…` : "");
  const id = project._id || project.id || project.slug || "";

  return (
    <section className="our-latest-project-area rts-section-gapTop">
      <div className="container mb--80 mb_sm--0">
        <div className="row">
          <div className="col-lg-12">
            <div className="title-main-area-four-water">
              <h2 className="title">Our Latest Project</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="container-full">
        <div className="swiper-main-four-product">
          <div className="single-product-main-four">
            <div className="left-image">
              {image ? (
                <img
                  src={image}
                  alt={title}
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/1200x800?text=No+Image";
                  }}
                />
              ) : null}
            </div>
            <div className="right-product pl_md--15 pl_sm--15">
              <div className="solari-title-area-four">
                <span className="pre-title skew-up">Latest Project</span>
                <h2 className="title skew-up">{title}</h2>
              </div>
              {short ? <p className="disc">{short}</p> : null}
              <a href={`/project/${id}`} className="rts-btn btn-primary">
                View Details
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

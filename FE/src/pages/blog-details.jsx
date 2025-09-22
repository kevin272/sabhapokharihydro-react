// src/pages/BlogDetails.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../config/axios.config";

// ---- URL & date helpers ----
const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/+$/, "");
const ORIGIN = (() => { try { return new URL(API_URL).origin; } catch { return ""; } })();

function formatDate(dateInput) {
  const d = new Date(dateInput);
  if (Number.isNaN(d.getTime())) return "";
  const day = String(d.getDate()).padStart(2, "0");
  const month = d.toLocaleString("en-US", { month: "short" });
  const year = d.getFullYear();
  return `${day} ${month}, ${year}`;
}

// Make any thumbnail value a safe absolute URL
function toImgUrl(input) {
  if (!input) return "";
  let path = String((input && input.url) ? input.url : input).trim();

  // strip quotes, normalize slashes, collapse double slashes (not after protocol)
  path = path.replace(/^['"]|['"]$/g, "").replace(/\\/g, "/").replace(/([^:]\/)\/+/g, "$1");

  if (/^https?:\/\//i.test(path)) return path;           // already absolute
  if (path.startsWith("/api/")) return `${ORIGIN}${path}`; // keep /api when present
  if (!path.startsWith("/")) path = `/${path}`;          // ensure leading slash
  return `${ORIGIN}${path}`;                             // e.g., /uploads/...
}

export default function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await axiosInstance.get(`/blogs/${id}`);
        const body = res?.data;
        const item = body?.data ?? body ?? null;
        if (!alive) return;
        if (!item || (item && Object.keys(item).length === 0)) {
          setNotFound(true);
          setBlog(null);
        } else {
          setBlog(item);
        }
      } catch (err) {
        console.error("Failed to load blog:", err);
        if (!alive) return;
        setNotFound(true);
        setBlog(null);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [id]);

  if (loading) {
    return (
      <div className="rts-blog-list-area">
        <div className="container d-flex justify-content-center">
          <p className="mt--20">Loading…</p>
        </div>
      </div>
    );
  }

  if (notFound || !blog) {
    return (
      <div className="rts-blog-list-area">
        <div className="container d-flex justify-content-center">
          <div style={{ maxWidth: 900, width: "100%", padding: 30 }}>
            <p>Sorry, that blog post was not found.</p>
            <Link className="rts-btn btn-border radious-0" to="/blog">Back to Blogs</Link>
          </div>
        </div>
      </div>
    );
  }

  // ---- Field normalization ----
  const title = blog.title || "Untitled";
  const author = blog.author || "Admin";
  const dateStr = blog.createdAt
    ? formatDate(blog.createdAt)
    : (blog.date ? formatDate(blog.date) : "");
  const image = toImgUrl(blog.image || blog.thumbnail);

  const tags =
    Array.isArray(blog.tags) ? blog.tags :
    (typeof blog.tags === "string" ? blog.tags.split(",").map(s => s.trim()).filter(Boolean) : []);

  // Prefer `paragraphs`, else split `content`/`body` into paragraphs by blank line
  let paragraphs = Array.isArray(blog.paragraphs) ? blog.paragraphs : [];
  if (!paragraphs.length) {
    const raw = blog.content ?? blog.body ?? "";
    if (typeof raw === "string" && raw.trim()) {
      paragraphs = raw
        .split(/\n{2,}/)
        .map(p => p.trim())
        .filter(Boolean);
    }
  }

  return (
    <div className="rts-blog-list-area">
      <div className="container d-flex justify-content-center">
        <div
          className="row g-5"
          style={{
            maxWidth: "900px",
            width: "100%",
            padding: "30px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            borderRadius: "8px",
            backgroundColor: "#fff",
          }}
        >
          <div className="col-12">
            <div className="blog-single-post-listing details mb--0">
              {/* Thumbnail */}
              {image ? (
                <div className="thumbnail">
                  <img
                    src={image}
                    alt={title}
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/1200x675?text=No+Image";
                    }}
                  />
                </div>
              ) : null}

              <div className="blog-listing-content">
                {/* User Info */}
                <div className="user-info">
                  <div className="single">
                    <i className="far fa-user-circle"></i>
                    <span>by {author}</span>
                  </div>
                  {!!dateStr && (
                    <div className="single">
                      <i className="far fa-clock"></i>
                      <span>{dateStr}</span>
                    </div>
                  )}
                  {!!tags.length && (
                    <div className="single">
                      <i className="far fa-tags"></i>
                      <span>{tags.join(", ")}</span>
                    </div>
                  )}
                </div>

                {/* Title */}
                <h3 className="title animated fadeIn">{title}</h3>

                {/* Content */}
                {paragraphs.length
                  ? paragraphs.map((para, idx) => (
                      <p key={idx} className="disc">{para}</p>
                    ))
                  : <p className="disc">No content.</p>}

                {/* Share Buttons */}
                <div className="details-share mt--30">
                  <h6>Share:</h6>
                  <button aria-label="Share on Facebook">
                    <i className="fab fa-facebook-f"></i>
                  </button>
                  <button aria-label="Share on X">
                    <i className="fab fa-twitter"></i>
                  </button>
                  <button aria-label="Share on Instagram">
                    <i className="fab fa-instagram"></i>
                  </button>
                  <button aria-label="Share on LinkedIn">
                    <i className="fab fa-linkedin-in"></i>
                  </button>
                </div>

                <div className="mt--20">
                  <Link className="rts-btn btn-border radious-0" to="/blog">
                    ← Back to Blogs
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
}

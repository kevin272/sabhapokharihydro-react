// src/components/LatestBlogSection.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../config/axios.config";

// ---- URL & date helpers (same logic as your Blog.jsx) ----
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

  // strip surrounding quotes, normalize slashes, collapse duplicates (but not after protocol)
  path = path.replace(/^['"]|['"]$/g, "").replace(/\\/g, "/").replace(/([^:]\/)\/+/g, "$1");

  if (/^https?:\/\//i.test(path)) return path;          // already absolute
  if (path.startsWith("/api/")) return `${ORIGIN}${path}`; // keep /api when present
  if (!path.startsWith("/")) path = `/${path}`;         // ensure leading slash
  return `${ORIGIN}${path}`;                            // e.g., /uploads/...
}

export default function LatestBlogSection() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await axiosInstance.get("/blogs");
        const body = res?.data;
        const list =
          Array.isArray(body?.data) ? body.data :
          Array.isArray(body) ? body :
          [];
        setBlogs(list);
      } catch (err) {
        console.error("Failed to load blogs:", err);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Show the latest 3 (fallback to whatever order if no createdAt)
  const topThree = useMemo(() => {
    const arr = Array.isArray(blogs) ? [...blogs] : [];
    arr.sort((a, b) => {
      const da = new Date(a?.createdAt || a?.date || 0).getTime();
      const db = new Date(b?.createdAt || b?.date || 0).getTime();
      return db - da;
    });
    return arr.slice(0, 3);
  }, [blogs]);

  return (
    <div className="blog-area-style-four rts-section-gap mt-dec-20">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            {/* Title block retained exactly */}
            <div className="solari-title-area-three text-center">
              <span className="pre-title skew-up">
                <div className="word-line" style={{ display: "block", textAlign: "center", width: "100%" }}>
                  <div className="word" style={{ display: "inline-block" }}>Latest</div>{" "}
                  <div className="word" style={{ display: "inline-block" }}>Blog</div>
                </div>
              </span>
              <h2 className="title skew-up">
                <div className="word-line" style={{ display: "block", textAlign: "center", width: "100%" }}>
                  <div className="word" style={{ display: "inline-block" }}>Latest</div>{" "}
                  <div className="word" style={{ display: "inline-block" }}>News</div>{" "}
                  <div className="word" style={{ display: "inline-block" }}>Updates</div>
                </div>
              </h2>
            </div>
          </div>
        </div>

        <div className="row g-5 mt--30">
          {loading ? (
            // simple skeletons that still preserve your grid/CSS classes
            [0,1,2].map((i) => (
              <div className="col-lg-4 col-md-6 col-sm-12 col-12" key={`sk-${i}`}>
                <div className="blog-style-four">
                  <div className="thumbanil" aria-hidden>
                    <div style={{ width: "100%", paddingTop: "56%", background: "#eee" }} />
                  </div>
                  <div className="inner-content-blog">
                    <div className="head">
                      <div className="date"><i className="fa-regular fa-clock" /><div className="info">Loading…</div></div>
                      <div className="date time" />
                    </div>
                    <h4 className="title">Loading…</h4>
                  </div>
                </div>
              </div>
            ))
          ) : topThree.length ? (
            topThree.map((b) => {
              const image = toImgUrl(b.image || b.thumbnail);
              const dateStr = b.createdAt
                ? formatDate(b.createdAt)
                : (b.date ? formatDate(b.date) : "");
              const detailsHref = `/blog/${b._id}`;

              return (
                <div className="col-lg-4 col-md-6 col-sm-12 col-12" key={b._id}>
                  {/* single blog area start */}
                  <div className="blog-style-four">
                    {/* Keep original anchor classes, but use <Link> for SPA routing */}
                    <Link className="thumbanil" to={detailsHref}>
                      {image ? (
                        <img
                          src={image}
                          alt={b.title || "blog"}
                          style={{ filter: "brightness(60%)" }}
                          onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/800x450?text=No+Image"; }}
                        />
                      ) : (
                        <div style={{ width: "100%", paddingTop: "56%", background: "#f2f2f2" }} aria-label="No image" />
                      )}
                    </Link>

                    <div className="inner-content-blog">
                      <div className="head">
                        <div className="date">
                          <i className="fa-regular fa-clock"></i>
                          <div className="info">{dateStr}</div>
                        </div>
                        <div className="date time">{/* kept for CSS layout parity */}</div>
                      </div>

                      <Link to={detailsHref}>
                        <h4 className="title">
                          {b.title || "Untitled"}
                        </h4>
                      </Link>
                    </div>
                  </div>
                  {/* single blog area end */}
                </div>
              );
            })
          ) : (
            <div className="col-12">
              <p>No blog posts published yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

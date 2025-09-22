import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../config/axios.config";
import Breadcrumb from "../components/Dashboard/AdminBreadcrumb";

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

  // strip surrounding quotes, normalize slashes, collapse duplicates (but not after protocol)
  path = path.replace(/^['"]|['"]$/g, "").replace(/\\/g, "/").replace(/([^:]\/)\/+/g, "$1");

  if (/^https?:\/\//i.test(path)) return path;          // already absolute
  if (path.startsWith("/api/")) return `${ORIGIN}${path}`; // keep /api when present
  if (!path.startsWith("/")) path = `/${path}`;         // ensure leading slash
  return `${ORIGIN}${path}`;                            // e.g., /uploads/...
}

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        // axios returns { data: BODY }
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

  if (loading) {
    return (
      <div className="blog-post-area rts-section-gap">
        <div className="container">
          <p className="mt--20">Loading blogs…</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Breadcrumb
        title="Blogs"
        links={[
          { label: "HOME", to: "/" },
          { label: "Blogs", active: true },
        ]}
      />

      <div className="blog-post-area rts-section-gap">
        <div className="container">
          <div className="row g-24 mt--20">
            {(blogs || []).map((b, idx) => {
              const image = toImgUrl(b.image || b.thumbnail);
              const dateStr = b.createdAt
                ? formatDate(b.createdAt)
                : (b.date ? formatDate(b.date) : "");
              const tags = Array.isArray(b.tags) ? b.tags.join(", ") : (b.tags || "");
              const detailsHref = `/blog/${b._id}`;

              return (
                <div className="col-lg-4 col-md-6 col-sm-12 col-12" key={b._id || idx}>
                  <div className="blog-single-one text-center">
                    <Link className="thumbnail" to={detailsHref}>
                      <div className="inner">
                        {image ? (
                          <img
                            src={image}
                            alt={b.title || "blog-image"}
                            onError={(e) => {
                              e.currentTarget.src = "https://via.placeholder.com/640x360?text=No+Image";
                            }}
                          />
                        ) : (
                          <div
                            style={{
                              width: "100%",
                              paddingTop: "56%",
                              background: "#f2f2f2",
                              borderRadius: 8,
                            }}
                            aria-label="No image"
                          />
                        )}
                      </div>
                    </Link>

                    <div className="head">
                      <div className="date-area single-info">
                        <i className="fa-light fa-calendar-days" />
                        <p>{dateStr}</p>
                      </div>
                      <div className="tag-area single-info">
                        <i className="fa-light fa-tags" />
                        <p>{tags || (b.category || "News")}</p>
                      </div>
                    </div>

                    <div className="body text-start">
                      <Link to={detailsHref}>
                        <h5 className="title">{b.title || "Untitled"}</h5>
                      </Link>

                      <Link className="rts-btn btn-border radious-0" to={detailsHref}>
                        Read Details <i className="fa-regular fa-arrow-up-right" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}

            {blogs.length === 0 && (
              <div className="col-12">
                <p>No blog posts published yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

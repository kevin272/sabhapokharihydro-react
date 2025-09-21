import React, { useEffect } from "react";
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.css";
import { useFetch } from "./common/useFetch";

export default function GallerySection() {
  const { data: projects, loading, error } = useFetch("/gallery");

  useEffect(() => {
    if (projects) GLightbox({ selector: ".gallery-image" });
  }, [projects]);

  if (loading) return <p>Loading gallery...</p>;
  if (error) return <p>Error loading gallery.</p>;

  return (
    <div className="rts-project-page-project rts-section-gap">
      <div className="container">
        <div className="row g-24">
          {projects?.map((project) => (
            <div
              className="col-lg-4 col-md-6 col-sm-6 col-12"
              key={project._id}
            >
              <div className="gallery-wrapper">
                <img src={project.image} alt={project.title || "gallery-image"} />
                <a
                  href={project.image}
                  className="gallery-image"
                  data-gallery="project-gallery"
                >
                  <div className="item-overlay">
                    <span>+</span>
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

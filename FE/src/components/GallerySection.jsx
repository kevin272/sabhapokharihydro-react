import React, { useEffect } from "react";
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.css";

export default function GallerySection() {
  useEffect(() => {
    GLightbox({ selector: ".gallery-image" });
  }, []);

  const projects = [
    {
      id: 1,
      src: "https://sabhapokharihydro.com.np/assets/tenant/uploads/media-uploader/sabhapokharihydro/new-project-691745738952.jpg",
    },
    {
      id: 2,
      src: "https://sabhapokharihydro.com.np/assets/tenant/uploads/media-uploader/sabhapokharihydro/new-project-701745738951.jpg",
    },
    {
      id: 3,
      src: "https://sabhapokharihydro.com.np/assets/tenant/uploads/media-uploader/sabhapokharihydro/new-project-711745739036.jpg",
    },
  ];

  return (
    <div className="rts-project-page-project rts-section-gap">
      <div className="container">
        <div className="row g-24">
          {projects.map((project) => (
            <div
              className="col-lg-4 col-md-6 col-sm-6 col-12"
              key={project.id}
            >
              <div className="gallery-wrapper">
                <img src={project.src} alt="gallery-image" />
                <a
                  href={project.src}
                  className="gallery-image"
                  data-gallery="project-gallery"
                >
                  <div className="item-overlay">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="50"
                        height="50"
                        viewBox="0 0 50 50"
                        fill="none"
                      >
                        <path
                          d="M35.7999 23.8H26.2V14.1999C26.2 13.5377 25.6624 13 24.9999 13C24.3376 13 23.8 13.5377 23.8 14.1999V23.8H14.1999C13.5377 23.8 13 24.3376 13 24.9999C13 25.6624 13.5377 26.2 14.1999 26.2H23.8V35.7999C23.8 36.4623 24.3376 37 24.9999 37C25.6624 37 26.2 36.4623 26.2 35.7999V26.2H35.7999C36.4623 26.2 37 25.6624 37 24.9999C37 24.3376 36.4623 23.8 35.7999 23.8Z"
                          fill="white"
                        />
                        <circle cx="25" cy="25" r="24.5" stroke="white" />
                      </svg>
                    </span>
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

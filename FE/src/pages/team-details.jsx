// src/pages/TeamDetails.jsx
import React from "react";
import Breadcrumb from "../components/common/Breadcrumb";

// ---- URL helpers (same pattern you use elsewhere) ----
const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/+$/, "");
const SERVER_URL = API_URL.replace(/\/api$/, "");
const joinImageUrl = (p) => {
  if (!p) return "";
  const raw = typeof p === "string" ? p : (p.url || "");
  return /^https?:\/\//i.test(raw)
    ? raw
    : `${SERVER_URL}${raw.startsWith("/") ? "" : "/"}${raw}`;
};

export default function TeamDetails() {
  const teamDetailsData = [
    {
      title: "Message From The Chairman",
      name: "Dr. Laxmi Prasad Devkota",
      role: "Chairman",
      image:
        "https://sabhapokharihydro.com.np/assets/tenant/uploads/media-uploader/sabhapokharihydro/1ae37233-aaf6-4609-846b-32148136fa261745577541.jpg",
      paragraphs: [
        "It is with great pride and responsibility that I extend this message on behalf of the Board of Directors of Sabhapokhari Hydropower Limited. As Chairman, I am honored to be part of an organization that stands at the forefront of Nepal's transition toward clean and self-sustaining energy development.",
        "Nepal is blessed with immense hydropower potential, and our company was founded with a deep commitment to unlocking this energy in ways that are both economically viable and environmentally sound. The Lankhuwa Khola Small Hydroelectric Project, with its 5 MW capacity, is a strategic step toward that vision.",
        "Our board remains dedicated to upholding high standards of corporate governance, financial transparency, and risk management. We are equally committed to creating long-term value for our investors, while also fulfilling our social and environmental responsibilities.",
        "I would like to express my gratitude to our investors, employees, government authorities, and local communities who have all played a vital role in the journey of Sabhapokhari Hydropower Limited.",
      ],
    },
    {
      title: "Message From The Managing Director",
      name: "Er. Shree Ram Devkota",
      role: "Managing Director",
      image: "http://localhost:5000/uploads/img_1758714587398-83601728.jpg",
      paragraphs: [
        "As the Managing Director of Sabhapokhari Hydropower Limited, it gives me immense pleasure to share our vision and ongoing efforts to contribute to Nepal’s hydropower sector. Our mission is to ensure sustainable, efficient, and socially responsible energy generation that strengthens Nepal’s energy independence.",
        "Hydropower is more than just electricity generation—it is about empowering communities, creating jobs, and paving the way for long-term development. At Sabhapokhari Hydropower Limited, we believe in responsible growth, where we align our development goals with environmental conservation and social welfare.",
        "The Lankhuwa Khola Small Hydroelectric Project is a stepping stone toward many future endeavors where we aim to scale our capacity and impact. Our team is committed to completing this project on time and with the highest level of efficiency and integrity.",
        "I would like to thank our shareholders, local communities, and stakeholders for their continuous support. Together, we will drive Nepal toward a brighter and energy-secure future.",
      ],
    },
  ];

  return (
    <>
      <Breadcrumb
        title="Message From the Team"
        links={[
          { label: "HOME", to: "/" },
          { label: "Message From the Team", active: true },
        ]}
      />

      <section className="rts-team-details-area rts-section-gap">
        <div className="container">
          {teamDetailsData.map((detail, idx) => {
            const reverse = idx % 2 === 1; // alternate layout
            const imgSrc =
              joinImageUrl(detail.image) ||
              "https://via.placeholder.com/800x900?text=No+Image";

            return (
              <div className="row align-items-start team-details-block g-5" key={idx}>
                {/* Image */}
                <div
                  className={`col-lg-5 ${reverse ? "order-lg-2" : "order-lg-1"}`}
                >
                  <figure className="team-details-figure">
                    <img
                      src={imgSrc}
                      alt={detail.name}
                      className="team-details-img"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://via.placeholder.com/800x900?text=No+Image";
                      }}
                    />
                    <figcaption className="visually-hidden">
                      {detail.name}, {detail.role}
                    </figcaption>
                  </figure>
                </div>

                {/* Content */}
                <div
                  className={`col-lg-7 ${reverse ? "order-lg-1" : "order-lg-2"}`}
                >
                  <div className="team-details-content">
                    <span className="team-details-eyebrow">{detail.title}</span>
                    <h3 className="team-details-name">{detail.name}</h3>
                    <p className="team-details-role">{detail.role}</p>

                    {/* First paragraph as a soft lead / pull-quote */}
                    {detail.paragraphs?.length > 0 && (
                      <blockquote className="team-details-lead">
                        {detail.paragraphs[0]}
                      </blockquote>
                    )}

                    {/* Remaining paragraphs */}
                    {detail.paragraphs?.slice(1).map((p, i) => (
                      <p className="team-details-para" key={i}>
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

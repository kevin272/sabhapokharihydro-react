import React from "react";
import Breadcrumb from "../components/common/Breadcrumb";

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
      name: "Mr. Rajendra Pokharel",
      role: "Managing Director",
      image:
        "https://sabhapokharihydro.com.np/assets/tenant/uploads/media-uploader/sabhapokharihydro/new-project-321745729471.png",
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

      <div style={{ paddingTop: "80px", paddingBottom: "100px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {teamDetailsData.map((detail, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "flex-start",
                gap: "40px",
                marginBottom: "80px",
              }}
            >
              {/* Image */}
              <div
                style={{
                  flex: "1 1 40%",
                  maxWidth: "450px",
                  overflow: "hidden",
                  borderRadius: "20px",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                }}
              >
                <img
                  src={detail.image}
                  alt={detail.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    transition: "transform 0.4s",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
              </div>

              {/* Text */}
              <div
                style={{
                  flex: "1 1 55%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#ff6600",
                  }}
                >
                  {detail.title}
                </span>
                <h3
                  style={{
                    fontSize: "32px",
                    fontWeight: "700",
                    margin: "0",
                    color: "#222",
                  }}
                >
                  {detail.name}
                </h3>
                <p style={{ fontSize: "16px", color: "#555", margin: "0" }}>
                  {detail.role}
                </p>

                {detail.paragraphs.map((para, i) => (
                  <p
                    key={i}
                    style={{
                      fontSize: "16px",
                      color: "#555",
                      lineHeight: "1.6",
                      margin: "0",
                    }}
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

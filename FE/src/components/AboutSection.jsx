import React from "react";

const tabsData = [
  {
    id: "pills-home",
    title: "Why Choose Us?",
    content: "Sabha Pokhari Hydropower Limited (SPHPL) is led by a team of professionals with years of experience in hydropower development in Nepal. We focus on sustainable, run-of-river projects that generate reliable electricity while preserving the environment and supporting local communities. Our commitment is to quality engineering, timely delivery, and transparent operation that benefits both investors and the nation.",
    image: "https://assets-cdn-api.ekantipur.com/thumb.php?src=https://assets-cdn.ekantipur.com/uploads/source/news/kantipur/2024/miscellaneous/bijuli-07122024042243-1000x0.jpg&w=1001&h=0",
    bullets: [
      "Experienced team with strong technical expertise",
      "Reliable and sustainable project execution",
      "Community-focused and eco-friendly approach",
      "Commitment to quality and accountability",
    ],
  },
  {
    id: "pills-profile",
    title: "Our Mission",
    content: "To harness Nepal’s abundant water resources by developing run-of-river hydropower projects that provide clean, affordable, and sustainable energy. We aim to strengthen the national grid, reduce dependency on fossil fuels, and create opportunities for local communities through employment and infrastructure development.",
    image: "https://images.unsplash.com/photo-1466975656732-e70d9b542a09?q=80&w=1165&auto=format&fit=crop&ixlib=rb-4.1.0",
    bullets: [
      "Deliver clean and renewable energy",
      "Promote environmental responsibility",
      "Create socio-economic benefits for local communities",
      "Support Nepal’s journey toward energy independence",
    ],
  },
  {
    id: "pills-contact",
    title: "Our Goal",
    content: "Our goal is to become a trusted leader in hydropower development in Nepal, with projects that make a lasting impact on energy security, economic growth, and environmental sustainability. Through innovation, efficiency, and community engagement, we strive to expand our portfolio of successful projects and contribute to a greener future.",
    image: "https://images.unsplash.com/photo-1466975656732-e70d9b542a09?q=80&w=1165&auto=format&fit=crop&ixlib=rb-4.1.0",
    bullets: [
      "Expand hydropower capacity in Nepal",
      "Ensure long-term operational excellence",
      "Build trust with stakeholders and investors",
      "Contribute to a clean and sustainable future",
    ],
  },
];

const AboutSection = () => {
  const [activeTab, setActiveTab] = React.useState("pills-contact");

  const handleMouseEnter = (e) => {
    const img = e.currentTarget.querySelector("img");
    const shine = e.currentTarget.querySelector(".shine");
    img.style.transform = "scale(1.03)";
    img.style.filter = "brightness(1.08)";
    shine.style.transform = "rotate(25deg) translateX(150%)";
  };

  const handleMouseLeave = (e) => {
    const img = e.currentTarget.querySelector("img");
    const shine = e.currentTarget.querySelector(".shine");
    img.style.transform = "scale(1)";
    img.style.filter = "brightness(1)";
    shine.style.transform = "rotate(25deg) translateX(-150%)";
  };

  return (
    <div className="rts-about-area rts-section-gap">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Image */}
          <div className="col-lg-6">
            <div
              className="rts-about-left-image-area thumbnail"
              style={{
                position: "relative",
                display: "inline-block",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src="https://images.unsplash.com/photo-1708518370757-38e07a989946?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0"
                alt="about"
                style={{
                  display: "block",
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: "12px",
                  transition: "transform 0.35s, filter 0.35s",
                  transform: "scale(1)",
                  filter: "brightness(1)",
                }}
              />
              <div
                className="shine"
                style={{
                  position: "absolute",
                  top: "-50%",
                  left: "-50%",
                  width: "40%",
                  height: "200%",
                  background:
                    "linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.55) 50%, rgba(255,255,255,0) 100%)",
                  transform: "rotate(25deg) translateX(-150%)",
                  transition: "transform 0.8s",
                  pointerEvents: "none",
                }}
              ></div>
            </div>
          </div>

          {/* Right Content */}
          <div className="col-lg-6">
            <div className="about-right-content-area-solar-energy">
              <div className="title-area-left">
                <p className="pre">
                  <span>About</span> Sabhapokhari
                </p>
                <h2 className="title skew-up" style={{ opacity: 1 }}>
                  <div className="word-line">
                    <div className="word">Support</div>{" "}
                    <div className="word">Nepal’s</div>{" "}
                    <div className="word">journey</div>
                  </div>
                  <div className="word-line">
                    <div className="word">towards</div>
                  </div>
                  <div className="word-line">
                    <div className="word">energy</div>{" "}
                    <div className="word">independence</div>
                  </div>
                </h2>
              </div>

              {/* Tabs */}
              <ul className="nav custom-nav-soalr-about nav-pills" role="tablist">
                {tabsData.map((tab) => (
                  <li className="nav-item" role="presentation" key={tab.id}>
                    <button
                      className={`nav-link ${activeTab === tab.id ? "active" : ""}`}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                    >
                      {tab.title}
                    </button>
                  </li>
                ))}
              </ul>

              {/* Tab Content */}
              <div className="tab-content">
                {tabsData.map((tab) => (
                  <div
                    key={tab.id}
                    className={`tab-pane fade ${activeTab === tab.id ? "show active" : ""}`}
                  >
                    <div className="single-about-content-solar">
                      <p className="disc">{tab.content}</p>
                      <div className="row align-items-center">
                        <div className="col-lg-6">
                          <div className="left-area-wrapper">
                            <img src={tab.image} alt="about" />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          {tab.bullets.map((bullet, i) => (
                            <div className="single-ckeck-wrapper" key={i}>
                              <img src="assets/images/about/dt.png" alt="dotted" />
                              <p>{bullet}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Right Content End */}
        </div>
      </div>
    </div>
  );
};

export default AboutSection;

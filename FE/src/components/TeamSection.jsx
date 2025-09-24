import React, { useEffect, useState } from "react";
import axiosInstance from "../config/axios.config"; // adjust path as needed

const TeamSection = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const baseURL = import.meta.env.VITE_API_URL.replace("/api", "");
const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/+$/, "");
const SERVER_URL = API_URL.replace(/\/api$/, "");
const joinImageUrl = (p) => (!p ? "" : /^https?:\/\//i.test(p) ? p : `${SERVER_URL}${p.startsWith("/") ? "" : "/"}${p}`);


  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const body = await axiosInstance.get("/team"); // ✅ backend route
        setTeamMembers(body.data); // assuming `sendResponse` wraps in { data: [...] }
      } catch (err) {
        console.error("Error fetching team:", err);
      }
    };
    fetchTeam();
  }, []);


  return (
    <div className="rts-team-area rts-section-gapBottom reveal align-items-center">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="title-area-center title-g">
              <p className="pre skew-up"><span> Our</span> Expert team</p>
              <h2 className="title skew-up">Meet our Expert Team Members</h2>
            </div>
          </div>
        </div>
        <div className="row mt--30 g-24">
          {teamMembers?.map((member, index) => (
<div className="col-lg-3 col-md-4 col-sm-6" key={member._id || index}>
  <div className="solar-energy-team">
    <div className="thumbnail">
      <div className="team-thumb">
        <img
          src={member.img ? joinImageUrl(member.img) : "https://via.placeholder.com/600x750?text=No+Image"}
          alt={member.name || "team"}
          loading="lazy"
          onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/600x750?text=No+Image"; }}
        />
      </div>
    </div>
    <div className="inner-content">
      <a href="/team-details"><h5 className="title">{member.name}</h5></a>
      <span>{member.role}</span>
    </div>
  </div>
</div>

          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamSection;

import React, { useEffect, useState } from "react";
import axiosInstance from "../config/axios.config"; // adjust path as needed

const TeamSection = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const baseURL = import.meta.env.VITE_API_URL.replace("/api", "");

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
            <div className="col-lg-3" key={index}>
              <div className="solar-energy-team">
                <div className="thumbnail">
                  <div style={{width: '100%', maxWidth: '600px', overflow: 'hidden', borderRadius: '20px', margin: '20px auto'}}>
                    <img
                      src = {member.img ? `${baseURL}${member.img}` : 'https://via.placeholder.com/300x300?text=No+Image'}
                      alt="team"
                      style={{
                        width: '100%',
                        display: 'block',
                        transition: 'transform 0.4s, filter 0.4s',
                        transformOrigin: 'center center',
                        filter: 'brightness(0.9) contrast(1.1)'
                      }}
                      onMouseOver={e => { e.currentTarget.style.transform='scale(1.1)'; e.currentTarget.style.filter='brightness(1) contrast(1.2)'; }}
                      onMouseOut={e => { e.currentTarget.style.transform='scale(1)'; e.currentTarget.style.filter='brightness(0.9) contrast(1.1)'; }}
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

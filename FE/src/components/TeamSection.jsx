import React from "react";

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Dr. Laxmi Prasad Devkota",
      role: "Chairman",
      img: "https://sabhapokharihydro.com.np/assets/tenant/uploads/media-uploader/sabhapokharihydro/1ae37233-aaf6-4609-846b-32148136fa261745577541.jpg"
    },
    {
      name: "Er. Shree Ram Devkota",
      role: "Managing Director",
      img: "https://sabhapokharihydro.com.np/assets/tenant/uploads/media-uploader/sabhapokharihydro/new-project-321745729471.png"
    }
  ];

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
          {teamMembers.map((member, index) => (
            <div className="col-lg-3" key={index}>
              <div className="solar-energy-team">
                <div className="thumbnail">
                  <div style={{width: '100%', maxWidth: '600px', overflow: 'hidden', borderRadius: '20px', margin: '20px auto'}}>
                    <img
                      src={member.img}
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
                  <a href="team-details.html"><h5 className="title">{member.name}</h5></a>
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

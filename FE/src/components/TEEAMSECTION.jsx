import React from "react";

const teamData = [
  {
    name: "Dr. Laxmi Prasad Devkota",
    role: "Chairman",
    image:
      "https://sabhapokharihydro.com.np/assets/tenant/uploads/media-uploader/sabhapokharihydro/1ae37233-aaf6-4609-846b-32148136fa261745577541.jpg",
    detailsUrl: "team-details.html",
    socials: {
      facebook: "https://facebook.com/",
      twitter: "https://twitter.com/",
      whatsapp: "https://wa.me/9779851363591",
      instagram: "https://instagram.com/",
    },
  },
  {
    name: "Er. Shree Ram Devkota",
    role: "Managing Director",
    image:
      "https://sabhapokharihydro.com.np/assets/tenant/uploads/media-uploader/sabhapokharihydro/new-project-321745729471.png",
    detailsUrl: "team-details.html",
    socials: {
      facebook: "#",
      twitter: "#",
      whatsapp: "#",
      instagram: "#",
    },
  },
  // Add more team members here...
];

export default function TeamSection() {
  return (
    <div className="rts-team-area rts-section-gap">
      <div className="container">
        <div className="row g-5">
          {teamData.map((member, index) => (
            <div
              className="col-lg-4 col-md-6 col-sm-12 col-12"
              key={index}
              data-aos="fade-up"
              data-aos-delay={100 * (index + 1)}
            >
              <div className="rts-single-team-one">
                <a href={member.detailsUrl} className="thumbnail">
                  <img src={member.image} alt={member.role} />
                </a>
                <div className="inner-content">
                  <div className="main_con">
                    <a href={member.detailsUrl}>
                      <h5 className="title">{member.name}</h5>
                    </a>
                    <span>{member.role}</span>
                  </div>
                  <div className="share-icon">
                    <div className="share-icons-wrapper">
                      <ul>
                        {member.socials.facebook && (
                          <li>
                            <a
                              href={member.socials.facebook}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <i className="fa-brands fa-facebook-f"></i>
                            </a>
                          </li>
                        )}
                        {member.socials.twitter && (
                          <li>
                            <a
                              href={member.socials.twitter}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <i className="fa-brands fa-twitter"></i>
                            </a>
                          </li>
                        )}
                        {member.socials.whatsapp && (
                          <li>
                            <a
                              href={member.socials.whatsapp}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <i className="fa-brands fa-whatsapp"></i>
                            </a>
                          </li>
                        )}
                        {member.socials.instagram && (
                          <li>
                            <a
                              href={member.socials.instagram}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <i className="fa-brands fa-instagram"></i>
                            </a>
                          </li>
                        )}
                      </ul>
                    </div>
                    <i className="fa-sharp fa-regular fa-share-nodes"></i>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

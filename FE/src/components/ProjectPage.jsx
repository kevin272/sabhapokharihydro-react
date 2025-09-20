import Breadcrumb from "./common/Breadcrumb";

export default function ProjectPage() {
  // Static project data (same file)
  const projectData = {
    title: "Lakhuwa Khola Small Hydro Electric Project",
    description:
      "The project is a run-of-river scheme that will harness the flow of Lankhuwa Khola to generate electricity. The project is Completed and got COD letter on 24 Magh 2081.",
    image:
      "https://sabhapokharihydro.com.np/assets/tenant/uploads/media-uploader/sabhapokharihydro/ee9281ea-ff97-4a1b-b9cb-b92b231c98c11745577542.jpg",
    info: {
      capacity: "5.0 MW",
      location: "Dhupu, Sankhuwasabha District, Province No. 1, Nepal",
      status: "Completed",
      developer: "Sabha Pokhari Hydropower Pvt. Ltd.",
    },
  };

  return (
    <>
    <Breadcrumb
        title={projectData.title}
        links={[
          { label: "HOME", to: "/" },
          { label: `${projectData.title}`, active: true },
        ]}
      />
    <div className="rts-project-details-area rts-section-gap">
      <div className="container">
        {/* Thumbnail */}
        <div className="row">
          <div className="col-lg-12">
            <div className="project-details-area-main">
              <div className="thumbnail">
                <img src={projectData.image} alt="project-details" />
              </div>
            </div>
          </div>
        </div>

        {/* Content + Sidebar */}
        <div className="row">
          {/* Left column */}
          <div className="col-lg-8 pr--30">
            <div className="portfolio-disc-content">
              <div className="title-area">
                <span>Project details</span>
                <h4 className="title">{projectData.title}</h4>
              </div>
              <p className="disc">{projectData.description}</p>
            </div>
          </div>

          {/* Right column */}
          <div className="col-lg-4">
            <div className="big-bg-porduct-details">
              <div className="project-info">
                <div className="info-head">
                  <h5 className="title">Project Information</h5>
                </div>
                <div className="info-body">
                  {/* Capacity */}
                  <div className="single-info">
                    <div className="info-ico">
                      <i className="fas fa-bolt"></i>
                    </div>
                    <div className="info-details">
                      <span>Capacity:</span>
                      <h6 className="name">{projectData.info.capacity}</h6>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="single-info">
                    <div className="info-ico">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <div className="info-details">
                      <span>Location:</span>
                      <h6 className="name">{projectData.info.location}</h6>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="single-info">
                    <div className="info-ico">
                      <i className="fas fa-check-circle"></i>
                    </div>
                    <div className="info-details">
                      <span>Status:</span>
                      <h6 className="name">{projectData.info.status}</h6>
                    </div>
                  </div>

                  {/* Developer */}
                  <div className="single-info last">
                    <div className="info-ico">
                      <i className="fas fa-industry"></i>
                    </div>
                    <div className="info-details">
                      <span>Developer:</span>
                      <h6 className="name">{projectData.info.developer}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
    </>
  );
}

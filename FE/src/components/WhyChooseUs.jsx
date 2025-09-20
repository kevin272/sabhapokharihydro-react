export default function WhyChooseUs() {
  return (
    <>
      {/* Vision + Accordion */}
      <div className="why-choose-us-section rts-section-gap">
        <div className="container">
          <div className="row">
            {/* Left side */}
            <div className="col-lg-6">
              <div className="choose-us-content-left-wrapper-4">
                <div className="solari-title-area-four">
                  <span className="pre-title skew-up">Our Vision</span>
                  <h2 className="title skew-up">Our vission is to make energy accessible</h2>
                </div>

                <div className="inner-content">
                  <div className="mission-accordion-area">
                    <div className="accordion" id="accordionExample">
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                          <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                          >
                            Environmental Stewardship
                          </button>
                        </h2>
                        <div
                          id="collapseOne"
                          className="accordion-collapse collapse show"
                          aria-labelledby="headingOne"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            Harnessing clean energy from rivers while minimizing ecological footprint.
                          </div>
                        </div>
                      </div>

                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingTwo">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseTwo"
                            aria-expanded="false"
                            aria-controls="collapseTwo"
                          >
                            Energy Independence
                          </button>
                        </h2>
                        <div
                          id="collapseTwo"
                          className="accordion-collapse collapse"
                          aria-labelledby="headingTwo"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            Supporting Nepal’s self-reliance on renewable power.
                          </div>
                        </div>
                      </div>

                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingThree">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseThree"
                            aria-expanded="false"
                            aria-controls="collapseThree"
                          >
                            Socio-Economic Impact
                          </button>
                        </h2>
                        <div
                          id="collapseThree"
                          className="accordion-collapse collapse"
                          aria-labelledby="headingThree"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            Creating jobs and community benefits in project regions.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side */}
            <div className="col-lg-6">
              <div className="video-thumbnail-img">
                <img src="/assets/images/mission/01.jpg" alt="mission" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="why-choose-us-section rts-section-gap bg-why-choose-us">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="video-thumbnail-img ml--0 mr--20">
                <img
                  src="https://sabhapokharihydro.com.np/assets/tenant/uploads/media-uploader/sabhapokharihydro/9e8e19ea-17fe-4b83-9949-37c26264e8fd1745564642.jpg"
                  alt="mission"
                />
                <div className="vedio-icone">
                  <a
                    className="video-play-button play-video"
                    href="https://www.youtube.com/watch?v=D6Jl42foIoY"
                  >
                    <span></span>
                  </a>
                  <div className="video-overlay">
                    <a className="video-overlay-close">×</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="choose-us-content-left-wrapper-4">
                <div className="solari-title-area-four">
                  <span className="pre-title skew-up">Why Choose Us</span>
                  <h2 className="title skew-up">Hydropower Development Advantage</h2>
                </div>

                <div className="inner-content">
                  <p className="disc">
                    Choose Sabha Pokhari Hydropower as your partner in clean energy. <br />
                    We deliver reliable run-of-river projects with long-term community benefits.
                  </p>
                  {/* You can add icons / list items here like in your HTML */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

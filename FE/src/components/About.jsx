export default function About() {
  return (
    <div className="rts-about-style-four rts-section-gap bg-about-h4">
      <div className="container">
        <div className="row">
          {/* Left side - Image */}
          <div className="col-lg-6">
            <div className="thumbanil-about-four">
              <img
                src="https://sabhapokharihydro.com.np/assets/tenant/uploads/media-uploader/sabhapokharihydro/green-and-white-modern-renewable-energy-presentation-800-x-800-px1745744196.jpg"
                alt="about"
              />
              <div className="small-bottom-right bg_image">
                <h4 className="title">
                  Our mission <br />
                  To be a leading force in Nepal’s <br />
                  sustainable energy transformation
                </h4>
              </div>
            </div>
          </div>

          {/* Right side - Text */}
          <div className="col-lg-6 pl--50 pl_md--15 pl_sm--15 mt_md--50 mt_sm--50">
            <div className="solari-title-area-four">
              <span className="pre-title skew-up">About Sabha Pokhari Hydropower</span>
              <h2 className="title skew-up">Sustainable energy <br />for Nepal’s future</h2>
            </div>
            <div className="about-inner-four-h4">
              <p className="disc">
                Sabha Pokhari Hydropower Limited (SPHPL) is a public limited company incorporated on
                May 23, 2007. SPHPL develops hydropower projects in Nepal under a BOOT model. Its
                flagship project is the Lankhuwa Khola Hydroelectric Project (5 MW) in Sabhapokhari
                Rural Municipality, Sankhuwasabha District.
              </p>

              <div className="check-area-wrapper mb--30">
                <div className="single-check">
                  <img src="/assets/images/about/dt.png" alt="about" />
                  <p>Lankhuwa Khola 5 MW Project</p>
                </div>
                <div className="single-check">
                  <img src="/assets/images/about/dt.png" alt="about" />
                  <p>BOOT model development</p>
                </div>
                <div className="single-check">
                  <img src="/assets/images/about/dt.png" alt="about" />
                  <p>Annual generation ≈ 29.17 GWh</p>
                </div>
              </div>

              <a href="/aboutus" className="rts-btn btn-primary">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

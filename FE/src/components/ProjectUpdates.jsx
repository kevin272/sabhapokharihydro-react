export default function ProjectUpdates()  {
return (
  <section className="rts-working-process rts-section-gap bg-lighten">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-6">
          <div className="solari-title-area-four">
            <span className="pre-title skew-up">Project Updates</span>
            <h3 className="title skew-up">Updates for our <br /> previous and ongoing projects</h3>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="content--right">
            <p className="disc skew-up"></p>
          </div>
        </div>
      </div>

      <div className="row g-24 mt--20">
        {[1, 2, 3].map((i) => (
          <div className="col-lg-4 col-md-6 col-sm-12 col-12" key={i}>
            <div className="single-solari-steps-start">
              <a
                href="https://sabhapokharihydro.thulo.com.np/assets/tenant/uploads/media-uploader/sabhapokharihydro/sabhapokhari-hydropower-ar-80811745577541.pdf"
                target="_blank"
                rel="noreferrer"
              >
                <div className="thumbnail">
                  <img
                    src="https://sabhapokharihydro.com.np/assets/tenant/uploads/media-uploader/sabhapokharihydro/22e2fb0a-9284-4c32-b01b-de647ec84ee21745578256.jpg"
                    alt="steps"
                  />
                  <div className="steps">
                    <span>{String(i).padStart(2, "0")}</span>
                  </div>
                </div>
              </a>
              <div className="content">
                <h5 className="title">Sunil Chapain and Associates</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)}
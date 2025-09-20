export default function Banner() {
  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <div className="banner-area-four-wrapper-swiper-main">
          <div className="swiper mySwiper-banener-four-water">
            <div className="swiper-wrapper">
              {/* Slide 1 */}
              <div className="swiper-slide">
                <div className="rts-banner-area-four banner_bg-four rts-section-gap">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-8">
                        <div className="banner-four-main-content-wrapper pt--200 pt_sm--100">
                          <div className="title-right-shape">
                            <img src="/assets/images/banner/shape/04.png" alt="banner-shape" />
                          </div>
                          <h1 className="title-main">Sabhapokhari <br /> Hydro</h1>
                          <p className="disc">Developing sustainable hydropower for Nepal</p>
                          <div className="button-solari-banner-area area-2">
                            <a href="/aboutus" className="rts-btn btn-primary">Learn More</a>
                            <div className="vedio-icone">
                              <a className="video-play-button play-video" href="#">
                                <span></span>
                                <p className="text">Intro Video</p>
                              </a>
                              <div className="video-overlay">
                                <a className="video-overlay-close">×</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="banner-social-rotate">
                    <div className="social-wrapper-one-horizental">
                      <a href="#"><i className="fa-brands fa-linkedin-in"></i></a>
                      <a href="#"><i className="fa-brands fa-youtube"></i></a>
                      <a href="#"><i className="fa-brands fa-twitter"></i></a>
                      <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
                    </div>
                    <p className="follow">Follow us</p>
                  </div>
                </div>
              </div>

              {/* You can duplicate for Slide 2 */}
            </div>
            <div className="swiper-pagination"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";

export default function Footer() {
  return (
    <div className="rts-footer-one footer-bg-two bg-four">
      <div className="container">
        <div className="row pt--90 pb--55 pb_sm--40">
          <div className="col-lg-12 plr_sm--15">
            <div className="single-footer-one-wrapper two">

              {/* Logo + About */}
              <div className="single-footer-component first">
                <a href="index.html" className="logo-area-footer">
                  <img src="/assets/images/logo.png" alt="logo" />
                </a>
                <div className="body mt--45">
                  <p className="disc">
                    Sabha Pokhari Hydropower Limited (SPHPL) is a public limited company dedicated to developing sustainable hydropower for Nepal
                  </p>
                  <div className="rts-social-style-one">
                    <ul>
                      <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
                      <li><a href="#"><i className="fa-brands fa-twitter"></i></a></li>
                      <li><a href="#"><i className="fa-brands fa-youtube"></i></a></li>
                      <li><a href="#"><i className="fa-brands fa-linkedin-in"></i></a></li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="single-footer-component">
                <div className="title-area">
                  <h5 className="title">Quick Links</h5>
                </div>
                <div className="body">
                  <div className="pages-footer">
                    <ul>
                      <li>
                        <a href="/aboutus">
                          <i className="fa-regular fa-chevron-right"></i>
                          <p>About Us</p>
                        </a>
                      </li>
                      <li>
                        <a href="project-details-gallery.html">
                          <i className="fa-regular fa-chevron-right"></i>
                          <p>Gallery</p>
                        </a>
                      </li>
                      <li>
                        <a href="service.html">
                          <i className="fa-regular fa-chevron-right"></i>
                          <p>Our Services</p>
                        </a>
                      </li>
                      <li>
                        <a href="team.html">
                          <i className="fa-regular fa-chevron-right"></i>
                          <p>Our Team</p>
                        </a>
                      </li>
                      <li>
                        <a href="contact.html">
                          <i className="fa-regular fa-chevron-right"></i>
                          <p>Contact Us</p>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Useful Links */}
              <div className="single-footer-component">
                <div className="title-area">
                  <h5 className="title">Useful Links</h5>
                </div>
                <div className="body">
                  <div className="pages-footer">
                    <ul>
                      <li>
                        <a href="https://www.nea.org.np/">
                          <i className="fa-regular fa-chevron-right"></i>
                          <p>NEA</p>
                        </a>
                      </li>
                      <li>
                        <a href="careers.html">
                          <i className="fa-regular fa-chevron-right"></i>
                          <p>Careers</p>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Contact Us */}
              <div className="single-footer-component last">
                <div className="title-area">
                  <h5 className="title">Contact Us</h5>
                </div>
                <div className="body">
                  <div className="footer-contact-wrapper-2">

                    {/* Phone */}
                    <div className="contact-single">
                      <div className="icon">
                        <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14.5332 21.1589L12.5385 22.04C13.16 24.5227 14.4784 26.8062 16.3178 28.5859L18.0781 27.2989C18.8822 26.6994 19.987 26.7381 20.7603 27.3742L24.6985 30.4454C25.5518 31.103 25.7825 32.323 25.3143 33.2699L23.2386 37.1746C23.0513 37.5534 22.7254 37.8092 22.3702 38.0143C21.8628 38.3072 21.2674 38.448 20.6485 38.1963C15.3952 36.8316 11.0703 33.4423 8.375 28.7739C5.67969 24.1055 4.90689 18.6654 6.35167 13.4334C6.63048 12.3929 7.53602 11.7348 8.56085 11.752L12.9803 11.9068C14.0344 11.9747 14.9463 12.7338 15.1184 13.8523L15.8091 18.7985C15.9734 19.7862 15.4544 20.7624 14.5332 21.1589Z" fill="#4AAB3D"/>
                        </svg>
                      </div>
                      <div className="info-content ml-dec-5">
                        <a href="tel:+977-9851363591"><h6 className="title">+977-9851363591</h6></a>
                        <a href="tel:+977-9846565678"><h6 className="title">+977-9846565678</h6></a>
                        <span>Call us for support</span>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="contact-single">
                      <div className="icon">
                        <svg width="30" height="23" viewBox="0 0 30 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M26.25 0.5C28.3008 0.5 30 2.19922 30 4.25V19.25C30 21.3594 28.3008 23 26.25 23H3.75C1.64063 23 0 21.3594 0 19.25L0 4.25C0 2.19922 1.64063 0.5 3.75 0.5L26.25 0.5ZM3.75 2.375C2.69531 2.375 1.875 3.25391 1.875 4.25V6.35938L13.3008 14.9727C14.2969 15.7344 15.6445 15.7344 16.6406 14.9727L28.125 6.41797V4.25C28.125 3.25391 27.2461 2.375 26.25 2.375L3.75 2.375Z" fill="#4AAB3D"/>
                        </svg>
                      </div>
                      <div className="info-content">
                        <a href="mailto:info.sabhapokharihydro@gmail.com">
                          <h6 className="title">info.sabhapokharihydro@gmail.com</h6>
                        </a>
                        <span>Email us for query</span>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="contact-single">
                      <div class="icon">

                                            <svg width="34" height="31" viewBox="0 0 34 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M15.4688 7.3125C15.4688 6.55078 16.0547 5.90625 16.875 5.90625C17.6367 5.90625 18.2812 6.55078 18.2812 7.3125C18.2812 8.13281 17.6367 8.71875 16.875 8.71875C16.0547 8.71875 15.4688 8.13281 15.4688 7.3125ZM15.9961 19.0312C14.1211 16.6875 9.84375 11.0039 9.84375 7.78125C9.84375 3.91406 12.9492 0.75 16.875 0.75C20.7422 0.75 23.9062 3.91406 23.9062 7.78125C23.9062 11.0039 19.5703 16.6875 17.6953 19.0312C17.2852 19.6172 16.4062 19.6172 15.9961 19.0312ZM21.4453 9.83203C21.8555 8.89453 22.0312 8.25 22.0312 7.78125C22.0312 4.96875 19.6875 2.625 16.875 2.625C14.0039 2.625 11.7188 4.96875 11.7188 7.78125C11.7188 8.25 11.8359 8.89453 12.2461 9.83203C12.5977 10.7695 13.1836 11.7656 13.7695 12.7617C14.7656 14.4023 15.9375 15.9844 16.875 17.1562C17.7539 15.9844 18.9258 14.4023 19.9219 12.7617C20.5078 11.7656 21.0938 10.7695 21.4453 9.83203ZM23.7305 13.8164C23.7305 13.875 23.6719 13.875 23.6133 13.875C24.082 13.0547 24.5508 12.1758 24.9023 11.3555L31.8164 8.60156C32.6953 8.25 33.75 8.89453 33.75 9.89062V25.7695C33.75 26.3555 33.3984 26.8828 32.8125 27.0586L23.7305 30.6914C23.5547 30.8086 23.3789 30.8086 23.1445 30.75L10.3125 27.0586L1.875 30.457C0.996094 30.8086 0 30.1641 0 29.168L0 13.2891C0 12.7031 0.292969 12.1758 0.878906 12L8.08594 9.07031C8.20312 9.71484 8.37891 10.3008 8.61328 10.8867L1.875 13.582L1.875 28.4648L9.375 25.4766V18.5625C9.375 18.0938 9.78516 17.625 10.3125 17.625C10.7813 17.625 11.25 18.0938 11.25 18.5625V25.3594L22.5 28.582V18.5625C22.5 18.0938 22.9102 17.625 23.4375 17.625C23.9062 17.625 24.375 18.0938 24.375 18.5625V28.4648L31.875 25.4766V10.5937L23.7305 13.8164Z" fill="#4AAB3D" />
                                            </svg>

                                        </div>
                      <div className="info-content">
                        <a href="#"><h6 className="title">Banasthali</h6></a>
                        <span>Kathmandu, Nepal</span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="row pb--20 pt--20 border-top-copyright">
          <div className="col-lg-12">
            <div className="copyright-area-two">
              <div className="left">
                Sabhapokhari Hydropower Ltd | © 2025 All Rights Reserved
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

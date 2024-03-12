import React from "react";

const Footer = () => {
  return (
    <div className="container my-5">
      {/* Footer */}
      <footer className="text-center text-lg-start text-black">
        {/* Section: Social media */}
        <section
          className="d-flex justify-content-between p-4"
          style={{ backgroundColor: "#009393" }}
        >
          {/* Left */}
          <div className="me-5">
            <span className="text-white">
              Get connected with us on social networks:
            </span>
          </div>
          {/* Left */}

          {/* Right */}
          <div>
            <a href="" className="text-white me-4">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="" className="text-white me-4">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="" className="text-white me-4">
              <i className="fab fa-google"></i>
            </a>
            <a href="" className="text-white me-4">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="" className="text-white me-4">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="" className="text-white me-4">
              <i className="fab fa-github"></i>
            </a>
          </div>
          {/* Right */}
        </section>
        {/* Section: Social media */}

        {/* Section: Links  */}
        <section className="">
          <div className="container text-center text-md-start mt-5">
            {/* Grid row */}
            <div className="row mt-3">
              {/* Grid column */}
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                {/* Content */}
                <h6 className="text-uppercase fw-bold">Enigh Store</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{
                    width: "60px",
                    backgroundColor: "#7c4dff",
                    height: "2px",
                  }}
                />
                <p>
                  Here you can use rows and columns to organize your footer
                  content. Lorem ipsum dolor sit amet, consectetur adipisicing
                  elit.
                </p>
              </div>
              {/* Grid column */}

              {/* Grid column */}
              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                {/* Links */}
                <h6 className="text-uppercase fw-bold">Products</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{
                    width: "60px",
                    backgroundColor: "#7c4dff",
                    height: "2px",
                  }}
                />
                <p>
                  <a href="#!" className="text-black">
                    Graphic Card
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-black">
                    Processor
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-black">
                    Case
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-black">
                    Motherboard
                  </a>
                </p>
              </div>
              {/* Grid column */}

              {/* Grid column */}
              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                {/* Links */}
                <h6 className="text-uppercase fw-bold">Useful links</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{
                    width: "60px",
                    backgroundColor: "#7c4dff",
                    height: "2px",
                  }}
                />
                <p>
                  <a href="#!" className="text-black">
                    Your Account
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-black">
                    Become an Affiliate
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-black">
                    Shipping Rates
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-black">
                    Help
                  </a>
                </p>
              </div>
              {/* Grid column */}

              {/* Grid column */}
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                {/* Links */}
                <h6 className="text-uppercase fw-bold">Contact</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{
                    width: "60px",
                    backgroundColor: "#7c4dff",
                    height: "2px",
                  }}
                />
                <p>
                  <i className="fas fa-home mr-3">
                    {" "}
                    Cendana Barat no 10 Srondol Wetan, Banyumanik, Kota Semarang{" "}
                  </i>
                </p>
                <p>
                  <i className="fas fa-envelope mr-3"> Enighander@gmail.com </i>
                </p>
                <p>
                  <i className="fas fa-phone mr-3"> +6285156793934 </i>
                </p>
              </div>
              {/* Grid column */}
            </div>
            {/* Grid row */}
          </div>
        </section>
        {/* Section: Links  */}

        {/* Copyright */}
        <div
          className="text-center text-white p-3"
          style={{ backgroundColor: "#009393" }}
        >
          © 2023 Copyright:{" "}
          <a className="text-white" href="https://mdbootstrap.com/">
            Enighander-PCshop.com
          </a>
        </div>
        {/* Copyright */}
      </footer>
      {/* Footer */}
    </div>
  );
};

export default Footer;

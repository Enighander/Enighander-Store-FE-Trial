import React from "react";
import logo from "../../assets/Brand.jpg";
import { Link } from "react-router-dom";
import "../../assets/css/style.css";

const Navbar = () => {
  return (
    <>
      <header id="navbar">
        <nav className="navbar fixed-top navbar-expand-lg p-3">
          <div className="container d-flex align-items-center">
          <a className="navbar-brand" href="/home">
              <img
                src={logo}
                width="110"
                height="33"
                alt="Brand"
              />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarTogglerDemo02"
              aria-controls="navbarTogglerDemo02"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon col-md-4" />
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarTogglerDemo02">
              <ul className="navbar-nav search-container">
                <li className="nav-item">
                  <input
                    className="form-control search"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                </li>
              </ul>
              <form className="form-inline wrap">
                <i className="cart bi bi-cart" />
                <button className="login btn rounded-pill">
                  <Link
                    style={{ color: "inherit", textDecoration: "none", fontWeight: "bold" }}
                    to={"/login"}
                  >
                    Login
                  </Link>
                </button>
                <button className="register btn rounded-pill ">
                  <Link
                    style={{ color: "inherit", textDecoration: "none", fontWeight: "bold" }}
                    to={"/register"}
                  >
                    Register
                  </Link>
                </button>
              </form>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;

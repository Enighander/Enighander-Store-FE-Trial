import React, { useEffect, useState } from "react";
import logo from "../../assets/Brand.png";
import { CgProfile } from "react-icons/cg";
import { BsCart } from "react-icons/bs";
import { GrNotification } from "react-icons/gr";
import { Link } from "react-router-dom";
import "../../assets/css/style.css";
import axios from "axios";

const NavbarLogin = () => {
  const userId = localStorage.getItem("userId");
  const adminId = localStorage.getItem("adminId");
  const userRoleVariable = localStorage.getItem("role");
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (search.trim() === "") {
      setData([]);
      return;
    }
    setLoading(true);
    axios
      .get(
        `${
          import.meta.env.VITE_REACT_APP_API_URL
        }/products/search?search=${search}`
      )
      .then((response) => {
        setData(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("error fetching data:", error);
        setLoading(false);
      });
  }, [search]);

  return (
    <>
      <header id="navbar">
        <nav className="navbar fixed-top navbar-expand-lg  p-3">
          <div className="container d-flex align-items-center">
            <a className="navbar-brand" href="/home">
              <img src={logo} width="110" height="33" alt="Brand" />
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
            <div
              className="collapse navbar-collapse justify-content-end"
              id="navbarTogglerDemo02"
            >
              <ul className="navbar-nav search-container">
                <li className="nav-item">
                  <input
                    className="form-control search"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </li>
              </ul>
              <form className="form-inline wrap">
                <div className="icon-link">
                  <i className="cart bi bi-cart" />
                </div>
                <div className="icon-link">
                  {userRoleVariable === "admin" ? (
                    <Link
                      to={`/profile/admin/${adminId}`}
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      <CgProfile size={30} />
                    </Link>
                  ) : (
                    <Link
                      to={`/profile/user/${userId}`}
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      <CgProfile size={30} />
                    </Link>
                  )}
                </div>
                <div className="icon-link">
                  <Link
                    style={{ color: "inherit", textDecoration: "none" }}
                    to={`/cart/${userId}`}
                  >
                    <BsCart size={30} />
                  </Link>
                </div>
                <div className="icon-link">
                  <Link
                    style={{ color: "inherit", textDecoration: "none" }}
                    to="/Notification"
                  >
                    <GrNotification size={30} />
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default NavbarLogin;

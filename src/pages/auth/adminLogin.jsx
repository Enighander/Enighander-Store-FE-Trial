import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/brand.png";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import Navbar from "../../components/navbar/navbar.jsx";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      localStorage.clear();
      navigate("/home");
    }
  }, [navigate]);

  const handleAdminLogin = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/admin/login`,
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("role", response.data.data.role);
      localStorage.setItem("adminId", response.data.data.id);
      Swal.fire({
        icon: "success",
        title: "Admin Login Successful",
      });
      navigate("/home"); // Redirect to the admin dashboard.
      console.log("Admin Login Successful: Admin ID:", response.data.data.id);
    } catch (error) {
      if (error.response) {
        Swal.fire({
          icon: "error",
          title: "Admin Login Error",
          text: error.response.data.message,
        });
        console.error("Admin Login Error:", error.response.data);
      } else {
        Swal.fire({
          icon: "error",
          title: "Admin Login Error",
          text: "An error occurred while processing your request. Please try again later.",
        });
        console.error("Admin Login Error:", error);
      }
    }
  };

  const pageStyles = {
    background: "#FAFAFA",
    minHeight: "100vh",
    transform: "scale(0.9)", // Scale down to 70%
    transformOrigin: "top", // Maintain the top as the reference point
  };

  return (
    <>
      <Navbar />
      <div className="container" style={{ marginTop: 100 }}></div>
      <div className="container-fluid" style={pageStyles}>
        <div
          className="row justify-content-center align-items-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="col-lg-6 col-md-8">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">LOG IN</h2>
                <h4 className="card-subtitle mb-4 text-muted">
                  Welcome To Enighander Store
                </h4>
                <p className="card-text text-muted">
                  Please enter your Super User account details
                </p>
                <form>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="off"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="off"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleAdminLogin}
                    style={{ fontWeight: "bold", backgroundColor: "#FF0F17" }}
                  >
                    Log In
                  </button>
                </form>
              </div>
            </div>
            <div className="d-flex flex-wrap justify-content-between mt-4">
              <a href="#" className="text-muted">
                Terms Of Use
              </a>
              <a href="#" className="text-muted">
                Privacy Policy
              </a>
              <a href="#" className="text-muted">
                Cookie Policy
              </a>
              <a href="#" className="text-muted">
                Status Page
              </a>
              <a href="#" className="text-muted">
                Contact Us
              </a>
            </div>
          </div>
          <div className="col-lg-6 d-none d-lg-block order-lg-first">
            <img src={logo} className="img-fluid" alt="Placeholder" />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;

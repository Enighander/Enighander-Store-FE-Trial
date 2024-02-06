import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Brand.jpg";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import Navbar from "../../components/navbar/navbar.jsx";

const Login = () => {
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

  const handleUserLogin = async (e) => {
    e.preventDefault();
    // if (!email || !password) {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Validation Error",
    //     text: "Please enter email and password in required fields.",
    //   });
    //   return;
    // }
    
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/user/login`,
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("role", response.data.data.role);
      localStorage.setItem("userId", response.data.data.id);
      Swal.fire({
        icon: "success",
        title: "Login Successful",
      });
      navigate("/home");
    } catch (error) {
      console.error("register error:", error.response.data);
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessage = error.response.data.error;
        Swal.fire({
          icon: "error",
          title: "Format Error",
          text: errorMessage,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Error",
          text: "An error occurred during Login. Please try again later.",
        });
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
                  Please enter your account details
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
                    onClick={handleUserLogin}
                    style={{ fontWeight: "bold", backgroundColor: "#009393" }}
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

export default Login;

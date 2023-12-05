import React, { useState } from "react";
import Navbar from "../../components/navbar/navbar";
import logo from "../../assets/Brand.jpg";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  let [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  let [confirmPassword, setConfirmPassword] = useState("");

  const onChangeUser = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUserRegister = async () => {
    if (!userData.username || !userData.email || !userData.password) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "please fill in all required fields.",
      });
      return;
    }

    if (!validatePassword()) {
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/user/register`,
        userData
      );
      console.log("register successful:", response.data);
      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "You have Succesfully registered as a User.",
      });
      navigate("/login");
    } catch (error) {
      console.error("register error:", error.response.data);
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessage = error.response.data.error;
        Swal.fire({
          icon: "error",
          title: "Format Error",
          text: errorMessage,
        })
      } else {
        Swal.fire({
          icon: "error",
          title: "Registration Error",
          text: "An error occurred during registration. Please try again later.",
        });
      }
    }
  };

  const validatePassword = () => {
    if (userData.password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Password do not match.",
      });
      return false;
    }
    return true;
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
      <main>
        <div className="container" style={{ marginTop: 100 }}></div>
        <div className="container-fluid" style={pageStyles}>
          <div
            className="row justify-content-center align-items-center"
            style={{ minHeight: "100vh" }}
          >
            <div className="col-lg-6 d-none d-lg-block">
              <img src={logo} className="img-fluid" alt="Placeholder" />
            </div>
            <div className="col-lg-6 col-md-8">
              <div className="card">
                <div className="card-body">
                  <h2 className="card-title">Register</h2>
                  <h4 className="card-subtitle mb-4 text-muted">
                    Welcome To Enighander Store
                  </h4>
                  <p className="card-text text-muted">
                    Please enter your account details
                  </p>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleUserRegister();
                    }}
                  >
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        value={userData.email}
                        onChange={onChangeUser}
                        name="email"
                        autoComplete="email"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="username">Username</label>
                      <input
                        type="username"
                        className="form-control"
                        value={userData.username}
                        onChange={onChangeUser}
                        name="username"
                        autoComplete="username"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        value={userData.password}
                        onChange={onChangeUser}
                        name="password"
                        autoComplete="off"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="confirmPassword">Confirm Password</label>
                      <input
                        type="password"
                        className="form-control"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        autoComplete="off"
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={handleUserRegister}
                      style={{ fontWeight: "bold", backgroundColor: "#009393" }}
                    >
                      Sign In
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
          </div>
        </div>
      </main>
    </>
  );
};

export default Register;

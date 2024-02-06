import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import SidebarUser from "../../../../components/sidebarUser/sidebarUser";
import NavbarLogin from "../../../../components/navbarLogin";

const ChangePassword = () => {
  const userId = localStorage.getItem("userId");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validatePassword = () => {
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Password do not match.",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword()) {
      return;
    }

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_REACT_APP_API_URL}/user/${userId}/change-password`,
        {
          password,
        }
      );
      console.log("Change Password Successful", response.data);
      Swal.fire({
        icon: "success",
        title: "Change Password Successful",
        text: "You have Successfully Change the Password",
      });
    } catch (error) {
      console.error("Error changing password:", error.response.data);
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
          title: "Changing Password Error",
          text: "An error occurred during changing password. Please try again later.",
        });
      }
    }
  };

  return (
    <>
      <NavbarLogin />
      <div style={{ display: "flex" }}>
        <SidebarUser />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "1245px",
            height: "950px",
            backgroundColor: "#F5F5F5",
          }}
        >
          <div
            className="card"
            style={{ width: 850, height: "auto", backgroundColor: "white" }}
          >
            <div style={{ padding: 30 }}>
              <h5 className="font-weight-bold">Change Password</h5>
              <p>Manage Your Password Here</p>
              <div style={{ width: 800, border: "1px solid" }}></div>
              <div className="container">
                <div className="row">
                  <div className="col-lg-8 col-md-4 p-3">
                    <div className="p-3 text-white">
                      <form>
                        <div className="form-group">
                          <label htmlFor="password" className="text-dark">
                            Password
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            placeholder="Enter Password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                          />
                        </div>
                        <div className="form-group">
                          <label
                            htmlFor="confirmPassword"
                            className="text-dark"
                          >
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            value={confirmPassword}
                          />
                        </div>
                        <button
                          type="submit"
                          className="btn mt-5"
                          onClick={handleSubmit}
                          style={{
                            backgroundColor: "#009393",
                            borderRadius: 25,
                            color: "white",
                          }}
                        >
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;

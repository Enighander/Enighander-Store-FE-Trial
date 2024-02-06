import React, { useEffect, useState } from "react";
import NavbarLogin from "../../../components/navbarLogin";
import SidebarUser from "../../../components/sidebarUser/sidebarUser";
import ModalUploadUserImage from "../../../components/modalUploadProfileUser/modal-upload-profile";
import axios from "axios";
import Swal from "sweetalert2";

const User = () => {
  const userId = localStorage.getItem("userId");
  const [data, setData] = useState([]);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}/user/${userId}`)
      .then((response) => {
        const userData = response.data.data[0];
        setData(userData);
        setPreviewImage(userData.image_profile);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [userId]);

  const handleChange = (e) => {
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitUserData = async (event) => {
    event.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.set("username", data.username);
    formDataToSend.set("email", data.email);
    formDataToSend.set("phone", data.phone);

    try {
      const response = await axios.put(
        `${
          import.meta.env.VITE_REACT_APP_API_URL
        }/user/${userId}/updateUserData`,
        formDataToSend
      );
      console.log("Update successful", response);
      Swal.fire({
        icon: "success",
        title: "Update Successful",
      });
    } catch (error) {
      console.error("Update User Error:", error.response.data);
      if (error.message && error.response.data && error.response.data.error) {
        const errorMessage = error.response.data.error;
        Swal.fire({
          icon: "error",
          title: "Format Error",
          text: errorMessage,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Update User Error",
          text: "An error occurred during update user. Please try again later.",
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
            height: "900px",
            backgroundColor: "#F5F5F5",
          }}
        >
          <div
            className="card"
            style={{ width: 850, height: "auto", backgroundColor: "white" }}
          >
            <div style={{ padding: 30 }}>
              <h5 className="font-weight-bold">My Profile</h5>
              <p>Manage your profile information</p>
              <div style={{ width: 800, border: "1px solid" }}></div>
              <div className="container">
                <div className="row">
                  <div className="col-lg-8 col-md-4 p-3">
                    <div className="p-3 text-white">
                      <form>
                        <div className="form-group">
                          <label htmlFor="username" className="text-dark">
                            Username
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="username"
                            name="username"
                            value={data.username}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="email" className="text-dark">
                            Email
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="phoneNumber" className="text-dark">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            className="form-control"
                            id="phone"
                            name="phone"
                            value={data.phone}
                            onChange={handleChange}
                          />
                        </div>
                        <button
                          type="submit"
                          className="btn mt-5"
                          id="submit"
                          name="submit"
                          onClick={handleSubmitUserData}
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
                  <div className="col-lg-4 p-3">
                    <div className="p-3 d-flex flex-column align-items-center">
                      <img
                        style={{
                          width: 120,
                          height: 120,
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                        src={previewImage || data.image_profile}
                        alt="Profile"
                      />
                      <div className="form-group">
                        <label
                          htmlFor="fileInput"
                          className="upload-btn"
                          style={{
                            color: "#9B9B9B",
                            marginTop: 20,
                          }}
                        >
                          <ModalUploadUserImage/>
                        </label>
                      </div>
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

export default User;

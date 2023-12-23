import React, { useEffect, useState } from "react";
import NavbarLogin from "../../../components/navbarLogin";
import SidebarUser from "../../../components/sidebarUser/sidebarUser";
import axios from "axios";
import Swal from "sweetalert2";

const User = () => {
  const userId = localStorage.getItem("userId");
  const [data, setData] = useState({
    username: "",
    email: "",
    phone: "",
    image_profile: null,
  });
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (userId) {
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
    }
  }, [userId]);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setData({
      ...data,
      image_profile: selectedFile,
    });

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };

    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    } else {
      setPreviewImage("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("username", data.username);
    formDataToSend.append("email", data.email);
    formDataToSend.append("phone", data.phone);
    formDataToSend.append("image_profile", data.image_profile);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_REACT_APP_API_URL}/user/${userId}`,
        formDataToSend
      );
      Swal.fire({
        icon: "success",
        title: "Update Successful",
      });
      console.log("Update successful", response);
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
                          <label htmlFor="storeName" className="text-dark">
                            Username
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="storeName"
                            name="username"
                            placeholder="Enter Username"
                            onChange={handleChange}
                            value={data.username}
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
                            placeholder="Enter email"
                            onChange={handleChange}
                            value={data.email}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="phoneNumber" className="text-dark">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            className="form-control"
                            id="phoneNumber"
                            name="phone"
                            placeholder="Enter phone number"
                            onChange={handleChange}
                            value={data.phone}
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
                          className="btn"
                          style={{
                            width: "140px",
                            border: "1px solid",
                            borderRadius: 25,
                            color: "#9B9B9B",
                            marginTop: 20,
                          }}
                        >
                          Select image
                          <input
                            type="file"
                            id="fileInput"
                            className="form-control-file file"
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                          />
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

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiLogOut, BiCart } from "react-icons/bi";
import { MdAccountBox } from "react-icons/md";
import { FaRegAddressBook } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import Swal from "sweetalert2";
import axios from "axios";

const SidebarUser = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [data, setData] = useState({
    username: "",
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
          console.error("error fetching data:", error);
        });
    }
  }, [userId]);

  const handleLogout = () => {
    Swal.fire({
      title: "Are You Sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        navigate("/");
      }
    });
  };

  return (
    <div style={{ width: 400, backgroundColor: "white" }}>
      <div className="container" style={{ marginTop: 120, paddingLeft: 100 }}>
        <div className="d-flex">
          <img
            style={{ width: 60, height: 60, borderRadius: "50%" }}
            src={previewImage || data.image_profile}
            alt="Profile"
          />
          <div style={{ width: 120, height: 52, margin: 10 }}>
            <h6>{data.username}</h6>
          </div>
        </div>
        <div className="d-flex align-items-center" style={{ marginTop: 74 }}>
          <i
            className="bi bi-house-door mr-3"
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              backgroundColor: "#456BF3",
              color: "white",
              textAlign: "center",
              padding: 3,
            }}
          >
            <MdAccountBox />
          </i>
          <Link
            style={{ color: "inherit", textDecoration: "none" }}
            to={`/profile/${userId}`}
          >
            <h6>My account</h6>
          </Link>
        </div>
        <div className="d-flex align-items-center mt-3">
          <i
            className="bi bi-box mr-3"
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              backgroundColor: "#3D4044",
              color: "white",
              textAlign: "center",
              padding: 3,
            }}
          >
            <RiLockPasswordLine />
          </i>
          <Link
            style={{ color: "inherit", textDecoration: "none" }}
            to={`/profile/user/change-password`}
          >
            <h6>Change Password</h6>
          </Link>
        </div>
        <div className="d-flex align-items-center mt-3">
          <i
            className="bi bi-box mr-3"
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              backgroundColor: "#F36F45",
              color: "white",
              textAlign: "center",
              padding: 3,
            }}
          >
            <FaRegAddressBook />
          </i>
          <Link
            style={{ color: "inherit", textDecoration: "none" }}
            to={`/profile/user/shipping-address`}
          >
            <h6>Shipping Address</h6>
          </Link>
        </div>
        <div className="d-flex align-items-center mt-3">
          <i
            className="bi bi-cart mr-3"
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              backgroundColor: "#F3456F",
              color: "white",
              textAlign: "center",
              padding: 3,
            }}
          >
            <BiCart />
          </i>
          
          <Link
            style={{ color: "inherit", textDecoration: "none" }}
            to={`/profile/user/my-order`}
          >
            <h6>My orders</h6>
          </Link>
        </div>
        <div className="d-flex align-items-center mt-3" onClick={handleLogout}>
          <i
            className="bi bi-box-arrow-left mr-3"
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              backgroundColor: "red",
              color: "white",
              textAlign: "center",
              padding: 3,
            }}
          >
            <BiLogOut />
          </i>
          <h6 style={{ color: "red", margin: 0 }}>Log out</h6>
        </div>
      </div>
    </div>
  );
};

export default SidebarUser;

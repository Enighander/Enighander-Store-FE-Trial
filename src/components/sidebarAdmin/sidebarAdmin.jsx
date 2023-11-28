import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { MdAccountBox, MdOutlineCreateNewFolder, MdFeaturedPlayList } from "react-icons/md";
import { FaRegAddressBook } from "react-icons/fa";
import axios from "axios";

const SidebarAdmin = () => {
  const navigate = useNavigate();
  const adminId = localStorage.getItem("adminId");
  const [data, setData] = useState({
    username: "",
  });

  useEffect(() => {
    if (adminId) {
      axios
        .get(`${import.meta.env.VITE_REACT_APP_API_URL}/admin/${adminId}`)
        .then((response) => {
          const adminData = response.data.data[0];
          setData({
            username: adminData.username,
          });
        })
        .catch((error) => {
          console.error("error fetching data:", error);
        });
    }
  }, [adminId]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={{ width: "400px", backgroundColor: "white" }}>
      <div className="container" style={{ marginTop: 120, paddingLeft: 100 }}>
        <div className="d-flex">
          <div style={{ width: 120, height: 52, margin: 10 }}>
            <h6>{data.username}</h6> {/* Replace with user's name */}
          </div>
        </div>
        <div className="d-flex align-items-center" style={{ marginTop: 74 }}>
          <i
            className="bi bi-house-door mr-3"
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              backgroundColor: "#11ABAA",
              color: "white",
              textAlign: "center",
              padding: 3,
            }}
          >
            <MdAccountBox />
          </i>
          <Link
            style={{ color: "inherit", textDecoration: "none" }}
            to={`/profile/${adminId}`}
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
              backgroundColor: "#11ABAA",
              color: "white",
              textAlign: "center",
              padding: 3,
            }}
          >
            <FaRegAddressBook />
          </i>
          <Link
            style={{ color: "inherit", textDecoration: "none" }}
            to={`/profile/admin/order-list`}
          >
            <h6>Order List</h6>
          </Link>
        </div>
        <div className="d-flex align-items-center mt-3">
          <i
            className="bi bi-cart mr-3"
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              backgroundColor: "#11ABAA",
              color: "white",
              textAlign: "center",
              padding: 3,
            }}
          >
            <MdFeaturedPlayList />
          </i>
          <Link
            style={{ color: "inherit", textDecoration: "none" }}
            to={`/profile/admin/product-list`}
          >
            <h6>Product List</h6>
          </Link>
        </div>
        <div className="d-flex align-items-center mt-3">
          <i
            className="bi bi-cart mr-3"
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              backgroundColor: "#11ABAA",
              color: "white",
              textAlign: "center",
              padding: 3,
            }}
          >
            <MdOutlineCreateNewFolder />
          </i>
          <Link
            style={{ color: "inherit", textDecoration: "none" }}
            to={`/profile/admin/create-product`}
          >
            <h6>Create Product</h6>
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

export default SidebarAdmin;

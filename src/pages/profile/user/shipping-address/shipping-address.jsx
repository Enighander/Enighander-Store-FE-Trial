import axios from "axios";
import React, { useEffect, useState } from "react";
import NavbarLogin from "../../../../components/navbarLogin";
import SidebarUser from "../../../../components/sidebarUser/sidebarUser";
import ModalCreate from "../../../../components/modalCreateAddress/modal-create-address";
import ModalUpdate from "../../../../components/modalUpdateAddress/modal-update-address";

const ShippingAddress = () => {
  const userId = localStorage.getItem("userId");
  const [addresses, setAddresses] = useState([]);

  const fetchAddressData = () => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}/address/${userId}`)
      .then((response) => {
        setAddresses(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchAddressData();
  }, [userId]);

  return (
    <>
      <NavbarLogin />
      <div style={{ display: "flex" }}>
        <SidebarUser />
        <div
          id="myProduct"
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
            style={{ width: 850, height: 'auto', backgroundColor: "white" }}
          >
            <div style={{ padding: 30 }}>
              <h5 className="font-weight-bold">Choose another address</h5>
              <p style={{ color: "#9B9B9B" }}>Manage your shipping address</p>
              <div
                style={{
                  width: 800,
                  border: "1px solid",
                  borderColor: "#D4D4D4",
                }}
              ></div>
              <div className="mt-5">
                <ModalCreate />
                {addresses.length > 0 ? (
                  addresses.map((address) => (
                    <div
                      key={address.id}
                      className="addressNew mt-4"
                      style={{
                        maxWidth: "100%",
                        width: "710px",
                        height: "210px",
                        border: "1px solid #009393",
                        borderRadius: "8px",
                        margin: "0 auto",
                        padding: "0",
                      }}
                    >
                      <div className="m-3">
                        <h6>{address.recipient_name}</h6>
                        <span>{address.phone}</span>
                        <p style={{ maxWidth: "100%", height: 58 }}>
                          {address.address_as}, {address.address}, {address.city},{" "}
                          {address.postal_code}
                        </p>
                        <ModalUpdate address={address} onUpdate={fetchAddressData} />
                      </div>
                    </div>
                  ))
                ) : (
                  <div
                    className="addressNew mt-4"
                    style={{
                      maxWidth: "100%",
                      width: "710px",
                      height: "210px",
                      border: "1px solid #DB3022",
                      borderRadius: "8px",
                      margin: "0 auto",
                      padding: "0",
                    }}
                  >
                    <h6 className="m-3">No addresses found.</h6>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShippingAddress;

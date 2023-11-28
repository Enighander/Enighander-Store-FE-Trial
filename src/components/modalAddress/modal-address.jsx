import axios from "axios";
import React, { useEffect, useState } from "react";

const ModalAddress = () => {
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
      <div className="mt-2">
        {addresses.length > 0 ? (
          addresses.map((address) => (
            <div
              key={address.id}
              className="addressNew mt-4"
              style={{
                maxWidth: "100%",
                width: "710px",
                height: "auto",
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
              </div>
            </div>
          ))
        ) : (
          <div
            className="addressNew mt-4"
            style={{
              maxWidth: "100%",
              width: "710px",
              height: "60px",
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
    </>
  );
};

export default ModalAddress;

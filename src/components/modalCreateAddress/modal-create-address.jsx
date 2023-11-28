import axios from "axios";
import React from "react";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";

const ModalCreate = ({ onClose }) => {
  const userId = localStorage.getItem("userId");
  const [show, setShow] = useState(false);
  const [isPrimary, setIsPrimary] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [data, setData] = useState({
    recipient_name: "",
    address_as: "",
    address: "",
    phone: "",
    postal_code: "",
    city: "",
    user_id: userId,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handlePrimaryChange = (e) => {
    setIsPrimary(e.target.checked);
  };

  const handleCreate = async () => {
    try {
      const requestData = {
        ...data,
        is_primary: isPrimary, // Add is_primary flag to data object
      };
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/address/${userId}`,
        requestData
      );
      console.log("Address Create Successfully", response);
      handleClose();
    } catch (error) {
      console.log("error create address:", error);
    }
  };

  return (
    <>
      <div id="address">
        <div
          onClick={handleShow}
          className="addressNew"
          style={{
            maxWidth: "100%",
            width: "710px",
            height: "86px",
            border: "1px dashed #9B9B9B",
            borderRadius: "8px",
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
            margin: "0 auto",
            padding: "0",
          }}
        >
          <h6 style={{ color: "#9B9B9B" }}>New address</h6>
        </div>
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton></Modal.Header>
          <Modal.Title style={{ margin: "0 auto", padding: "0" }}>
            Create New Address
          </Modal.Title>
          <Modal.Body style={{ height: 500 }}>
            <form>
              <div className="form-group">
                <label className="text-secondary" htmlFor="inputAddress">
                  Save address as (ex : home address, office address)
                </label>
                <input
                  type="text"
                  className="form-control "
                  id="inputAddress"
                  placeholder="Home"
                  name="address_as"
                  value={data.address_as}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label className="text-secondary" htmlFor="inputRecipients">
                    Recipient’s name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputRecipients"
                    name="recipient_name"
                    value={data.recipient_name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label className="text-secondary" htmlFor="inputphone">
                    Recipient's telephone number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputphone"
                    name="phone"
                    value={data.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label className="text-secondary" htmlFor="inputAddress">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputAddress"
                    name="address"
                    value={data.address}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label className="text-secondary" htmlFor="inputPostal">
                    Postal code
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputPostal"
                    name="postal_code"
                    value={data.postal_code}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label className="text-secondary" htmlFor="inputCity">
                    City or Subdistrict
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputCity"
                    name="city"
                    value={data.city}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="form-group mt-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="gridCheck"
                    onChange={handlePrimaryChange} // Handle checkbox change
                    checked={isPrimary}
                  />
                  <label
                    className="form-check-label text-secondary"
                    htmlFor="gridCheck"
                  >
                    Make it the primary address
                  </label>
                </div>
              </div>
              <div className="mt-3">
                {isPrimary && (
                  <p style={{ color: "green" }}>
                    This address will be set as the primary address.
                  </p>
                )}
              </div>
            </form>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "20px",
              }}
            >
              <button
                type="submit"
                className="btn"
                style={{
                  width: 160,
                  height: 36,
                  border: "1px solid #009393",
                  color: "#009393",
                  borderRadius: "24px",
                  marginRight: "10px",
                }}
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn"
                style={{
                  width: 160,
                  height: 36,
                  borderRadius: "24px",
                  backgroundColor: "#009393",
                  color: "white",
                }}
                onClick={handleCreate}
              >
                Save
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default ModalCreate;

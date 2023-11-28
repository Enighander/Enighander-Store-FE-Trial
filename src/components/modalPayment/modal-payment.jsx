import axios from "axios";
import React, { useState,useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";

const ModalPayment = ({
  delivery,
  totalCartPrice,
  totalSummaryPrice,
  handleUpdateSelectedOrders,
}) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let totalPayment = totalSummaryPrice.toString();


  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}/bank`)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  let handlePayment = async () => {
    try {
      const selectedBank = data.find((item) => item.checked);
      const userId = localStorage.getItem("userId");
      const paymentData = {
        user_id: userId,
        bank_id: selectedBank.id,
        total_payment: totalPayment,
      };
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/payment`,
        paymentData
      );
      Swal.fire({
        icon: "success",
        title: "payment successful:",
      });
      handleUpdateSelectedOrders();
      handleClose(true);
      console.log("payment successful:", response.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "payment Error:",
      });
      console.error("payment Error:", error);
    }
  };

  const handleBankCheckboxChange = (bankId) => {
    const updatedData = data.map((item) => {
      if (item.id === bankId) {
        return { ...item, checked: !item.checked };
      } else {
        return { ...item, checked: false };
      }
    });
    setData(updatedData);
  };

  return (
    <>
      <div id="address">
        <button className="btn btnBuy mt-4" onClick={handleShow}>
          Select payment
        </button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Payment</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ height: 250 }}>
            <h6>Payment method</h6>
            {data.map((item) => (
              <div
                key={item.id}
                className="mt-3 mb-4"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  height: 38,
                }}
              >
                <div style={{ width: 120 }}>
                  <img
                    src={item.photo_bank}
                    alt="PaymentLogo"
                    style={{
                      marginRight: "15px",
                      height: "20px",
                      width: "60px"
                    }}
                  />
                </div>
                <h6 className="mt-2" style={{ flex: 1 }}>
                  {item.bank_name}
                </h6>
                <input
                  className="check-input"
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => handleBankCheckboxChange(item.id)}
                />
              </div>
            ))}
          </Modal.Body>
          <div className="line" style={{ border: "1px solid #F4F4F4" }}></div>
          <Modal.Body style={{ height: 200 }}>
            <h6 className="font-weight-bold">Shopping summary</h6>
            <div className="row">
              <div className="col" style={{ color: "#9B9B9B" }}>
                Order
              </div>
              <div className="col text-right font-weight-bold mr-1">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(totalCartPrice)}
              </div>
            </div>
            <div className="row mt-3">
              <div className="col" style={{ color: "#9B9B9B" }}>
                Delivery
              </div>
              {delivery.map((item) => (
                <div className="col text-right font-weight-bold mr-1">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(item.delivery_price)}
                </div>
              ))}
            </div>
          </Modal.Body>
          <Modal.Body>
            <div className="row">
              <div className="d-flex justify-content-between align-items-center">
                <div className="wrap">
                  <div className="font-weight-bold">Shopping summary</div>
                  <div className="font-weight-bold text-danger">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(totalSummaryPrice)}
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn"
                  style={{
                    width: 160,
                    height: 36,
                    borderRadius: "24px",
                    backgroundColor: "#DB3022",
                    color: "white",
                  }}
                  onClick={handlePayment}
                >
                  Buy
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default ModalPayment;

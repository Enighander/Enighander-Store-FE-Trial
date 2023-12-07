import React, { useEffect, useState } from "react";
import SidebarAdmin from "../../../../components/sidebarAdmin/sidebarAdmin";
import NavbarLogin from "../../../../components/navbarLogin";
import Swal from "sweetalert2";
import axios from "axios";

const OrderList = () => {
  const adminId = localStorage.getItem("adminId");
  const [data, setData] = useState([]);
  const [paid, setPaid] = useState([]);
  const [processed, setProcessed] = useState([]);
  const [sent, setSent] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [cancel, setCancel] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}/orders/${adminId}`)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [adminId]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}/orders/admin/${adminId}/get%20paid`)
      .then((response) => {
        setPaid(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [adminId]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}/orders/admin/${adminId}/processed`)
      .then((response) => {
        setProcessed(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [adminId]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}/orders/admin/${adminId}/sent`)
      .then((response) => {
        setSent(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [adminId]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}/orders/admin/${adminId}/completed`)
      .then((response) => {
        setCompleted(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [adminId]);


  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}/orders/admin/${adminId}/cancel`)
      .then((response) => {
        setCancel(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [adminId]);


  const handleProcessed = async (id) => {
    const confirmation = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to processed this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes!",
      cancelButtonText: "No, cancel!",
    });
    if (confirmation.isConfirmed) {
      try {
        await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}/orders/${id}/processed`);
        console.log("update successfully");
      } catch (error) {
        console.error("Error update:", error);
      }
    }
  };

  const handleSent = async (id) => {
    const sending = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to sent this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes!",
      cancelButtonText: "No, cancel!",
    });
    if (sending.isConfirmed) {
      try {
        await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}/orders/${id}/sent`);
        console.log("update successfully");
      } catch (error) {
        console.error("Error update:", error);
      }
    }
  };

  return (
    <>
      <NavbarLogin />
      <div style={{ display: "flex" }}>
        <SidebarAdmin />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "1245px",
            height: "1170px",
            backgroundColor: "#F5F5F5",
          }}
          id="myProduct"
        >
          <div
            className="card"
            style={{ width: 850, height: 900, backgroundColor: "white" }}
          >
            {" "}
            <div style={{ padding: 30 }}>
              <h5 className="font-weight-bold">Order List</h5>
              <ul className="nav nav-pills mt-3" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="pills-home-tab"
                    data-toggle="pill"
                    data-target="#pills-home"
                    type="button"
                    role="tab"
                    aria-controls="pills-home"
                    aria-selected="true"
                  >
                    All items
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-paid-tab"
                    data-toggle="pill"
                    data-target="#pills-paid"
                    type="button"
                    role="tab"
                    aria-controls="pills-paid"
                    aria-selected="false"
                  >
                    Get paid
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-prosess-tab"
                    data-toggle="pill"
                    data-target="#pills-prosess"
                    type="button"
                    role="tab"
                    aria-controls="pills-prosess"
                    aria-selected="false"
                  >
                    Processed
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-sent-tab"
                    data-toggle="pill"
                    data-target="#pills-sent"
                    type="button"
                    role="tab"
                    aria-controls="pills-sent"
                    aria-selected="false"
                  >
                    Sent
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-completed-tab"
                    data-toggle="pill"
                    data-target="#pills-completed"
                    type="button"
                    role="tab"
                    aria-controls="pills-completed"
                    aria-selected="false"
                  >
                    Completed
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-cancel-tab"
                    data-toggle="pill"
                    data-target="#pills-cancel"
                    type="button"
                    role="tab"
                    aria-controls="pills-cancel"
                    aria-selected="false"
                  >
                    Order cancel
                  </button>
                </li>
              </ul>
              <div style={{ width: 800, border: "1px solid #D4D4D4" }}></div>
              <div className="tab-content mt-4" id="pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="pills-home"
                  role="tabpanel"
                  aria-labelledby="pills-home-tab"
                >
                  {data.map((item) => (
                    <div
                      className="card border mt-3 p-3"
                      style={{
                        width: 800,
                        height: 180,
                      }}
                      key={item.id}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <img
                          className=" img-fluid mr-3"
                          src={item.image}
                          crossOrigin="anonymous"
                          alt="items"
                          style={{
                            width: "200px",
                            maxHeight: "136px",
                            objectFit: "cover",
                          }}
                        />
                        <div>
                          <h5>{item.name}</h5>
                          <h6>Order Color : {item.order_color}</h6>
                          <h6>Order Quantity : {item.quantity}</h6>
                          <h6>
                            Status Order :{" "}
                            <span className="font-weight-bold text-success">
                              {item.status_orders}
                            </span>{" "}
                          </h6>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-paid"
                  role="tabpanel"
                  aria-labelledby="pills-paid-tab"
                >
                  {paid.map((item) => (
                    <div
                      className="card border mt-3 p-3"
                      style={{
                        width: 800,
                        height: 350,
                      }}
                      key={item.id}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <img
                          className=" img-fluid mr-3"
                          src={item.image}
                          crossOrigin="anonymous"
                          alt="cloth"
                          style={{
                            width: "200px",
                            maxHeight: "136px",
                            objectFit: "cover",
                          }}
                        />
                        <div>
                          <h5>{item.name}</h5>
                          <h6>Order Color : {item.order_color}</h6>
                          <h6>Order Quantity : {item.quantity}</h6>
                          <h6>
                            Status :{" "}
                            <span className="text-success">
                              {item.status_orders}
                            </span>{" "}
                          </h6>
                        </div>
                        <div style={{ marginLeft: "auto" }}>
                          <button
                            className="btn bg-success mr-3"
                            style={{
                              color: "white",
                            }}
                            onClick={() => handleProcessed(item.id)}
                          >
                            <h6>Processed</h6>
                          </button>
                        </div>
                      </div>
                      <div>
                        {" "}
                        <div
                          className="addressNew mt-4"
                          style={{
                            maxWidth: "100%",
                            width: "710px",
                            height: "150px",
                          }}
                        >
                          <div className="m-3">
                            <h6>Recipient Name : {item.recipient_name}</h6>
                            <h6>Phone Number : {item.phone}</h6>
                            <h6 style={{ maxWidth: "100%", height: 58 }}>
                              Address : {item.address_as}, {item.address},{" "}
                              {item.city}, {item.postal_code}
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-prosess"
                  role="tabpanel"
                  aria-labelledby="pills-prosess-tab"
                >
                  {processed.map((item) => (
                    <div
                      className="card border mt-3 p-3"
                      style={{
                        width: 800,
                        height: 180,
                      }}
                      key={item.id}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <img
                          className=" img-fluid mr-3"
                          src={item.image}
                          crossOrigin="anonymous"
                          alt="cloth"
                          style={{
                            width: "200px",
                            maxHeight: "136px",
                            objectFit: "cover",
                          }}
                        />
                        <div>
                          <h5>{item.name}</h5>
                          <h6>Order Color : {item.order_color}</h6>
                          <h6>Order Quantity : {item.quantity}</h6>
                          <h6>
                            Status :{" "}
                            <span className="text-warning">
                              {item.status_orders}
                            </span>{" "}
                          </h6>
                        </div>
                        <div style={{ marginLeft: "auto" }}>
                          <button
                            className="btn bg-warning mr-3"
                            style={{
                              color: "white",
                            }}
                            onClick={() => handleSent(item.id)}
                          >
                            <h6>Sent</h6>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-sent"
                  role="tabpanel"
                  aria-labelledby="pills-sent-tab"
                >
                  {sent.map((item) => (
                    <div
                      className="card border mt-3 p-3"
                      style={{
                        width: 800,
                        height: 180,
                      }}
                      key={item.id}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <img
                          className=" img-fluid mr-3"
                          src={item.image}
                          crossOrigin="anonymous"
                          alt="cloth"
                          style={{
                            width: "200px",
                            maxHeight: "136px",
                            objectFit: "cover",
                          }}
                        />
                        <div>
                          <h5>{item.name}</h5>
                          <h6>Order Color : {item.order_color}</h6>
                          <h6>Order Quantity : {item.quantity}</h6>
                          <h6>
                            Status :{" "}
                            <span className="text-info">
                              {item.status_orders}
                            </span>{" "}
                          </h6>
                        </div>
                        <div style={{ marginLeft: "auto" }}>
                          <button
                            className="btn bg-info mr-3"
                            style={{
                              color: "white",
                            }}
                          >
                            <i class="bi bi-truck" style={{ fontSize: 34 }}></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-completed"
                  role="tabpanel"
                  aria-labelledby="pills-completed-tab"
                >
                  {completed.map((item) => (
                    <div
                      className="card border mt-3 p-3"
                      style={{
                        width: 800,
                        height: 180,
                      }}
                      key={item.id}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <img
                          className=" img-fluid mr-3"
                          src={item.image}
                          crossOrigin="anonymous"
                          alt="cloth"
                          style={{
                            width: "200px",
                            maxHeight: "136px",
                            objectFit: "cover",
                          }}
                        />
                        <div>
                          <h5>{item.name}</h5>
                          <h6>Order Color : {item.order_color}</h6>
                          <h6>Order Quantity : {item.quantity}</h6>
                          <h6>
                            Status :{" "}
                            <span className="text-success">
                              {item.status_orders}
                            </span>{" "}
                          </h6>
                        </div>
                        <div style={{ marginLeft: "auto" }}>
                          <button
                            className="btn bg-success mr-3"
                            style={{
                              color: "white",
                            }}
                          >
                            <i
                              class="bi bi-check-square"
                              style={{ fontSize: 34 }}
                            ></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-cancel"
                  role="tabpanel"
                  aria-labelledby="pills-cancel-tab"
                >
                  {cancel.map((item) => (
                    <div
                      className="card border mt-3 p-3"
                      style={{
                        width: 800,
                        height: 180,
                      }}
                      key={item.id}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <img
                          className=" img-fluid mr-3"
                          src={item.image}
                          crossOrigin="anonymous"
                          alt="cloth"
                          style={{
                            width: "200px",
                            maxHeight: "136px",
                            objectFit: "cover",
                          }}
                        />
                        <div>
                          <h5>{item.name}</h5>
                          <h6>Order Color : {item.order_color}</h6>
                          <h6>Order Quantity : {item.quantity}</h6>
                          <h6>
                            Status :{" "}
                            <span className="text-danger">
                              {item.status_orders}
                            </span>{" "}
                          </h6>
                        </div>
                        <div style={{ marginLeft: "auto" }}>
                          <button
                            className="btn bg-danger mr-3"
                            style={{
                              color: "white",
                            }}
                          >
                            <i
                              class="bi bi-x-square"
                              style={{ fontSize: 34 }}
                            ></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderList;

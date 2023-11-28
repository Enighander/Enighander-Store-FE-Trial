import React, { useState, useEffect } from "react";
import NavbarLogin from "../../../components/navbarLogin";
import ModalAddress from "../../../components/modalAddress/modal-address";
import ModalPayment from "../../../components/modalPayment/modal-payment";
import ModalCreate from "../../../components/modalCreateAddress/modal-create-address";
import axios from "axios";

const Transaction = () => {
  const userId = localStorage.getItem("userId");
  const [orders, setOrders] = useState([]);
  const [address, setAddress] = useState([]);
  const [addressId, setAddressId] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [showModalCreate, setShowModalCreate] = useState(false);

  if (!userId) {
    return <p>Please log in to view your transactions.</p>;
  }

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}/orders/user/${userId}/pending`)
      .then((response) => {
        setOrders(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [userId]);

  const fetchAddressData = () => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}/address/${userId}`)
      .then((response) => {
        const addresses = response.data.data;
        setAddress(addresses); // Set fetched addresses to 'address' state
        if (addresses.length > 0) {
          setAddressId(addresses[0].id); // Set the ID of the first address to 'addressId'
        }
      })
      .catch((error) => {
        console.error("Error Fetching Data:", error);
      });
  };

  useEffect(() => {
    fetchAddressData();
  }, [userId]);

  const [delivery, setDelivery] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}/delivery`)
      .then((response) => {
        setDelivery(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const totalCartPrice = orders.reduce((total, item) => {
    const itemQuantity = item.quantity;
    return total + item.price * itemQuantity;
  }, 0);

  const totalDeliveryPrice = delivery.reduce((total, item) => {
    return total + item.delivery_price;
  }, 0);

  const totalSummaryPrice =
    parseInt(totalCartPrice) + parseInt(totalDeliveryPrice);

  const toggleOrderSelection = (orderId) => {
    setSelectedOrders((prevSelectedOrders) => {
      if (prevSelectedOrders.includes(orderId)) {
        return prevSelectedOrders.filter((id) => id !== orderId);
      } else {
        return [...prevSelectedOrders, orderId];
      }
    });
  };

  const handleUpdateSelectedOrders = async () => {
    try {
      await Promise.all(
        selectedOrders.map(async (orderId) => {
          await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}/orders/${orderId}`,
            {
              address_id: addressId,
            }
          );
        })
      );
      console.log("Update Successfully");
      setSelectedOrders([]);
    } catch (error) {
      console.error("Error Updating Orders:", error);
    }
  };

  const handleToggleModalCreate = () => {
    setShowModalCreate((prev) => !prev);
  };

  const handleCloseModalCreate = () => {
    setShowModalCreate(true);
  };


  return (
    <>
      <NavbarLogin />
      <main id="transaction">
        <div className="container" style={{ margin: 110 }}>
          <h1 className="font-weight-bold">Checkout</h1>
          <h6>Shipping Address</h6>
          {loading ? (
            <p>loading....</p>
          ) : (
            <div className="row">
              <div className="col-md-8">
                <div className="card mt-3 cardKiri">
                  <ModalAddress />
                  <button
                    className="btn address"
                    onClick={handleToggleModalCreate}
                  >
                    Choose another address
                  </button>
                  {showModalCreate && (
                    <ModalCreate
                      onClose={handleCloseModalCreate}
                    />
                  )}

                </div>
                {orders.map((item) => (
                  <div className="card mt-3 cardOrder" key={item.id}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <input
                        className="ml-5"
                        type="checkbox"
                        checked={selectedOrders.includes(item.id)}
                        onChange={() => toggleOrderSelection(item.id)}
                      />
                      <div className="ml-5 wrapImage">
                        <img
                          style={{ width: 70, height: 70, objectFit: "cover" }}
                          src={item.image}
                          alt="Gambar 1"
                        />
                      </div>
                      <div className="row ml-2 wrap ">
                        <div className="font-weight-bold wrapTitle">
                          {item.name}
                        </div>
                        <span className="text-secondary wrapTitle">
                          quantity : {item.quantity}
                        </span>
                      </div>
                      <div
                        className="font-weight-bold mr-3 price"
                        style={{ width: 140 }}
                      >
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }).format(item.price * item.quantity)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-md-4">
                <div className="card cardKanan mt-3 ">
                  <div className="p-3">
                    <h6 className="font-weight-bold">Shopping summary</h6>
                    <div className="row mt-4">
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
                    <div className="row mt-1">
                      <div className="col" style={{ color: "#9B9B9B" }}>
                        Delivery
                      </div>
                      {delivery.map((item) => (
                        <div
                          key={item.id}
                          className="col text-right font-weight-bold mr-1"
                        >
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          }).format(totalDeliveryPrice)}
                        </div>
                      ))}
                    </div>
                    <div className="line mt-3"></div>
                    <div className="row mt-3">
                      <div className="col font-weight-bold">
                        Total Summary Price
                      </div>
                      <div className="col text-right font-weight-bold mr-1 text-danger">
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }).format(totalSummaryPrice)}
                      </div>
                    </div>
                    <ModalPayment
                      totalSummaryPrice={totalSummaryPrice}
                      delivery={delivery}
                      totalCartPrice={totalCartPrice}
                      handleUpdateSelectedOrders={handleUpdateSelectedOrders}
                    />{" "}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Transaction;

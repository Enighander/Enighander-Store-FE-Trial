import React, { useEffect, useState } from "react";
import NavbarLogin from "../../components/navbarLogin";
import axios from "axios";
import { Link } from "react-router-dom";

function Cart() {
  const userId = localStorage.getItem("userId");
  const [orders, setOrders] = useState([]);
  const [itemQuantities, setItemQuantities] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);

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

  const handleDelete = async () => {
    try {
      await Promise.all(
        selectedItems.map((itemId) =>
          axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL}/orders/${itemId}`)
        )
      );
      setOrders(orders.filter((item) => !selectedItems.includes(item.id)));
      setSelectedItems([]);
      console.log("Selected orders deleted successfully");
    } catch (error) {
      console.error("Error deleting selected orders:", error);
    }
  };
  const handleIncrement = (itemId) => {
    setItemQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: (prevQuantities[itemId] || 0) + 1,
    }));
  };

  const handleDecrement = (itemId) => {
    if (itemQuantities[itemId] > 0) {
      setItemQuantities((prevQuantities) => ({
        ...prevQuantities,
        [itemId]: prevQuantities[itemId] - 1,
      }));
    }
  };

  const toggleItemSelection = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const selectAllItems = () => {
    const allItemIds = orders.map((item) => item.id);
    setSelectedItems(allItemIds);
  };

  const totalCartPrice = orders.reduce((total, item) => {
    const itemQuantity = itemQuantities[item.id] || item.quantity;
    return total + item.price * itemQuantity;
  }, 0);

  

  return (
    <>
      <NavbarLogin />
      <main id="cart">  
        <div className="container" style={{paddingBottom:100}}>
          <h1 className="font-weight-bold">My Cart</h1>
          <div className="row">
            <div className="col-md-8">
              <div className="card mt-3 cardKiri">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <input
                    className="form-check-input ml-3 "
                    type="checkbox"
                    onChange={selectAllItems}
                  />{" "}
                  <div className="font-weight-bold ml-5 ">
                    Select all items{" "}
                    <span className="text-secondary">
                      ({selectedItems.length} items selected)
                    </span>
                  </div>
  
                  <button className="text-danger font-weight-bold mr-3 bg-white border-0" onClick={handleDelete}>Delete</button>
      
                </div>
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
                      className="form-check-input ml-3 "
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => toggleItemSelection(item.id)}
                    />
                    <div className="ml-5 wrapImage">
                      <Link>
                      <img
                        style={{ width: 70, height: 70,objectFit:"cover" }}
                        src={item.image}
                        alt="Gambar 1"
                      />
                      </Link>
                    </div>
                    <div className="row ml-2 wrap ">
                      <div className="font-weight-bold wrapTitle">
                        {item.name}
                      </div>
                      <span className="text-secondary wrapTitle">Color: {item.order_color}</span>
                    </div>
                    <div className="input-group wrapInput">
                      <button
                        className="btn btn-outline-secondary btnMinus"
                        onClick={() => handleDecrement(item.id)}
                      >
                        -
                      </button>
                      <input
                        className="input"
                        type="text"
                        value={itemQuantities[item.id] || item.quantity}
                        readOnly
                      />
                      <button
                        className="btn btn-outline-secondary btnPlus"
                        onClick={() => handleIncrement(item.id)}
                      >
                        +
                      </button>
                    </div>
                    <div
                      className="font-weight-bold mr-3 price"
                      style={{ width: 140 }}
                    >
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(
                        item.price * ( item.quantity)
                      )}
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
                    <div className="col">Total price</div>
                    <div className="col text-right font-weight-bold mr-1">
                    {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(totalCartPrice)}
                    </div>
                  </div>
                  <Link to={`/transaction/${userId}`} style={{ color: "inherit", textDecoration: "none" }}>
                  <button className="btn btnBuy mt-4">Buy</button>
                  </Link>
                
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Cart;

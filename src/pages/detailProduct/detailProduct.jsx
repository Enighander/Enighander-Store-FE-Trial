import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import NavbarLogin from "../../components/navbarLogin";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Product = () => {
  const { id } = useParams();
  const userId = localStorage.getItem("userId");
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/products/${id}?_=${Math.random()}`
      )
      .then((response) => {
        setProduct(response.data.data[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error Fetching Data:", error);
        setLoading(false);
      });
  }, [id]);

  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const [data, setData] = useState({
    order_color: "",
    quantity: "",
    user_id: userId,
    product_id: id,
    admin_id: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddCart = async () => {
    try {
      const updatedData = {
        ...data,
        quantity: quantity,
        order_color: product.color,
        admin_id: product.admin_id,
      };
      console.log("Product Data:", updatedData);

      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/orders`,
        updatedData
      );
      toast.success("Item added to the cart successfully");
      console.log("Order created successfully", response);
      // console.log("Product Data:", product );
    } catch (error) {
      console.error("Error Creating Order:", error);
    }
  };

  const handleBuy = async () => {
    try {
      const updatedData = {
        ...data,
        quantity: quantity,
        order_color: product.color,
        admin_id: product.user_id,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/orders`,
        updatedData
      );
      console.log("order created successfully", response);
      console.log("Product Data:", product);
      navigate(`/cart/${id}`, { state: { product: product } });
    } catch (error) {
      console.log("Error creating order:", error);
    }
  };

  return (
    <>
      <ToastContainer position="bottom-right" autoClose={5000} />
      <NavbarLogin />
      <div className="container" style={{ marginTop: 120, marginBottom: 20 }}>
        <div className="row">
          <div className="col-md-6 col-lg-8 wrapRight">
            <h4>{product.name}</h4>
            <div style={{ marginTop: 10 }}>
              <img
                style={{
                  width: "100%",
                  maxHeight: "400px",
                  objectFit: "contain",
                }}
                src={product.image}
                alt="Product Image"
              />
            </div>
            <div style={{ marginTop: 10 }}>
              <h6>Price</h6>
              <h5 style={{ fontWeight: "bold" }}>
                {" "}
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(product.price)}
              </h5>
            </div>
            <div style={{ marginTop: 10 }}>
              <h6>Color</h6>
              <div className="wrapColor">
                <div className="colorText">{product.color}</div>
              </div>
            </div>
            <div className="d-flex" style={{ marginTop: 10 }}>
              <h6>Quantity</h6>
            </div>
            <div className="d-flex">
              <div className="input-group">
                <button
                  onClick={handleDecrement}
                  className="btn btn-outline-secondary"
                >
                  -
                </button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  style={{
                    width: 50,
                    margin: "0 5px",
                    textAlign: "center",
                    border: "none",
                  }}
                />
                <button
                  onClick={handleIncrement}
                  className="btn btn-outline-secondary"
                >
                  +
                </button>
              </div>
            </div>
            <div className="d-flex wrapButton" style={{ marginTop: 10 }}>
              <Link style={{ color: "inherit", textDecoration: "none" }}>
                <button
                  type="button"
                  className="btn rounded-pill buy"
                  onClick={handleBuy}
                >
                  <h6 className="login">Buy Now</h6>
                </button>
              <button
                type="button"
                className="btn rounded-pill bag"
                onClick={handleAddCart}
              >
                <h6 className="login">Add To Cart</h6>
              </button>
              </Link>
            </div>
          </div>

          <div className="col-md-12">
            <h4 style={{ marginTop: 20 }}>Product Information</h4>
            <h6 style={{ marginTop: 10 }}>Description</h6>
            <p style={{ textAlign: "justify" }}>{product.description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;

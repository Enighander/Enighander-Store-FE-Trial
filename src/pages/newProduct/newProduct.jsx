import React, { useEffect, useState } from "react";
import NavbarLogin from "../../components/navbarLogin";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}/products?sort=DESC`)
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.error("Error Fetching Data:", error);
      });
  }, []);

  const handleProductClick = (productId) => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      navigate(`/products/${productId}`);
    }
  };

  return (
    <>
      <NavbarLogin />
      <div className="container">
        <div className="title" style={{ marginTop: 100, marginBottom: 30 }}>
          <h1 style={{ fontWeight: "bold" }}>New Product</h1>
          <span style={{}}>The New Products Was Coming This Week</span>
        </div>
        <div className="row">
          {products.map((item) => (
            <div
              className="card col-md-3"
              key={item.id}
              style={{ margin: "5px" }}
            >
              <div
                className="border rounded product"
                onClick={() => handleProductClick(item.id)}
              >
                <img
                  className="img-fluid"
                  src={item.image}
                  crossOrigin="anonymous"
                  alt="product"
                  style={{
                    width: "100%",
                    objectFit: "cover",
                  }}
                />
                <div className="p-2">
                  <div className="card-body">
                    <h5 className="card-title mt-2" style={{ height: 70 }}>
                      {item.name}
                    </h5>
                    <h5 className="mt-2">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(item.price)}
                    </h5>
                    <h6>Color : {item.color}</h6>
                    <div>
                      <h7>Description: {item.description}</h7>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NewProduct;

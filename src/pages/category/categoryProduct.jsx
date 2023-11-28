import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarLogin from "../../components/navbarLogin";
import Navbar from "../../components/navbar/navbar";

const CategoryProduct = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]); // Use an array to store multiple products
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/products/categories/${id}`
      )
      .then((response) => {
        setProducts(response.data.data); // Assuming the API returns an array
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [id]);

  const handleProductClick = (productId) => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      navigate(`/products/${productId}`);
    }
  };

  const [showNavbarLogin, setShowNavbarLogin] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem("token");
    if (userToken) {
      setShowNavbarLogin(true);
    } else {
      setShowNavbarLogin(false);
    }
  }, []);

  // Define the number of products to display in each row
  const productsPerRow = 3; // You can adjust this as needed

  // Define a fixed height for the product images
  const fixedImageHeight = "200px"; // Adjust the height as needed

  return (
    <>
      {showNavbarLogin ? <NavbarLogin /> : <Navbar />}
      <div className="container">
        <div className="title" style={{ marginTop: 110, marginBottom: 30 }}>
          <h1 style={{ fontWeight: "bold" }}>Categories</h1>
          <section style={{ color: "#9B9B9B" }}>Our Product List</section>
          <div className="row">
            {products.map((product, index) => (
              <div
                className="card col-md-4" // Use "col-md-4" to create 3 cards per row on medium-sized screens
                key={product.id}
                onClick={() => handleProductClick(product.id)}
              >
                <img
                  className="card-img-top"
                  src={product.image}
                  alt={product.name}
                />
                <div className="card-body">
                  <h4 className="card-title">{product.name}</h4>
                  <p className="card-price">
                    {" "}
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(product.price)}
                  </p>
                  <p className="card-description">{product.description}</p>
                  <p className="card-color">Color Series: {product.color}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryProduct;

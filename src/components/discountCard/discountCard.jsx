import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../assets/css/style.css";
import axios from "axios";
import { SlArrowRight } from "react-icons/sl";

const DiscountCard = () => {
  const [products, setProduct] = useState([]);
  const [currentPage] = useState(1);
  const itemsPerPage = 6;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_REACT_APP_API_URL
          }/products?sort=ASC&page=${currentPage}&limit=${itemsPerPage}`
        );
        if (response.data && Array.isArray(response.data.data)) {
          setProduct(response.data.data);
        } else {
          console.error(
            "API response is not in the expected format:",
            response.data
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [currentPage, itemsPerPage]);

  const handleProductClick = (productId) => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      navigate(`/products/${productId}`);
    }
  };

  return (
    <main id="discount">
      <div className="container">
        <div className="title">
          <h1 style={{ fontWeight: "bold" }}>Discount Product</h1>
          <section className="subtitle">Our Product List</section>
        </div>
        <div className="product-container">
          {isLoading ? (
            <div className="centered-spinner">
              <div className="lds-roller">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          ) : (
            products.map((product) => (
              <div
                className="card"
                style={{ width: "300px", margin: "5px" }}
                key={product.id}
              >
                <img
                  className="card-img-top"
                  src={product.image}
                  alt={product.name}
                  onClick={() => handleProductClick(product.id)}
                />
                <div className="card-body">
                  <h4 className="card-title">{product.name}</h4>
                  <p className="card-description">{product.description}</p>
                  <p className="card-price">
                    {" "}
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(product.price)}
                  </p>
                  <p className="card-color">Color Series: {product.color}</p>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="see-all-button">
          <Link to={`/discount-product`}>
            <button type="button" className="btn rounded-pill">
              <h6>
                <SlArrowRight /> see all
              </h6>
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default DiscountCard;

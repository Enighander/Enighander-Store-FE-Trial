import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../assets/css/style.css";
import axios from "axios";
import { SlArrowRight } from "react-icons/sl";
// import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";

const DiscountCard = () => {
  const [products, setProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 8;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_REACT_APP_API_URL
        }/products?sort=ASC&page=${currentPage}&limit=${itemsPerPage}`
      )
      .then((response) => {
        if (response.data && Array.isArray(response.data.data)) {
          setProduct(response.data.data);
          setTotalPages(response.data.pagination.totalPages);
        } else {
          console.error(
            "API response is not in the expected format:",
            response.data
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [currentPage]);

  const handleProductClick = (productId) => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      navigate(`/products/${productId}`);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={i === currentPage ? "active" : ""}
          >
            {i}
          </button>
        );
      }
    } else {
      // Display "1, 2, 3, 4, ..." when there are many pages
      for (let i = 1; i <= 4; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={i === currentPage ? "active" : ""}
          >
            {i}
          </button>
        );
      }
      pageNumbers.push(<span key="ellipsis">...</span>);
      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => setCurrentPage(totalPages)}
          className={totalPages === currentPage ? "active" : ""}
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <main id="discount">
      <div className="container">
        <div className="title">
          <h1 style={{ fontWeight: "bold" }}>Discount Product</h1>
          <section className="subtitle">Our Product List</section>
        </div>
        <div className="product-container">
          {products.map((product) => (
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
          ))}
        </div>
        {/* <div>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          <GrLinkPrevious />
        </button>
        {renderPageNumbers()}
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          <GrLinkNext />
        </button>
      </div> */}
        <div className="see-all-button">
          <Link to={`/discount-product`}>
            <button type="button" className="btn rounded-pill">
              <h6><SlArrowRight /> see all</h6>
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default DiscountCard;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./category.css";

const CategoryComponent = () => {
  const [dataCategory, setDataCategory] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}/categories`)
      .then((response) => {
        setDataCategory(response.data.data);
      })
      .catch((error) => {
        console.error("error fetching data:", error);
      });
  }, []);

  return (
    <main id="category-main">
      <div className="container">
        <div className="title" style={{ marginTop: 30, marginBottom: 30 }}>
          <h1 style={{ fontWeight: "bold" }}>Category</h1>
          <section style={{ color: "#9B9B9B" }}>
            What are you currently looking for
          </section>
        </div>
        <div className="category-grid">
          {dataCategory.map((item) => (
            <div className="category-item" key={item.id}>
              <Link to={`/products/categories/${item.id}`}>
                <img
                  className="img"
                  src={item.image}
                  alt={`Category ${item.id}`}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default CategoryComponent;
import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar.jsx";
import NavbarLogin from "../../components/navbarLogin/index.jsx";
import CarouselComponent from "../../components/carousel/carousel.jsx";
import CategoryComponent from "../../components/category/category.jsx";
import CardComponent from "../../components/card/card.jsx";
import DiscountCard from "../../components/discountCard/discountCard.jsx";

const Home = () => {
  const [showNavbarLogin, setShowNavbarLogin] = useState(false);

  useEffect(() => {
    const usersToken = localStorage.getItem("token");
    if (usersToken) {
      setShowNavbarLogin(true);
    } else {
      setShowNavbarLogin(false);
    }
  }, []);

  return (
    <div>
      {showNavbarLogin ? <NavbarLogin /> : <Navbar />}
      <div className="container" style={{ marginTop: 100 }}>
        <CarouselComponent />
        <CategoryComponent />
        <CardComponent />
        <DiscountCard />
      </div>
    </div>
  );
};

export default Home;
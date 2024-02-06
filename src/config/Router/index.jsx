import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "../../pages/home/Home.jsx";
import Register from "../../pages/auth/register.jsx";
import Login from "../../pages/auth/login.jsx";
import NewProduct from "../../pages/newProduct/newProduct.jsx";
import Cart from "../../pages/cart/cart.jsx";
import Product from "../../pages/detailProduct/detailProduct.jsx";
import Profile from "../../pages/profile/profile.jsx";
import User from "../../pages/profile/user/user.jsx";
import Category from "../../pages/category/categoryProduct.jsx";
import AdminLogin from "../../pages/auth/adminLogin.jsx";
import Admin from "../../pages/profile/admin/admin.jsx";
import CreateProduct from "../../pages/profile/admin/create-product/create-product.jsx";
import Transaction from "../../pages/cart/transaction/transaction.jsx";
import ShippingAddress from "../../pages/profile/user/shipping-address/shipping-address.jsx";
import ProductList from "../../pages/profile/admin/product-list/product-list.jsx";
import UpdateProduct from "../../pages/profile/admin/product-list/update-product/update-product.jsx";
import OrderList from "../../pages/profile/admin/order-list/order-list.jsx";
import MyOrderUser from "../../pages/profile/user/my-order-user/my-order-user.jsx";
import DiscountProduct from "../../pages/discountProduct/discountProduct.jsx";
import ChangePassword from "../../pages/profile/user/change-password/change-password.jsx";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace="true" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/new-product" element={<NewProduct />} />
          <Route path="/discount-product" element={<DiscountProduct />} />
          <Route path="/cart/:id" element={<Cart />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/products/categories/:id" element={<Category />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/transaction/:id" element={<Transaction />} />
          {/* ADMIN */}
          <Route path="/profile/admin/:id" element={<Admin />}/>
          <Route path="/profile/admin/create-product" element={<CreateProduct />} />
          <Route path="/profile/admin/product-list" element={<ProductList/>} />
          <Route path="/profile/admin/update-product/:id" element={<UpdateProduct/>} />
          <Route path="/profile/admin/order-list" element={<OrderList/>} />
          {/* USER */}
          <Route path="/profile/user/:id" element={<User />} />
          <Route path="/profile/user/shipping-address" element={<ShippingAddress />} />
          <Route path="/profile/user/my-order" element={<MyOrderUser />} />
          <Route path="/profile/user/change-password" element={<ChangePassword/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;

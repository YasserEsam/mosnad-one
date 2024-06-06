import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/CartContext"; // Import the CartProvider
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import NoPage from "./pages/NoPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProductSinglePage from "./pages/ProductSinglePage";
import ShoppingCart from "./pages/ShoppingCart"; // Import the ShoppingCart component
import AllProducts from "./pages/AllProducts";
import AddProduct from "./pages/AddProduct";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider> {/* Wrap the entire application with CartProvider */}
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="product/:id" element={<ProductSinglePage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/AllProducts" element={<AllProducts />} />
            <Route path="/AddProduct" element={<AddProduct />} />
            <Route path="shopping-cart" element={<ShoppingCart />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);

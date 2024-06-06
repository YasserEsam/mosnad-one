import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import cart from "../assets/cart.png";
import menuBurger from "../assets/menu.png";
import "./Layout.css"; // Import the CSS file

const Layout = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 800);
      if (window.innerWidth > 800) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="header">
        <div className="container">
          <div className="navbar">
            <div className="logo">
              <h2>Logo</h2>
            </div>
            <nav>
              <ul
                id="menuitems"
                style={{ maxHeight: menuOpen || !isMobile ? "none" : "0px" }}
              >
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/AllProducts">All Products</Link>
                </li>
                <li>
                  <Link to="/AddProduct">Add Product</Link>
                </li>
              </ul>
            </nav>
            <Link to="/shopping-cart">
              <img src={cart} alt="cart" width="30px" height="30px" />
            </Link>
            {isMobile && (
              <img
                src={menuBurger}
                className="menu-icon"
                alt="menu"
                onClick={toggleMenu}
              />
            )}
          </div>
        </div>
      </div>

      <Outlet />
    </>
  );
};

export default Layout;

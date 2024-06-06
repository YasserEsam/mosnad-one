// ShoppingCart.js

import React, { useEffect } from "react";
import { useCart } from "../context/CartContext";
import "./ShoppingCart.css";
import { Link } from "react-router-dom";

const ShoppingCart = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getTotalItems,
    getTotalPrice,
  } = useCart();

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    updateQuantity(productId, newQuantity);
  };

  return (
    <div className="shopping-cart">
      <h2>Shopping Cart</h2>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img
              src={item.product.images[0]}
              alt={item.product.title}
              className="product-image-cart"
            />
            <div className="item-details">
              <h3 className="product-name">{item.product.title}</h3>
              <p className="product-price">${item.product.price.toFixed(2)}</p>
              <div className="quantity-control">
                <label htmlFor={`quantity-${item.id}`}>Quantity:</label>
                <input
                  id={`quantity-${item.id}`}
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleUpdateQuantity(item.id, parseInt(e.target.value))
                  }
                  min={1}
                />
              </div>
              <button
                className="remove-button"
                onClick={() => handleRemoveFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <p>Total Items: {getTotalItems()}</p>
        <p>Total Price: ${getTotalPrice().toFixed(2)}</p>
        <button className="checkout-button">
          <Link to="/checkout">Checkout</Link>
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;

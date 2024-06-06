// CheckoutPage.js

import  { useState } from 'react';
import { useCart } from '../context/CartContext';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const { cartItems, getTotalPrice } = useCart();

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    name: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    alert('Your order has been placed successfully!');
    console.log('Form submitted:', paymentInfo);

    setPaymentInfo({
      cardNumber: '',
      expirationDate: '',
      cvv: '',
      name: '',
      address: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPaymentInfo({ ...paymentInfo, [name]: value });
  };

  const validateForm = () => {
    const { cardNumber, expirationDate, cvv } = paymentInfo;

    const cardNumberRegex = /^[0-9]{16}$/;
    const expirationDateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;
    const cvvRegex = /^[0-9]{3,4}$/;

    let validationErrors = {};

    if (!cardNumberRegex.test(cardNumber)) {
      validationErrors.cardNumber = 'Invalid card number. It must be 16 digits.';
    }

    if (!expirationDateRegex.test(expirationDate)) {
      validationErrors.expirationDate = 'Invalid expiration date. Format should be MM/YY.';
    }

    if (!cvvRegex.test(cvv)) {
      validationErrors.cvv = 'Invalid CVV. It must be 3 or 4 digits.';
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  return (
    <div className="checkout-page">
      <div className="cart-summary">
        <h3>Cart Summary</h3>
        <table className="checkout-table">
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id} className="cart-item">
                <td>{item.product.title}</td>
                <td>${item.product.price.toFixed(2)}</td>
                <td>Quantity: {item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="total">
          <p><strong>Total Price:</strong> ${getTotalPrice().toFixed(2)}</p>
        </div>
      </div>

      <form className="checkout-form" onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <table className="checkout-table">
          <tbody>
            <tr>
              <th colSpan="2">Payment Information</th>
            </tr>
            <tr className="form-group">
              <td>Card Number:</td>
              <td>
                <input
                  type="text"
                  name="cardNumber"
                  value={paymentInfo.cardNumber}
                  onChange={handleChange}
                  placeholder="16-digit card number"
                  required
                />
                {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
              </td>
            </tr>
            <tr className="form-group">
              <td>Expiration Date (MM/YY):</td>
              <td>
                <input
                  type="text"
                  name="expirationDate"
                  value={paymentInfo.expirationDate}
                  onChange={handleChange}
                  placeholder="MM/YY"
                  required
                />
                {errors.expirationDate && <span className="error-message">{errors.expirationDate}</span>}
              </td>
            </tr>
            <tr className="form-group">
              <td>CVV:</td>
              <td>
                <input
                  type="text"
                  name="cvv"
                  value={paymentInfo.cvv}
                  onChange={handleChange}
                  placeholder="3 or 4-digit CVV"
                  required
                />
                {errors.cvv && <span className="error-message">{errors.cvv}</span>}
              </td>
            </tr>
            <tr>
              <th colSpan="2">Shipping Address</th>
            </tr>
            <tr className="form-group">
              <td>Name:</td>
              <td>
                <input
                  type="text"
                  name="name"
                  value={paymentInfo.name}
                  onChange={handleChange}
                  placeholder="Full name"
                  required
                />
              </td>
            </tr>
            <tr className="form-group">
              <td>Address:</td>
              <td>
                <input
                  type="text"
                  name="address"
                  value={paymentInfo.address}
                  onChange={handleChange}
                  placeholder="Street address"
                  required
                />
              </td>
            </tr>
            <tr className="form-group">
              <td>City:</td>
              <td>
                <input
                  type="text"
                  name="city"
                  value={paymentInfo.city}
                  onChange={handleChange}
                  placeholder="City"
                  required
                />
              </td>
            </tr>
            <tr className="form-group">
              <td>State:</td>
              <td>
                <input
                  type="text"
                  name="state"
                  value={paymentInfo.state}
                  onChange={handleChange}
                  placeholder="State"
                  required
                />
              </td>
            </tr>
            <tr className="form-group">
              <td>Postal Code:</td>
              <td>
                <input
                  type="text"
                  name="postalCode"
                  value={paymentInfo.postalCode}
                  onChange={handleChange}
                  placeholder="Postal code"
                  required
                />
              </td>
            </tr>
            <tr className="form-group">
              <td>Country:</td>
              <td>
                <input
                  type="text"
                  name="country"
                  value={paymentInfo.country}
                  onChange={handleChange}
                  placeholder="Country"
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button className="button" type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default CheckoutPage;

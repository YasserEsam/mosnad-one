import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Product.css';

const Product = ({ product }) => {
  const {
    id,
    images,
    title,
    price,
    rating,
    discountPercentage,
  } = product;



  return (
    <div className="card">
      <img src={images[0]} alt={title} className="product-image" />
      <div className="card-details">
        <h2 className="product-name">{title}</h2>
        <h3 className="product-price">${price.toFixed(2)}</h3>
        <p className="product-rating">Rating: {rating}</p>
        <p className="product-discount">Discount: {discountPercentage}%</p>
        <Link style={{display:"block"}} to={`/product/${id}`} className="view-details-button">View Details</Link>
      </div>
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    discountPercentage: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default Product;

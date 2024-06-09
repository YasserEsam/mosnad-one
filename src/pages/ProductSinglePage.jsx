import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext"; // Import the CartContext
import "./ProductSinglePage.css";

const ProductSinglePage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const { addToCart } = useCart(); // Get addToCart function from CartContext

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-details">
      <ProductImages images={product.images} title={product.title} />
      <ProductInfo product={product} addToCart={addToCart} />
    </div>
  );
};

const ProductImages = ({ images, title }) => (
  <div className="product-images">
    {images.map((image, index) => (
      <img key={index} src={image} alt={title} />
    ))}
  </div>
);

const ProductInfo = ({ product, addToCart }) => {
  const {
    title,
    price,
    category,
    rating,
    discountPercentage,
    description,
  } = product;

  const handleAddToCart = () => {
    addToCart(product, 1);
    alert("Successfully Added");
  };

  return (
    <div className="product-info">
      <h2 className="product-name">{title}</h2>
      <h3 className="product-price">${price.toFixed(2)}</h3>
      <p className="product-category">Category: {category}</p>
      <p className="product-rating">Rating: {rating}</p>
      <p className="product-discount">Discount: {discountPercentage}%</p>
      <p className="product-description">{description}</p>
      <button className="add-to-cart-button" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductSinglePage;

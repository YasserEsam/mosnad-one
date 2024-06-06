import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./AddProduct.css";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  price: yup.number().required("Price is required").positive("Price must be positive"),
  description: yup.string().required("Description is required"),
  mainImage: yup.mixed().required("Main image is required"),
});

const AddProduct = () => {
  const [createdProduct, setCreatedProduct] = useState(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("mainImage", data.mainImage[0]);

    const imageUrl = URL.createObjectURL(data.mainImage[0]);

    const response = await fetch("https://dummyjson.com/products/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: data.title,
        price: data.price,
        description: data.description,
        images: [imageUrl],
      }),
    });
    const result = await response.json();
    setCreatedProduct(result);
    alert('Product added successfully!');
    reset();
  };

  return (
    <div className="add-product-page">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="product-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input id="title" type="text" {...register("title")} />
          {errors.title && <p className="error">{errors.title.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input id="price" type="number" {...register("price")} />
          {errors.price && <p className="error">{errors.price.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea id="description" {...register("description")} />
          {errors.description && <p className="error">{errors.description.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="mainImage">Main Image</label>
          <input id="mainImage" type="file" {...register("mainImage")} />
          {errors.mainImage && <p className="error">{errors.mainImage.message}</p>}
        </div>

        <button type="submit" className="submit-button">Add Product</button>
      </form>

      {createdProduct && (
        <div className="created-product">
          <h3>Product Created Successfully:</h3>
          <pre>{JSON.stringify(createdProduct, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default AddProduct;

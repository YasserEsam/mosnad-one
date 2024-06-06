// import React, { useEffect, useState } from "react";
// import Product from "../components/Product";
// import "./Home.css";

// const Home = () => {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState("");

//   useEffect(() => {
//     fetch("https://dummyjson.com/products")
//       .then((response) => response.json())
//       .then((data) => {
//         setProducts(data.products);
//         setFilteredProducts(data.products);
//       })
//       .catch((error) => console.error("Error fetching product data:", error));
//   }, []);

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//     filterProducts(event.target.value, categoryFilter);
//   };

//   const handleCategoryFilter = (event) => {
//     setCategoryFilter(event.target.value);
//     filterProducts(searchTerm, event.target.value);
//   };

//   const filterProducts = (searchTerm, categoryFilter) => {
//     let filtered = products;
//     if (searchTerm) {
//       filtered = filtered.filter((product) =>
//         product.title.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
//     if (categoryFilter) {
//       filtered = filtered.filter(
//         (product) =>
//           product.category.toLowerCase() === categoryFilter.toLowerCase()
//       );
//     }
//     setFilteredProducts(filtered);
//   };

//   return (
//     <>
//       <div style={{ textAlign: "center" }} className="landingPage">
//         <h2>MakeUp Product API</h2>
//         <p>This Website has been build in Mosnad Company <br />For React Js Developement Job</p>
//       </div>

//       <h2 className="SectionTitle">Latest Products</h2>

    
//         <div className="filters">
//           <input
//             type="text"
//             placeholder="Search by title"
//             value={searchTerm}
//             onChange={handleSearch}
//           />
//           <select value={categoryFilter} onChange={handleCategoryFilter}>
//             <option value="">Filter by category</option>
//             <option value="beauty">Beauty</option>
//             <option value="fragrances">fragrances</option>
//             <option value="furniture">furniture</option>
//           </select>
//         </div>

//       <div className="product-list">
//         {filteredProducts.map((product) => (
//           <Product key={product.id} product={product} />
//         ))}
//       </div>
//     </>
//   );
// };

// export default Home;


import React, { useEffect, useState } from "react";
import Product from "../components/Product";
import "./Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=8")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
      })
      .catch((error) => console.error("Error fetching product data:", error));
  }, []);

  return (
    <>
      <div style={{ textAlign: "center" }} className="landingPage">
        <h2>MakeUp Product API</h2>
        <p>This Website has been built in Mosnad Company <br />For React JS Development Job</p>
      </div>

      <h2 className="SectionTitle">Latest Products</h2>

      <div className="product-list">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Products = ({ socket }) => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleBidBtn = (product) =>
    navigate(`/products/bid/${product.name}/${product.price}`);

  const removeBidBtn = (product) => {
    const username = localStorage.getItem("userName");
    socket.emit("removeProduct", {
      name: product.name,
      user: username,
    });
  };

  // location.reload();

  useEffect(() => {
    const fetchProducts = () => {
      fetch(`${process.env.LOCALHOST}:${process.env.PORT}/api`)
        .then((res) => res.json())
        .then((data) => {
          setProducts(data.products);
          setLoading(false);
        })
        .catch((err) => {
          console.log("Doing nothing", err);
        });
    };
    fetchProducts();
  }, [products]);

  return (
    <div>
      <div className="table__container">
        <Link to="/products/add" className="products__cta">
          ADD PRODUCTS
        </Link>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Last Bidder</th>
              <th>Creator</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td>Loading</td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={`${product.name}${product.price}`}>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.last_bidder || "None"}</td>
                  <td>{product.owner}</td>
                  <td>
                    <button onClick={() => handleBidBtn(product)}>Edit</button>
                    <button onClick={() => removeBidBtn(product)}>X</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;

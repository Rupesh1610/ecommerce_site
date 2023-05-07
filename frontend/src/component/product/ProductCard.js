import React from "react";
import { NavLink } from "react-router-dom";
// import ReactStars from "react-rating-stars-component";
import "./productCard.css";
import StarIcon from "@mui/icons-material/Star";

const Product = ({ product }) => {
  // const options = {
  //   edit: false,
  //   color: "rgba(20, 20, 20, 0.1)",
  //   activeColor: "green",
  //   size: window.innerWidth < 600 ? 20 : 25,
  //   value: product.avgRating,
  //   isHalf: true,
  // };
  return (
    <NavLink
      key={product._id}
      className="product_card"
      to={`/product/${product._id}`}
    >
      <img src={product.image[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        {/* <ReactStars {...options} /> */}
        <div className="rating">
          {product.avgRating}
          <StarIcon sx={{ color: "white" }} />
        </div>
        {/* <span> {product.numOfReviews}</span> */}
      </div>
      <span>₹{product.price}</span>
    </NavLink>
  );
};

export default Product;

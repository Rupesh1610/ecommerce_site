import React, { Fragment, useEffect, useState } from "react";
import { fetchProductDetails } from "../../redux/product/productDetailSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../layout/loader/Loading";
import "./productDetails.css";
import ProductImageSlide from "./ProductImageSlide";
import StarIcon from "@mui/icons-material/Star";
import ReviewCard from "./ReviewCard";

const ProductDetails = () => {
  const [productQuantity, setProductQuantity] = useState(1);
  const dispatch = useDispatch();
  const params = useParams();
  const productId = params.id;

  const handleSub = () => {
    if (productQuantity > 1) setProductQuantity(productQuantity - 1);
  };
  const handleAdd = () => {
    setProductQuantity(productQuantity + 1);
  };

  const { status, productDetails, error } = useSelector(
    (state) => state.productDetails
  );

  const {
    name,
    description,
    price,
    avgRating,
    numOfReviews,
    image,
    stock,
    reviews,
  } = productDetails;

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    dispatch(fetchProductDetails(productId));
  }, [dispatch, productId, error]);
  return (
    <>
      {status === "loading" ? (
        <Fragment>
          <Loading />
        </Fragment>
      ) : (
        <Fragment>
          <div className="product_details">
            <div className="slider">
              <ProductImageSlide image={image} />
            </div>
            <div>
              <div className="detailsBlock-1">
                <h2>{name}</h2>
                {/* <p>Product # {_id}</p> */}
              </div>
              <div className="detailsBlock-2">
                {/* <ReactStars {...options} /> */}
                {avgRating}
                <StarIcon color="success" />
                <span> ({numOfReviews} reviews)</span>
              </div>
              <div className="detailsBlock-3">
                <h1>₹{price}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <p onClick={handleSub}>-</p>
                    <button>{productQuantity}</button>
                    <p onClick={handleAdd}>+</p>
                  </div>
                  <button className="addToCart">Add to cart</button>
                </div>
                <p>
                  Status:
                  <b className={stock < 1 ? "redColor" : "greenColor"}>
                    {stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>
              <div className="detailsBlock-4">
                Description: <p>{description}</p>
              </div>
              <button className="submitReview">Submit Review</button>
            </div>
          </div>

          {/* reviews section */}

          <h3 className="reviewsHeading">Reviews</h3>
          {reviews && reviews[0] ? (
            <div className="reviews">
              {reviews &&
                reviews.map((review) => (
                  <ReviewCard key={review.user} review={review} />
                ))}
            </div>
          ) : (
            <div className="noReviews">No reviews yet</div>
          )}
        </Fragment>
      )}
    </>
  );
};

export default ProductDetails;

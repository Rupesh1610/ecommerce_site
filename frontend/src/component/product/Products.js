import React, { Fragment, useEffect, useState } from "react";
import "./products.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/product/productSlice";
import Loading from "../layout/loader/Loading";
import ProductCard from "../product/ProductCard";
import { useParams } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import { Typography } from "@mui/material";
import Slider from "@mui/material/Slider";
import { toast } from "react-toastify";

const categories = [
  "Clothing",
  "Footwear",
  "Jeans",
  "Top",
  "Bottom",
  "Electronics",
];

const Products = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [price, setPrice] = useState([0, 30000]);
  const [category, setCategory] = useState();
  const [ratings, setRatings] = useState(0);

  const params = useParams();
  const keyword = params.keyword;

  const { status, products, productsCount, error, resultPerPage } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    dispatch(fetchProducts(keyword, page, price, category, ratings));
  }, [dispatch, keyword, page, price, category, ratings, error]);

  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
  };

  const valuetext = (price) => {
    return price;
  };

  const count =
    productsCount % resultPerPage === 0
      ? Math.floor(productsCount / resultPerPage)
      : Math.floor(productsCount / resultPerPage) + 1;

  const handleChange = (e, value) => {
    setPage(value);
  };
  return (
    <Fragment>
      {status === "LOADING" ? (
        <Loading />
      ) : (
        <Fragment>
          <h2 className="productsHeading">PRODUCTS</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              size="small"
              getAriaLabel={() => "Temperature range"}
              getAriaValueText={valuetext}
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              min={0}
              max={30000}
            />
            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
            <fieldset>
              <Typography component="legend">Ratings above</Typography>
              <Slider
                size="small"
                valueLabelDisplay="auto"
                aria-labelledby="continuous-slider"
                min={0}
                max={5}
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
              />
            </fieldset>
          </div>
          <div className="paginationBox">
            {productsCount &&
              resultPerPage &&
              productsCount > resultPerPage && (
                <Pagination
                  count={count}
                  color="primary"
                  showFirstButton={true}
                  showLastButton={true}
                  onChange={handleChange}
                />
              )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;

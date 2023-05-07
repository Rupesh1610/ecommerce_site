import React, { Fragment } from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import "./home.css";
import Product from "../product/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/product/productSlice";
import Loading from "../layout/loader/Loading";
import { toast } from "react-toastify";

const Home = () => {
  const dispatch = useDispatch();

  const { status, error, products } = useSelector((state) => state.products);

  React.useEffect(() => {
    if (error) {
      toast.error(error);
    }
    dispatch(fetchProducts());
  }, [dispatch, error]);

  return (
    <>
      {status === "loading" ? (
        <Fragment>
          <Loading />
        </Fragment>
      ) : (
        <Fragment>
          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCT BELOW</h1>
            <a href="#container">
              <button>
                SCROLL <ArrowDownwardIcon sx={{ fontSize: 15 }} />
              </button>
            </a>
          </div>

          <h2 className="home_heading">Featured Products</h2>

          <div className="container" id="container">
            {products &&
              products.map((product) => {
                return <Product key={product._id} product={product} />;
              })}
          </div>
        </Fragment>
      )}
    </>
  );
};

export default Home;

import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../../images/logo.png";
import "./navbar.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import UserOptions from "../header/UserOptions";
import { useSelector } from "react-redux";

let activeClass = {
  color: "tomato",
};

const Navbar = () => {
  const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector((state) => state.user);

  const [toggle, setToggle] = useState(false);

  const handleClick = () => {
    setToggle(!toggle);
  };

  return (
    <nav id="navbar">
      <div className="left_nav">
        <img src={logo} alt="logo" />
        {!toggle ? (
          <MenuIcon
            onClick={handleClick}
            sx={{ fontSize: 30 }}
            className="menu"
          />
        ) : (
          <CloseIcon
            onClick={handleClick}
            sx={{ fontSize: 30 }}
            className="menu"
          />
        )}
      </div>
      <div className="mid_nav">
        <ul>
          <li>
            <NavLink
              to="/"
              className="nav_link"
              style={({ isActive }) => {
                return isActive ? activeClass : undefined;
              }}
            >
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className="nav_link"
              style={({ isActive }) => {
                return isActive ? activeClass : undefined;
              }}
            >
              PRODUCT
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className="nav_link"
              style={({ isActive }) => {
                return isActive ? activeClass : undefined;
              }}
            >
              CONTACT
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className="nav_link"
              style={({ isActive }) => {
                return isActive ? activeClass : undefined;
              }}
            >
              ABOUT
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="right_nav">
        <SearchIcon
          className="search_icon"
          onClick={() => navigate("/search")}
        />
        <ShoppingCartIcon
          className="cart_icon"
          onClick={() => navigate("/cart")}
        />

        {isAuthenticated ? (
          <UserOptions user={user} />
        ) : (
          <h4 className="profile_icon" onClick={() => navigate("/login")}>
            LOGIN
          </h4>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

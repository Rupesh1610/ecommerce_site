import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>Download our app</h4>
        <p>Download app for android and ios mobile</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="appstore" />
      </div>
      <div className="midFooter">
        <h1>Ecommerce</h1>
        <p>High quality is our first priority</p>
        <p>copyright 2022 &copy; Ecommerce</p>
      </div>
      <div className="rightFooter">
        <h1>Follow us</h1>
        <li>instagram</li>
        <li>instagram</li>
        <li>instagram</li>
      </div>
    </footer>
  );
};

export default Footer;

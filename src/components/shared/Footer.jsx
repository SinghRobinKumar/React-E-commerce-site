import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "../../scss/footer.scss";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <Link className="terms">Terms & Conditions</Link>
        <span>&copy; 2021 E-commerce.com</span>
      </div>
    </footer>
  );
};

export default Footer;

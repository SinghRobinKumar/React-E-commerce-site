import React, { useState } from "react";
import "../../scss/nav.scss";
import { Link } from "react-router-dom";
import history from "../../history/history";

const Nav = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  const onSearchChange = e => {
    e.preventDefault();
    onSearch(search);
    history.push("/");
  };

  return (
    <nav className="nav-container">
      <div className="nav container">
        <div className="brand-logo">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            E-commerce
          </Link>
        </div>
        <form onSubmit={e => onSearchChange(e)}>
          <input
            type="text"
            name="search"
            onChange={e => setSearch(e.target.value)}
            value={search}
            placeholder="Search for Products"
            className="field"
          />
          <button type="submit" className="submit">
            <i className="fas fa-search fa-1.5x"></i>
          </button>
        </form>
        <div>
          <Link to="/cart" className="nav-items">
            <i className="fas fa-shopping-cart"></i> Cart
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;

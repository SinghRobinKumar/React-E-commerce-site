import React from "react";
import "../../scss/cart.scss";
import { Link } from "react-router-dom";

const Cart = ({ cartItems, clearCart }) => {
  let total = 0;
  cartItems.map(c => {
    total += c.price;
  });

  return (
    <section>
      {!cartItems[0] && (
        <div className="empty">
          <img src="https://img.flaticon.com/icons/png/512/2038/2038854.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF" />
          <h2>Your Cart is Empty</h2>
          <Link className="continue" to="/">
            Continue Shopping
          </Link>
        </div>
      )}
      {cartItems[0] && (
        <div className="small-container">
          <div className="cart">{cartItems.map(c => cartItem(c))}</div>
          {total > 0 && (
            <div className="total">
              <h4>
                <span>Total: </span>
                {total} Rs
              </h4>
              <button className="checkout">Check Out</button>
              <button className="empty-cart" onClick={clearCart}>
                Empty Cart
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

const cartItem = c => {
  return (
    <div key={c._id} className="cart-item">
      <div className="check">
        <input type="checkbox" />
      </div>
      <div className="img">
        <img src={c.images.large.url} alt="" srcset="" />
      </div>
      <div className="details">
        <Link
          className="product-link"
          style={{ textDecoration: "none", color: "black" }}
          to={`/product/${c._id}`}
        >
          <h3>{c.title} </h3>
        </Link>
        <h2>&#8377; {c.price}</h2>
        <h4>
          Quantity :{"     "}
          <select>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>{" "}
        </h4>
      </div>
    </div>
  );
};

export default Cart;

import React, { useState } from "react";
import { Switch, Router, Route } from "react-router-dom";

import Nav from "./shared/Nav";
import Footer from "./shared/Footer";
import Product from "./Product";
import DataList from "./DataList";
import history from "../history/history";
import Cart from "./shared/Cart";

const App = () => {
  const [search, searchResults] = useState("");
  const [cartItems, setCartItems] = useState([]);

  const onSearchResults = searchTerm => {
    searchResults(searchTerm);
  };

  const removeDuplicate = arr => {
    return arr.reduce((acc, val, ind) => {
      const index = acc.findIndex(el => el._id === val._id);
      if (index !== -1) {
        const key = Object.keys(val)[1];
        acc[index][key] = val[key];
      } else {
        acc.push(val);
      }
      return acc;
    }, []);
  };

  const onCartItems = data => {
    if (!cartItems[0]) {
      setCartItems([...cartItems, data]);
      return;
    }
    const items = [...cartItems, data];
    setCartItems(removeDuplicate(items));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <Router history={history}>
      <Nav onSearch={onSearchResults} />
      <Switch>
        <Route path="/" exact>
          <DataList search={search} />
        </Route>
        <Route path="/product/:id">
          <Product
            getCartItems={data => onCartItems(data)}
            cartItems={cartItems}
          />
        </Route>
        <Route path="/cart">
          <Cart cartItems={cartItems} clearCart={clearCart} />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;

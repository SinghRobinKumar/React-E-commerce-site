import React, { useState } from "react";
import { Switch, HashRouter, Router, Route } from "react-router-dom";
import Nav from "./shared/Nav";
import Footer from "./shared/Footer";
import Product from "./Product";
import DataList from "./DataList";
import history from "../history/history";

const App = () => {
  const [search, searchResults] = useState("");

  const onSearchResults = searchTerm => {
    searchResults(searchTerm);
  };

  return (
    <HashRouter>
      {/* <Router history={history}> */}
      <Nav onSearch={onSearchResults} />
      <Switch>
        <Route path="/" exact>
          <DataList search={search} />
        </Route>
        <Route path="/product/:id">
          <Product />
        </Route>
      </Switch>
      <Footer />
      {/* </Router> */}
    </HashRouter>
  );
};

export default App;

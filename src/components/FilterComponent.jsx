import React, { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import _ from "lodash";
import "../scss/filter.scss";

const FilterComponent = ({ data, onSortedData }) => {
  const [active, setActive] = useState(0);

  const sortHtoL = data => {
    onSortedData(_.orderBy(data, ["price"], ["desc"]));
    setActive(1);
  };
  const sortLtoH = data => {
    onSortedData(_.orderBy(data, ["price"], ["asc"]));
    setActive(2);
  };
  const sortPopularity = data => {
    onSortedData(_.orderBy(data, ["salesrank"], ["desc"]));
    setActive(3);
  };

  return (
    <section className="filter container">
      <span>Sort By</span>

      <Link
        className={`filterItems ${active === 1 ? "active" : ""}`}
        onClick={() => sortHtoL(data)}
      >
        Price - High To Low
      </Link>

      <Link
        className={`filterItems ${active === 2 ? "active" : ""}`}
        onClick={() => sortLtoH(data)}
      >
        Price - Low To High
      </Link>

      <Link
        className={`filterItems ${active === 3 ? "active" : ""}`}
        onClick={() => sortPopularity(data)}
      >
        Popularity
      </Link>
    </section>
  );
};

export default FilterComponent;

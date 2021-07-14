import React from "react";
import "../css/dataList.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const DataItem = ({ data }) => {
  return (
    <article className="card">
      <Link
        to={`/product/${data._id}`}
        target="_blank"
        style={{ color: "#ffffff", textDecoration: "none" }}
      >
        <div className="inner-div">
          {data.url ? (
            <div className="image">
              <img src={data.url} alt={data.title} />
            </div>
          ) : (
            <div className="image">
              <img src={data.images.large.url} alt={data.title} />
            </div>
          )}
          <h3>{data.title}</h3>
          <h2>&#8377; {data.price}</h2>
        </div>
      </Link>
    </article>
  );
};

export default DataItem;

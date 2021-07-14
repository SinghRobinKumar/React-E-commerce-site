import React, { useState, useMemo, useEffect } from "react";
import DataItem from "./DataItem";
import _ from "lodash";
import "../css/dataList.css";
import FilterComponent from "./FilterComponent.jsx";
import Pagination from "./Pagination/Pagination";
import products from "../data/products.json";

let PageSize = 12;

const DataList = ({ search }) => {
  const [originalData] = useState(products);
  const [startLength, setStartLength] = useState(1);
  const [endLength, setEndLength] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const [data, setData] = useState(
    _.orderBy(products, ["salesrank"], ["desc"])
  );

  const getSearchedData = data => {
    const result = data.filter(
      d => d.productgroup === search || d.brand === search
    );
    setData(result);
  };

  useEffect(() => {
    if (!search) {
      return;
    }
    getSearchedData(originalData);
  }, [search]);

  const currentPageData = useMemo(() => {
    let firstPageIndex = (currentPage - 1) * PageSize;
    setStartLength(firstPageIndex + 1);
    const lastPageIndex = firstPageIndex + PageSize;
    setEndLength(lastPageIndex < data.length ? lastPageIndex : data.length);
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, data]);

  const sortedData = callbackData => {
    setData(callbackData);
  };

  const showingResults = () => {
    return (
      <div
        className="container"
        style={{
          fontSize: "18px",
          marginTop: "25px",
        }}
      >
        Showing <b>{startLength}</b> - <b>{endLength}</b> of
        <b> {data.length}</b> results
      </div>
    );
  };

  return (
    <section>
      {showingResults()}
      <FilterComponent onSortedData={sortedData} data={data} />
      <hr width="100%" className="container" />
      <section className="container card-container">
        {currentPageData.map(d => (
          <DataItem key={d._id} data={d} />
        ))}
      </section>
      <hr width="100%" className="container" />
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={data.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
      />
    </section>
  );
};

export default DataList;

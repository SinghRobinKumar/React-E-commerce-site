import React, { useState, useMemo, useEffect } from "react";
import DataItem from "./DataItem";
import _ from "lodash";
import "../scss/dataList.scss";
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      <section className="container showing-results">
        Showing <b>{startLength}</b> - <b>{endLength}</b> of
        <b> {data.length}</b> Results
        {search && (
          <span>
            {" "}
            for <b>"{search}"</b>
          </span>
        )}
      </section>
    );
  };

  return (
    <section>
      <span className="show-results">{showingResults()}</span>
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

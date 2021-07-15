import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import faker from "faker";

import "../css/product.css";
import products from "../data/products.json";
import reviews from "../data/reviews.json";

const Product = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [comments] = useState(reviews);
  const [moreDes, setMoreDes] = useState("half");
  const [hidden, setHidden] = useState(false);

  const fetchData = id => {
    const data = products;
    const result = data.filter(data => data._id == id);
    result.map(d => {
      setData(d);
    });
  };

  useEffect(() => {
    fetchData(id);
  }, []);

  const getCategory = category => {
    const myCategory = category.split("/");
    const cat = "Home > " + myCategory[1] + " > " + myCategory[2];
    return cat;
  };
  const getDescription = description => {
    // const des = description;
    // var count = 0;
    // for (var i = 0; i < des.length; i++) {
    //   count += des[i].innerHTML.split(" ").length;
    //   console.log(count);
    // }
    // console.log(des);
    return description;
  };
  const toggleDes = () => {
    setHidden(hidden === true ? false : true);
    setMoreDes(moreDes === "half" ? "full" : "half");
  };

  return (
    <section>
      <div className="product container">
        {data && (
          <>
            <div className="image">
              <img src={data.images.large.url} alt={data.title} />
            </div>
            <div className="details">
              <h5 className="category">{getCategory(data.category)}</h5>
              {data.brand && <p className="brand">Brand: {data.brand}</p>}
              {data.hardwareplatform && (
                <p className="platform">Platform: {data.hardwareplatform}</p>
              )}
              <h2 className="title">{data.title}</h2>
              <p className="rank">
                <span>
                  <i className="fas fa-star"></i> Sales Rank: {data.salesrank}
                </span>
              </p>
              <h1 className="price">&#8377;{data.price}</h1>

              <div className={`description ${moreDes}`}>
                <span>
                  <h6>Description : </h6>
                  {getDescription(data.description)}
                </span>
                {hidden === true && (
                  <button className="more" onClick={() => toggleDes()}>
                    Read Less
                  </button>
                )}
              </div>
              {hidden === false && (
                <button className="more" onClick={() => toggleDes()}>
                  Read More
                </button>
              )}
            </div>
          </>
        )}
      </div>

      <div className="add-review container">
        <h2>Add Review</h2>
        <form onSubmit={e => e.preventDefault()}>
          <textarea type="text" placeholder="Add Product Review"></textarea>
          <button>Add Review</button>
        </form>
      </div>

      <div className="comments container">
        <h2>Ratings & Reviews</h2>
        {comments &&
          comments.comments.map(comment => (
            <article className="comment">{printComments(comment)}</article>
          ))}
      </div>
    </section>
  );
};

const printComments = comment => {
  let firstName = faker.name.firstName();
  let lastName = faker.name.lastName();
  return (
    <div>
      <div className="user">
        <i className="fas fa-user fa-2x icon"></i>
        <span className="name">
          {firstName} {lastName}
        </span>
      </div>
      <div className="description">{comment}</div>
    </div>
  );
};

export default Product;

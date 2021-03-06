import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import faker from "faker";
import "../scss/product.scss";
import products from "../data/products.json";
import reviews from "../data/reviews.json";

const Product = ({ getCartItems, cartItems }) => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [comments] = useState(reviews);
  const [moreDes, setMoreDes] = useState("half");
  const [hidden, setHidden] = useState(false);
  const [added, setAdded] = useState(false);

  let desCount;

  const fetchData = id => {
    const data = products;
    const result = data.filter(data => data._id == id);

    result.map(d => {
      cartItems.map(c => {
        if (d._id === c._id) {
          setAdded(true);
        }
      });
      setData(d);
    });
  };

  useEffect(() => {
    fetchData(id);
    window.scrollTo(0, 0);
  }, []);

  const getCategory = category => {
    const myCategory = category.split("/");
    const cat = "Home > " + myCategory[1] + " > " + myCategory[2];
    return cat;
  };
  const getDescription = description => {
    desCount = description[0].length;
    return description;
  };
  const toggleDes = () => {
    setHidden(hidden === true ? false : true);
    setMoreDes(moreDes === "half" ? "full" : "half");
  };

  const getItems = data => {
    setAdded(true);
    getCartItems(data);
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
              <button
                onClick={() => getItems(data)}
                className={`cart ${!added ? "add" : "added"}`}
              >
                {!added ? (
                  <>
                    <i className="fas fa-shopping-cart fa-1.5x"></i>Add To Cart
                  </>
                ) : (
                  <>
                    <i className="fas fa-check fa-1.5x"></i>
                    Added To Cart
                  </>
                )}
              </button>
              <div className={`description ${moreDes}`}>
                <h6>Description : </h6>
                {getDescription(data.description)}

                {hidden === true && desCount > 435 && (
                  <button className="more" onClick={() => toggleDes()}>
                    Read Less
                  </button>
                )}
              </div>
              {hidden === false && desCount > 435 && (
                <button className="more" onClick={() => toggleDes()}>
                  Read More
                </button>
              )}
              {getDetails(data)}
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

const getDetails = details => (
  <details>
    <summary>Details</summary>
    <table>
      <tr>
        <th>Product</th>
        {details.productgroup && <td>{details.productgroup}</td>}
      </tr>
      {details.label && (
        <tr>
          <th>Label</th>
          <td>{details.label}</td>
        </tr>
      )}
      {details.binding && (
        <tr>
          <th>Binding</th>
          <td>{details.binding}</td>
        </tr>
      )}

      {details.edition && (
        <tr>
          <th>Edition</th>
          <td>{details.edition}</td>
        </tr>
      )}
      {details.releasedate && (
        <tr>
          <th>Release Date</th>
          <td>{details.releasedate.$date}</td>
        </tr>
      )}

      {details.manufacturer && (
        <tr>
          <th>Manufacturer</th>
          <td>{details.manufacturer}</td>
        </tr>
      )}
      {details.studio && (
        <tr>
          <th>Studio</th>
          <td>{details.studio}</td>
        </tr>
      )}
      {details.salesrank && (
        <tr>
          <th>Sales Rank</th>
          <td>{details.salesrank}</td>
        </tr>
      )}
      {details.feature && (
        <tr>
          <th>Feature</th>
          <td>{details.feature}</td>
        </tr>
      )}
    </table>
  </details>
);

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

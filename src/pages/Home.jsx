import { useEffect, useState } from "react";
import { axiosRequest } from "../api";
import { Link } from "react-router-dom";

const Home = ({ props }) => {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    axiosRequest
      .get("/post-categories/", { headers: { Authorization: null } })
      .then((res) => setCategories(res.data))
      .catch((err) => console.log("get categories err: ", err.response.data));
  }, []);

  return (
    <>
      <div className="banner header-text">
        <div className="owl-banner owl-carousel d-block">
          <div className="banner-item-01">
            <div className="text-content">
              <h4>Best Offer</h4>
              <h2>New Arrivals On Sale</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="latest-products">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-heading">
                <h2>Product Categories</h2>
                <a href="products.html">
                  view all products <i className="fa fa-angle-right" />
                </a>
              </div>
            </div>
            {categories &&
              categories.map((cat, i) => (
                <div key={i} className="col-md-4">
                  <div className="product-item">
                    <Link to={`/products`} state={{ cat: cat.id }}>
                      <img
                        src={cat.icon}
                        alt=""
                        style={{ width: "100%", height: "230px" }}
                      />
                    </Link>
                    <div className="down-content">
                      <Link to={`/products`} state={{ cat: cat.id }}>
                        <h4>{cat.name}</h4>
                      </Link>
                      <h6>{cat.products_count} Posts</h6>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

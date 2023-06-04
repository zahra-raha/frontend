import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { axiosRequest } from "../api";
import Footer from "../components/Footer";

const Products = () => {
  const location = useLocation();
  const [cat, setCat] = useState(location.state?.cat);
  const [q, setQ] = useState("");

  const [posts, setPosts] = useState(null);
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    setPosts(null);
    axiosRequest
      .get(`/post/?category=${cat || ""}&search=${q}`, {
        headers: { Authorization: null },
      })
      .then((res) => setPosts((_) => res.data));
  }, [cat, q]);

  useEffect(() => {
    axiosRequest
      .get(`/post-categories/`, { headers: { Authorization: null } })
      .then((res) =>
        setCategories([
          {
            id: "",
            products_count: "",
            name: "All Categories",
          },
          ...res.data,
        ])
      );
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const q = e.target["search"].value;
    const cat = e.target["category"].value;
    setQ((_) => q);
    setCat((_) => cat);
  };

  return (
    <>
      <div className="page-heading products-heading header-text">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="text-content">
                <h4>new arrivals</h4>
                <h2>Products Page</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="products">
        <div className="container">
          <div className="row">
            <form
              onSubmit={handleSearch}
              className="form col-md-12 row ml-1 mr-1"
            >
              <h3 className="Products mb-2">Products</h3>
              <input
                name="search"
                placeholder="Search for products .."
                className="form-control"
              >
              </input>
              <select
                name="category"
                className="form-control mt-2"
                defaultValue={cat}
              >
                {categories &&
                  categories.map((cati) => (
                    <option
                      key={cati.id}
                      value={cati.id}
                      selected={cati.id == cat}
                    >
                      {cati.name}
                    </option>
                  ))}
              </select>
              <button className="btn btn-primary mt-2">Search</button>
            </form>
          </div>
        </div>
      </div>

      <div className="products" style={{ marginTop: "2%" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="filters"></div>
            </div>
            <div className="col-md-12">
              <div className="filters-content">
                <div className="row grid">
                  {posts
                    ? (
                      posts.length == 0
                        ? (
                          <>
                            <img src="https://bagbazaars.com/assets/img/no-product-found.png" />
                          </>
                        )
                        : (
                          posts.map((post, i) => (
                            <div className="col-lg-4 col-md-4 all des" key={i}>
                              <div className="product-item">
                                <Link
                                  to={`/product-details`}
                                  state={{ productid: post.id }}
                                >
                                  <img src={post.imageurl} alt=""
                                  style={{ width: "100%", height: "280px" }}
                                  />
                                </Link>
                                <div className="down-content">
                                  <Link
                                    to={`/product-details`}
                                    state={{ productid: post.id }}
                                  >
                                    <h4 className="w-75">{post.title}</h4>
                                  </Link>
                                  <h6>$18.25</h6>
                                  <p>{post.description}</p>
                                  <ul className="stars">
                                    <li>
                                      <i className="fa fa-heart" />
                                    </li>
                                    <li className="ml-1">
                                      {post.liked_by.length}
                                    </li>
                                  </ul>
                                  <span>Reviews ({post.comments_count})</span>
                                </div>
                              </div>
                            </div>
                          ))
                        )
                    )
                    : (
                      "Loading"
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;

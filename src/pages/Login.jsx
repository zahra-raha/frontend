import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { axiosRequest } from "../api";
import { AuthContext } from "../context/AuthContext";

const Login = ({ logout = false }) => {
  const goto = useNavigate();
  const [authErr, setAuthErr] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ shouldUnregister: true });
  const { setIsAuthenticated, setProfile } = useContext(AuthContext);

  const location = useLocation();
  const [newUser, setNewUser] = useState(location.state?.registered);

  useEffect(() => {
    if (authErr) {
      setTimeout(function() {
        setAuthErr(false);
      }, 5000);
    }
  }, [authErr]);

  const onSubmit = (data) => {
    axiosRequest
      .post("/api-token-auth/", data, {
        headers: { Authorization: undefined },
      })
      .then((res) => {
        sessionStorage.setItem("token", res.data.token);
        setIsAuthenticated(true);
        axiosRequest
          .get("/profile/0/", {
            headers: { Authorization: `Token ${res.data.token}` }
          })
          .then((response) => {
            setProfile(response.data);
            // goto("/");
            window.location.replace("/")
          })
          .catch((err) => {
            console.log("setProfileError: ", err.response.data);
          });
      })
      .catch((err) => {
        if (err.response.data?.non_field_errors) {
          setAuthErr(true);
        }
      });
  };

  if (logout) {
    // perform logout
    setIsAuthenticated(false);
    setProfile(null);
    sessionStorage.setItem("token", null);
    goto("/");
  }

  return (
    <>
      <div className="page-heading products-heading header-text">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="text-content">
                <h4>Signin</h4>
                <h3 className="text-white">
                  Singin to the system to buy and sell products
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="best-features about-features">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-heading">
                <h2>Singin</h2>
              </div>
              {newUser && (
                <div className="bg-info p-4 rounded text-white">
                  <span>
                    Your account successfully registered, Signin using your
                    username and password.
                  </span>
                </div>
              )}
            </div>

            <form className="col-md-12 mt-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Username</label>
                <input
                  placeholder="Enter your username"
                  className="form-control"
                  {...register("username", {
                    required: "This field is required",
                    minLength: {
                      value: 3,
                      message: "Username should have at least 3 characters.",
                    },
                    maxLength: {
                      value: 6,
                      message: "Username should not exceed 6 characters.",
                    },
                  })}
                />
                {errors.username && (
                  <small className="text-danger">
                    {errors.username.message}
                  </small>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  {...register("password", {
                    required: "This field is required",
                  })}
                />
                {errors.password && (
                  <small className="text-danger">
                    {errors.password.message}
                  </small>
                )}
              </div>
              <span className="text-danger d-block">
                {authErr && "Wrong username or password, try again."}
              </span>
              <button type="submit" className="btn btn-primary mt-4">
                Login
              </button>
              <div className="small mt-3">
                Don't have an account?
                <Link to="/register">&nbsp;Create one</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

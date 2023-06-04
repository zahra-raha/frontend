import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { axiosRequest } from "../api";
import { AuthContext } from "../context/AuthContext";


const Register = () => {
  const goto = useNavigate()
  const [authErr, setAuthErr] = useState(false)
  const { handleSubmit, register, watch, formState: { errors } } = useForm()
  const { setIsAuthenticated, setProfile } = useContext(AuthContext)

  const onSubmit = (formData) => {
    axiosRequest
      .post("/register/", formData, { headers: { Authorization: null } })
      .then(res=> {
        if (res.data.username) {
          goto("/login", { state: { registered: true } })
        }
      })
  }
  
  return (
    <>
      <div className="page-heading products-heading header-text">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="text-content">
                <h4>SignUp</h4>
                <h3 className="text-white">
                  Signup to the system to buy and sell products
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
                <h2>Singup</h2>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="col-md-12">
              <div className="form-group">
                <label>Username *</label>
                <input 
                  placeholder="Enter your username"
                  className="form-control"
                  {...register("username", {
                    required: "This field is required",
                    minLength: { value: 3, message: "Username should have at least 3 characters." },
                    maxLength: { value: 6, message: "Username should not exceed 6 characters." },
                  })} 
                />    
                {errors.username && <small className="text-danger">{errors.username.message}</small>}
              </div>
              <div className="form-group">
                <label>First Name *</label>
                <input 
                  placeholder="Enter your Firstname"
                  className="form-control"
                  {...register("first_name", {
                    required: "This field is required",
                    minLength: { value: 3, message: "Your name should have at least 3 characters." },
                  })} 
                />    
                {errors.first_name && <small className="text-danger">{errors.first_name.message}</small>}
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input 
                  placeholder="Enter your Lastname"
                  className="form-control"
                  {...register("last_name", { required: false, })} 
                />    
                {errors.last_name && <small className="text-danger">{errors.last_name.message}</small>}
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address *</label>
                <input 
                  placeholder="Enter your Email"
                  className="form-control"
                  {...register("email", { required: "This field is required", })} 
                />    
                {errors.email && <small className="text-danger">{errors.email.message}</small>}
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className="form-group">
                <label>Password *</label>
                <input 
                  type="password"
                  placeholder="Enter your Password"
                  className="form-control"
                  {...register("password", { required: "This field is required", })} 
                />
                {errors.password && <small className="text-danger">{errors.password.message}</small>}
              </div>
              <div className="form-group">
                <label>Confirm Password *</label>
                <input 
                  type="password"
                  placeholder="Confirm your Password"
                  className="form-control"
                  {...register("password2", { 
                    required: "This field is required",
                    validate: (val)=> {
                      if (val !== watch().password){
                        return "Passwords doesn't match"
                      }
                    }
                  })} 
                />
                {errors.password2 && <small className="text-danger">{errors.password2.message}</small>}
              </div>
              <button type="submit" className="btn btn-primary mt-4">
                Register
              </button>
              <div className="small mt-3">
                Already have an account?
                <Link to="/login">&nbsp;Singin</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;

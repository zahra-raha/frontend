import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosRequest } from "../api";
import { AuthContext } from "../context/AuthContext";
import { useForm } from "react-hook-form";

const ProductDetails = () => {
  const goto = useNavigate()
  const location = useLocation();
  const pid = location.state?.productid;
  const [post, setPost] = useState(null);
  const { profile } = useContext(AuthContext)

  useEffect(() => {
    axiosRequest
      .get(`/post/${pid}/`, { headers: { Authorization: null } })
      .then((res) => setPost(res.data));
  }, []);

  const [newComment, setNewComment] = useState("");
  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };
  const handleCommentSubmit = (event) => {
    event.preventDefault();
    if (!profile){ goto("/login") } else {
      axiosRequest.post(`/post-comments/`, {
        by_user: profile.user.id,
        comment: newComment,
        post: pid,
      }).then(res=>{
        setNewComment("");
        setPost(current=> 
          ({ ...current, "comments": [...current.comments, res.data], })
        )
       })
    }
  };

  const handleLike = ()=>{
    if (!profile){
      goto("/login")
    } else {
      if (post.liked_by.includes(profile.user.id)){
        axiosRequest.patch(`/post/${pid}/`, { 
          liked_by: post.liked_by.filter(i=> i!==profile.user.id)
        });
        setPost(current=>({
          ...current,
          liked_by: post.liked_by.filter(i=> i!== profile.user.id)
        }))
      } else {
        axiosRequest.patch(`/post/${pid}/`, { 
          liked_by: [...post.liked_by, profile.user.id] 
        });
        setPost(current=>({
          ...current,
          liked_by: [...post.liked_by, profile.user.id]
        }))
      }
    }
  }

  const [showBuyForm, setShowBuyForm] = useState(false)
  const { handleSubmit, register, formState: { errors } } = useForm()
  const handleMessageSubmit = (formData) =>{
    if (!profile){
      goto("/login")
    } else {
      axiosRequest
        .post(`/inbox/`, {
          ...formData, 
          post: pid,
          by_user: profile.user.id,
        })
    }
    alert("Your has been successfully sent to the post owner!")
  }

  return (
    <>
      <div className="page-heading products-heading header-text">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="text-content">
                <h4>New arrivals</h4>
                <h2>Products Page</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      {!post ? <h3 align="center" className="mt-5">Loading...</h3>: 
<div className="container mt-5">
        <div className="row">
          <div className="col-lg-6">
            <img
              src={post.imageurl}
              alt="Product Image"
              className="img-fluid rounded"
            />
          </div>
          {!showBuyForm ? 
          <div className="col-lg-6">
            <h2>{post.title}</h2>
            <p className="mt-2" style={{ cursor: "pointer" }} onClick={handleLike}>
            <span className="d-inline-block" data-toggle="tooltip" data-placement="top" 
              title={
                profile
                  ? post.liked_by.includes(profile.user.id)
                    ? 'Liked'
                    : 'Not Liked'
                  : 'Login to Like'
              }
            >
              <i className={`fa fa-heart mr-2 text-${profile && post.liked_by.includes(profile.user.id) ? "danger" : "dark"}`} />
            </span>
              <strong className="font-weight-bold">{post.liked_by.length}</strong>
            </p>
            <p className="mt-2">
              <strong className="font-weight-bold">Price: ${post.price}</strong>
            </p>
            <p className="mt-2">
              <strong className="font-weight-bold">Dimensions:</strong>&nbsp;{post.dimensions}
            </p>
            <p>
              <strong className="font-weight-bold">Address:</strong>&nbsp;{post.address}
            </p>
            <p className="mt-2">{post.description}</p>
            <p>
              <strong className="font-weight-bold">Posted:</strong>&nbsp;{post.created_at}
            </p>
            <button className="btn btn-primary mt-3" onClick={()=>setShowBuyForm(true)}>Buy Now</button>
          </div>
           : <div className="col-lg-6">
  <button className="btn btn-link" onClick={()=> setShowBuyForm(false)}>
  <i className="fa fa-arrow-left" /> Product Details
      </button>
<form onSubmit={handleSubmit(handleMessageSubmit)} className="form mt-4">
      <div className="form-group ">
        <label htmlFor="name">Name</label>
        <input 
          className="form-control"
          {...register("name", {
            required: "This field is required",
            minLength: { value: 3, message: "Your name should have at least 3 characters." },
          })} 
        />    
        {errors.name && <small className="text-danger">{errors.name.message}</small>}
      </div>
      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number</label>
        <input 
          className="form-control"
          {...register("phone_number", {
            required: "This field is required",
            minLength: { value: 10, message: "Your phone should have at least 10 numbers." },
          })} 
        />    
        {errors.phone_number && <small className="text-danger">{errors.phone_number.message}</small>}
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
                <input 
                  className="form-control"
                  {...register("email", { required: "This field is required", })} 
                />    
                {errors.email && <small className="text-danger">{errors.email.message}</small>}
      </div>
      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea
          className="form-control"
          id="message"
          name="message"
          rows="4"
          {...register('message', { required: 'Message is required' })}        
          ></textarea>
          {errors.message && <small className="text-danger">{errors.message.message}</small>}
      </div>
      <button type="submit" className="btn btn-primary">
        {profile? "Send Message": "Login To Contact"}
      </button>
    </form>             
           </div>}
        </div>
        <hr />
        <div className="row">
          <div className="col-lg-12">
            <h3>User Reviews</h3>
            {post.comments.length > 0 && post.comments.map(cmnt=>(
            <div key={cmnt.id} className="media mt-3">
              <img src={cmnt.user.avatar} style={{ height: "50px", width: "50px", borderRadius: "100%" }} alt="User Avatar" className="mr-3" />
              <div className="media-body">
                <h5 className="mt-0">{cmnt.user.name}</h5>
                <p>{cmnt.timestamp}</p>
                <p>{cmnt.comment}</p>
              </div>
            </div>          
              ))
          }
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-lg-12">
            <form onSubmit={handleCommentSubmit}>
              <div className="form-group">
                <label htmlFor="new-comment">Add Comment</label>
                <textarea
                  id="new-comment"
                  className="form-control"
                  value={newComment}
                  onChange={handleCommentChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                {profile? "Submit Comment": "Login to add Comment"}
              </button>
            </form>
          </div>
        </div>
      </div>    }
      
    </>
  );
};

export default ProductDetails;

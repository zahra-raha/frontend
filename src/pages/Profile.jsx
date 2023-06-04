import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { axiosRequest } from "../api"

const Profile= () => {
  const goto= useNavigate()
  const [showTab, setShowTab] = useState(1)
  const { profile, isAuthenticated } = useContext(AuthContext)
  const { handleSubmit, register, formState: { errors }, reset } = useForm({ shouldUnregister: true })
  const [myposts, setMyposts] =  useState(null)
  const [inbox, setInbox] = useState(null)
  const [cats, setCats] = useState(null)
  const token = sessionStorage.getItem("token")

  useEffect(()=>{
    if (!(token && token != "null")){ goto("/login") }
  }, [])

  useEffect(()=>{
      if (profile && showTab === 2){
        axiosRequest.get(`/post/?owner__id=${profile?.user.id}`)
        .then(res=> setMyposts(res.data))
      } else if (profile && showTab === 3){
        axiosRequest.get(`/inbox/?post__owner__id=${profile.user.id}`)
        .then(res=> setInbox(res.data))
      } else if (showTab === 4){
        axiosRequest.get(`/post-categories/`).then(res=>setCats(res.data))
      }
    }, [showTab])

  const handleProfileSubmit = (formData, e) =>{
    const avatar = e.target["avatar"].files[0]
    axiosRequest
      .patch(`/user/${profile.user.id}/`, formData)
      .then(res=>{
        axiosRequest.patch(`/profile/20/`, {
          avatar: avatar,
          phonenumber: formData.phone_number,
        }, { headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Token ${sessionStorage.getItem("token")}`,
        }})
        alert("Profile updated!")
      })
  }

  const handlePostDelete = (id)=>{
    const confirmed = window.confirm(`Are you sure you want to delete this post with id ${id}?`);
    if (confirmed) {
      axiosRequest.delete(`/post/${id}/`).then(()=>{
        setMyposts(old=> old.filter(o=> o.id != id))
      })
    }
  }

  const handleNewPost = (formData, e) => {
    const image = e.target["image"].files[0]
    axiosRequest
    .post(`/post/`, { 
      ...formData, 
      image,
      owner: profile.user.id,
     }, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Token ${sessionStorage.getItem("token")}`,
      }
    }).then(res=>{
      alert("Your post has been successfully published!")
      reset();
    })
  }

  return (
<>
      <div className="page-heading products-heading header-text"></div>
    <div className="container mt-5 pt-5">
      <div className="row">
        <div className="col-lg-3">
          {/* Sidebar */}
          <div className="sidebar">
            <ul className="list-group" style={{ cursor: "pointer" }}>
              <li className="list-group-item" onClick={()=>setShowTab(1)}>Profile</li>
              <li className="list-group-item" onClick={()=>setShowTab(4)}>New Post</li>
              <li className="list-group-item" onClick={()=>setShowTab(2)}>My Posts</li>
              <li className="list-group-item" onClick={()=>setShowTab(3)}>Inbox</li>
              <li className="list-group-item" onClick={()=>goto("/logout")}>Logout</li>

            </ul>
          </div>
        </div>
        {profile ? 
<div className="col-lg-9">
          {/* Profile Details */}
        {showTab === 1 &&
            <div className="profile-details">
            <h2>Profile Details</h2>
            <img src={""} />
            <form onSubmit={handleSubmit(handleProfileSubmit)} encType="multipart/form-data">
              <div className="form-group">
                <label>Username *</label>
                <input 
                  className="form-control"
                  defaultValue={profile.user.username}
                  {...register("username", {
                    required: "This field is required",
                    minLength: { value: 3, message: "Username should have at least 3 characters." },
                    maxLength: { value: 6, message: "Username should not exceed 6 characters." },
                  })} 
                />    
                {errors.username && <small className="text-danger">{errors.username.message}</small>}
              </div>
              <div className="form-group">
                <label>Name *</label>
                <input 
                  defaultValue={profile.user.first_name}
                  className="form-control"
                  {...register("first_name", {
                    required: "This field is required",
                    minLength: { value: 3, message: "Your name should have at least 3 characters." },
                  })} 
                />    
                {errors.first_name && <small className="text-danger">{errors.first_name.message}</small>}
              </div>
              <div className="form-group">
                <label>Lastname</label>
                <input 
                  defaultValue={profile.user.last_name}
                  className="form-control"
                  {...register("last_name", { required: false })} 
                />    
                {errors.last_name && <small className="text-danger">{errors.last_name.message}</small>}
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input 
                  defaultValue={profile.user.email}
                  className="form-control"
                  {...register("email", { required: "This field is required", })} 
                />    
                {errors.email && <small className="text-danger">{errors.email.message}</small>}
              </div>
              <div className="form-group">
                <label>Avatar</label>
                <input
                 type="file" className="form-control-file" 
                  {...register("avatar", { required: false })} 
                 />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
        <input 
          className="form-control"
          defaultValue={profile.phonenumber}
          {...register("phone_number", {
            required: "This field is required",
            minLength: { value: 10, message: "Your phone should have at least 10 numbers." },
          })} 
        />    
        {errors.phone_number && <small className="text-danger">{errors.phone_number.message}</small>}
              </div>
              <button type="submit" className="btn btn-primary">Save</button>
            </form>
          </div>         }
          

          {/* My Posts */}
          {showTab === 2 &&
<div className="my-posts">
            <h2>My Posts</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Price</th>
                  <th>Title</th>
                  <th>Likes</th>
                  <th>Comments</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
              {myposts && myposts.map(p=>(
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.updated_at}</td>
                  <td>{p.price}</td>
                  <td>{p.title}</td>
                  <td>{p.liked_by.length}</td>
                  <td>{p.comments_count}</td>
                  <td>
                  <div className="btn-group" role="group">
                    <button className="btn btn-sm btn-primary" onClick={()=>goto("/product-details", { state: { productid: p.id } })}>
                      <i className="fa fa-eye" />
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={()=>handlePostDelete(p.id)}>
                      <i className="fa fa-trash" />
                    </button>
                  </div>
                  </td>
                </tr>               ))}
                
                {/* Add more rows for other posts */}
              </tbody>
            </table>
          </div>           }
          

          {/* Inbox */}
          {showTab === 3 && 
<div className="inbox" style={{ width: "115%" }}>
            <h2>Inbox</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>PostID</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Message</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
              {inbox && inbox.map(ms=>(
                <tr key={`ms-${ms.id}`}>
                  <td>{ms.post}</td>
                  <td>{ms.name}</td>
                  <td>{ms.phone_number}</td>
                  <td>{ms.email}</td>
                  <td>{ms.message}</td>
                  <td>{ms.timestamp}</td>
                </tr>
                ))}
                {/* Add more rows for other messages */}
              </tbody>
            </table>
          </div>        }
          {showTab === 4 && <>
            <h2>New Post</h2>
           <form onSubmit={handleSubmit(handleNewPost)}>
      <div className="form-group mt-4">
        <label htmlFor="category">Category</label>
        <select className="form-control" id="category" name="category"
        {...register('category', { required: 'Category is required' })}        >
          <option value="">Select a category</option>
          {cats && cats.map(c=>(
            <option value={c.id} key={`cat-${c.id}`}>{c.name}</option>
            ))}
        </select>
  {errors.category && <div className="invalid-feedback">{errors.category.message}</div>}      </div>

      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input 
          className="form-control"
          {...register("title", {
            required: "This field is required",
          })} 
        />    
        {errors.title && <small className="text-danger">{errors.title.message}</small>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea className="form-control" id="description" name="description" rows="3"
          {...register("description", {
            required: "This field is required",
          })} 
        ></textarea>
        {errors.description && <small className="text-danger">{errors.description.message}</small>}
      </div>

      <div className="form-group">
        <label htmlFor="dimensions">Dimensions</label>
        <input 
          className="form-control"
          {...register("dimensions", {
            required: "This field is required",
          })} 
        />    
        {errors.dimensions && <small className="text-danger">{errors.dimensions.message}</small>}
      </div>

      <div className="form-group">
        <label htmlFor="price">Price</label>
        <input 
          type="number"
          className="form-control"
          {...register("price", {
            required: "This field is required",
          })} 
        />    
        {errors.price && <small className="text-danger">{errors.price.message}</small>}
      </div>

      <div className="form-group">
        <label htmlFor="address">Address</label>
        <textarea className="form-control" id="description" name="description" rows="3"
          {...register("address", {
            required: "This field is required",
          })} 
        ></textarea>
        {errors.address && <small className="text-danger">{errors.address.message}</small>}
      </div>

      <div className="form-group">
        <label htmlFor="image">Image</label>
        <input type="file" className="form-control-file" id="image" name="image" 
          {...register("image", {
            required: "This field is required",
          })} 
        />
        {errors.image && <small className="text-danger">{errors.image.message}</small>}
      </div>

      <div className="form-group">
        <label htmlFor="color">Color</label>
        <input type="color" className="form-control" id="color" name="color" />
      </div>

      <button type="submit" className="btn btn-primary">Submit</button>
    </form> 
          </>}
        </div>: "Loading..."      }

      </div>
    </div>
    </>
  );
};

export default Profile;

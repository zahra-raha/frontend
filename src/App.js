import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

// components
import Header from "./components/Header"
import Footer from "./components/Footer"
// pages
import Home from "./pages/Home"
import Products from "./pages/Products"
// import ProductDetails from './pages/ProductDetails';
import Profile from './pages/Profile';
import Login from "./pages/Login"
import Register from "./pages/Register"
import { useContext, useEffect } from 'react';
import { AuthContext } from './context/AuthContext';
import { axiosRequest } from './api';

function App() {
  const token = sessionStorage.getItem("token")
  const { setProfile, setIsAuthenticated } = useContext(AuthContext)

  useEffect(()=>{
    if (token && token != "null"){
      setIsAuthenticated(true);
      axiosRequest.get("/profile/0/").then(res=>setProfile(res.data))
    }
  }, [])

  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/product-details' element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path='/logout' element={<Login logout={true} />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

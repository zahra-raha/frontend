import { useContext } from "react"
import { Link, NavLink } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { useLocation  } from "react-router-dom"

const Header = ({ props }) => {
  const { isAuthenticated, profile } = useContext(AuthContext)
  let location = useLocation();
  const homeClass = location.pathname === "/" ? "nav-item active" : "nav-item";
  const productsClass = location.pathname.match(/^\/products/) ? "nav-item active" : "nav-item";
  const profileClass = location.pathname.match(/^\/profile/) ? "nav-item active" : "nav-item";
  const loginClass = location.pathname.match(/^\/login/) ? "nav-item active" : "nav-item";


 return <header className="">
  <nav className="navbar navbar-expand-lg">
    <div className="container">
      <Link className="navbar-brand" to="/">
        <h2>
          Market <em>Place</em>
        </h2>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarResponsive"
        aria-controls="navbarResponsive"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarResponsive">
        <ul className="navbar-nav ml-auto">
          <li className={homeClass} >
            <Link className="nav-link" to="/" >
              Home
              <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className={productsClass}>
            <Link className="nav-link" to="/products">
              Products
            </Link>
          </li>
        { isAuthenticated && profile?.user
        ? <>
          <li className={profileClass}>
            <Link className="nav-link" to="/profile">
              Profile - {profile?.user.username}
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/logout">
              Logout
            </Link>
          </li>
          </> : <li className={loginClass}>
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
          }
        </ul>
      </div>
    </div>
  </nav>
</header>
 
}

export default Header
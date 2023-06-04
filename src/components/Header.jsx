import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

const Header = ({ props }) => {
  const { isAuthenticated, profile } = useContext(AuthContext)

 return <header className="">
  <nav className="navbar navbar-expand-lg">
    <div className="container">
      <Link className="navbar-brand" to="/">
        <h2>
          EcommerCe <em>Pro</em>
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
          <li className="nav-item active">
            <Link className="nav-link" to="/">
              Home
              <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/products">
              Products
            </Link>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="about.html">
              About Us
            </a>
          </li>
        { isAuthenticated && profile?.user
        ? <>
          <li className="nav-item">
            <Link className="nav-link" to="/profile">
              Profile - {profile?.user.username}
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/logout">
              Logout
            </Link>
          </li>
          </> : <li className="nav-item">
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
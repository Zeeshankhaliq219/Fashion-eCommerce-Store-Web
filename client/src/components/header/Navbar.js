import React, {  useState } from 'react'
import './_navbar.scss'
import logo from 'assets/logo.png'
import { Link, useNavigate, NavLink } from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useAuthContext } from 'context/AuthContext';
import { useProductContext } from 'context/ProductContext';

export default function Navbar() {
    const [searchValue, setSearchValue] = useState("")
    const [navBarScroll, setNavBarScroll] = useState(false)
    const [expand, setExpand] = useState(true);
    const [toggle, setToggle] = useState(false)
    const { isAuthenticated, setIsAuthenticated } = useAuthContext()
    const { cartItemsLength, favItemsLength } = useProductContext()
    const navigate = useNavigate()

    const navbarScrolling = () => {
        if (window.scrollY >= 10) {
            setNavBarScroll(true)
        } else {
            setNavBarScroll(false)
        }
    }
    window.addEventListener('scroll', navbarScrolling)

    // handleChange
    const handleSubmit = (e) => {
        e.preventDefault()
        navigate(`/products/search/${searchValue}`)
    }

    // handleLogOut
    const handleLogOut = () => {

        localStorage.removeItem('user')
        setIsAuthenticated(false)

    }
    const toggleExpand = () => {
      setExpand((prevExpand) => !prevExpand);
    };


    return (
      <div
        className={`${
          navBarScroll
            ? "position-fixed  navbar-animation"
            : "container px-0 mt-3 position-absolute navbar-absolute"
        }`}
      >
        <nav className={`navbar navbar-expand-lg bg-light p-3 rounded shadow `}>
          <Link className="navbar-brand" to="/">
            <img src={logo} width={50} alt="" />
            <span className=" ms-2">Fashion Web</span>
          </Link>
          <button
            className="navbar-toggler toggleIcon border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded={expand ? "true" : "false"}
            aria-label="Toggle navigation"
            onClick={toggleExpand}
          >
            {expand ? (
              <span className="navbar-toggler-icon"></span>
            ) : (
              <i className="fa-solid fa-x fs-2"></i>
            )}
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
              <li className="nav-item mx-1 mx-lg-0 mx-xl-2">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item mx-1 mx-lg-0 mx-xl-2">
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li>
              <li className="nav-item mx-1 mx-lg-0 mx-xl-2">
                <NavLink className="nav-link" to="/shop">
                  Shop
                </NavLink>
              </li>
              <li className="nav-item mx-1 mx-lg-0 mx-xl-2">
                <NavLink className="nav-link" to="/contact">
                  Contact
                </NavLink>
              </li>
              <li className="nav-item mx-1 mx-lg-0 mx-xl-2">
                <NavLink className="nav-link" to="/my-orders">
                  My Orders
                </NavLink>
              </li>
              <li className="nav-item my-3 my-lg-0 login-botton">
                {isAuthenticated === true ? (
                  <button
                    className="btn btn-success btn-sm rounded-pill px-4 py-2 mb-2 mb-lg-0 text-white button-stylling"
                    onClick={handleLogOut}
                  >
                    LOGOUT
                  </button>
                ) : (
                  <Link
                    className="btn btn-success btn-sm rounded-pill px-5 py-2 mb-2 mb-lg-0 text-white button-stylling"
                    to="/auth/login"
                  >
                    LOGIN
                  </Link>
                )}
                <button
                  className="btn btn-link btn-sm mt-2 mt-md-0 text-secondary "
                  onClick={() => setToggle(!toggle)}
                >
                  {!toggle ? <SearchOutlinedIcon /> : ""}
                </button>

                <NavLink
                  type="button"
                  className="btn btn-link btn-sm text-secondary mt-2 mt-md-0 position-relative"
                  to="/cart"
                >
                  <ShoppingCartOutlinedIcon />
                  {cartItemsLength === 0 ? (
                    ""
                  ) : (
                    <span className="position-absolute translate-middle badge  rounded-pill bg-danger">
                      {cartItemsLength}
                    </span>
                  )}
                </NavLink>

                <NavLink
                  type="button"
                  className="btn btn-link btn-sm text-secondary mt-2 mt-md-0 position-relative"
                  to="/favourite"
                >
                  <FavoriteBorderOutlinedIcon />
                  {favItemsLength === 0 ? (
                    ""
                  ) : (
                    <span className="position-absolute translate-middle badge  rounded-pill bg-danger">
                      {favItemsLength}
                    </span>
                  )}
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
        {toggle ? (
          <form
            className="input-group px-0 px-lg-5 mt-2"
            onSubmit={handleSubmit}
          >
            <input
              type="search"
              className={`form-control ${
                navBarScroll ? "bg-light text-dark" : "bg-dark text-white"
              } border-success`}
              autoFocus
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search Something..."
            />
            <button
              className="input-group-text btn btn-success text-white rounded-end"
              id="basic-addon2"
            >
              Search
            </button>
            <div className="btn btn-link " onClick={() => setToggle(!toggle)}>
              <CloseOutlinedIcon />
            </div>
          </form>
        ) : (
          ""
        )}
      </div>
    );
}

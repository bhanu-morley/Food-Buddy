import React, { useState, useContext } from 'react';
import './Navbar.css';
import { StoreContext } from '../../../context/StoreContext.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { files } from '../../files/files.js'

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };


  return (
    <div className='navbar'>
      <Link to='/'><img src={files.logo} alt='Logo' className='web-logo' /></Link>

      <ul className='navbar-menu'>
        <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
        <li onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>
          <a href="#explore-menu">Menu</a>
        </li>
        <li onClick={() => setMenu("mobile app")} className={menu === "mobile app" ? "active" : ""}>
          <a href="#app-download">Mobile App</a>
        </li>
        <li onClick={() => setMenu("contact us")} className={menu === "contact us" ? "active" : ""}>
          <a href="#footer">Contact Us</a>
        </li> 
      </ul>

      <div className="navbar-right">
        <img src={files.search_icon} alt="Search" />
        <div className="navbar-search-icon">
          <Link to='/cart'><img src={files.shopping_cart} alt="Cart" /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign in</button>
        ) : (
          <div className="navbar-profile">
            <img src={files.profile_icon} alt="Profile" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate('/myorders')}>
                <img src={files.bag_icon} alt="Orders" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={files.logout_icon} alt="Logout" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

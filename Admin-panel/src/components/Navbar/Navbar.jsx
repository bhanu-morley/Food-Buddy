import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import { files } from "../../assets/files/files";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) setToken(savedToken);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    setToken('');
    navigate("/add");
  };

  return (
    <div className='navbar'>
      <img src={files.logo} className="logo" alt="logo" />

      <div className="profile-container" ref={profileRef}>
        <img
          src={files.account}
          className="profile-icon"
          alt="profile"
          onClick={handleProfileClick}
          style={{ cursor: 'pointer' }}
        />

        {dropdownVisible && (
        <div className="profile-dropdown">
          <li onClick={logout}>
            <p>Admin logout</p>
          </li>
        </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

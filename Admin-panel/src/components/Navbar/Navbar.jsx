import React from 'react';
import './Navbar.css';
import { files } from "../../assets/files/files";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/login');
  };

  return (
    <div className='navbar'>
      <img src={files.logo} className="logo" alt="logo" />
      <img src={files.account} className="profile" alt="profile" onClick={handleProfileClick} style={{ cursor: 'pointer' }} />
    </div>
  );
};

export default Navbar;

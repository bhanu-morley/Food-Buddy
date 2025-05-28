import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <div className='header'>
      <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <p>
          Discover delicious meals crafted with passion. Food Buddy brings you
          fresh, flavorful dishes that satisfy every craving. Taste happiness today!
        </p>
        <a href="#explore-menu">
          <button>View Menu</button>
        </a>
      </div>
    </div>
  );
};

export default Header;

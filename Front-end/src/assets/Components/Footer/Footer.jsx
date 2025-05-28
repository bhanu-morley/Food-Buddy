import React from 'react';
import './Footer.css';
import { files } from '../../files/files';

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={files.logo} alt="FoodBuddy Logo" />
          <p>Food Buddy is your go-to platform for delicious, freshly prepared meals delivered fast. From classic biryanis to spicy starters, we serve happiness in every bite. With an easy-to-use interface, secure orders, and customer-first service, Food Buddy brings the taste of your favorite dishes right to your doorstep.</p>
          <div className="footer-social-icons"><a href="https://www.linkedin.com/in/bhanu-prasanth-regana/">
            <img src={files.linkedin_logo} alt="LinkedIn" />
          </a>
            <img src={files.facebook_logo} alt="Facebook" />
            <img src={files.twitter_logo} alt="Twitter" />
          </div>
        </div>

        <div className="footer-content-center">
          <h2>LINKS</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>
              <a href="tel: +919515926759">+919515926759</a></li>
          </ul>
        </div>
      </div>

      <hr />

      <p className="footer-copyright">
        © 2025 FoodBuddy.com - All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;


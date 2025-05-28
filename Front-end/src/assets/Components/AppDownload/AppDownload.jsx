import React from 'react';
import './AppDownload.css';
import { files } from '../../files/files';

const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
      <p>For a better experience, download <br /> the FoodBuddy App</p>
      <div className="app-download-platforms">
        <img src={files.google_play} alt="Download on Google Play" />
        <img src={files.app_store} alt="Download on App Store" />
      </div>
    </div>
  );
};

export default AppDownload;



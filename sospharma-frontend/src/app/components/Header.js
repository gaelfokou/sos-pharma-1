'use client';

import React from 'react';

import LoadingBar from 'react-redux-loading-bar';

import logo from '../assets/images/logo-sos-pharma.png';

const Header = () => {
  return (
    <header className="bg-light">
      <LoadingBar style={{ backgroundColor: '#218838', height: '3px', position: 'absolute' }} />
      <nav className="container navbar navbar-light">
          <a className="navbar-brand" href="/">
              <img src={logo.src} width="60" alt="" />
          </a>
          <a className="btn btn-success text-truncate rounded-lg rounded-after" href="#">653 080 072</a>
      </nav>
    </header>
  );
};

export default Header;

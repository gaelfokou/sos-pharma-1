'use client';

import React from 'react';

import LoadingBar from 'react-redux-loading-bar';

import logo from '../assets/images/logo-sos-pharma.png';

const Header = ({ deferredPrompt }) => {
  return (
    <header className="bg-light">
      <LoadingBar style={{ backgroundColor: '#218838', height: '3px', position: 'absolute' }} />
      <nav className="container navbar navbar-light">
          <a className="navbar-brand" href="/">
              <img src={logo.src} width="90" alt="" />
          </a>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <a className="btn btn-success text-truncate rounded-btn rounded-after" href="tel:653080072">653 080 072</a>
            {deferredPrompt && (<a className="text-success btn-prompt text-truncate mt-2" href="#">Ajouter à l'écran d'accueil</a>)}
          </div>
      </nav>
    </header>
  );
};

export default Header;

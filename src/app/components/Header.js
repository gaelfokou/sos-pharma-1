import React from 'react';

import logo from '../assets/images/logo-sos-pharma.png';

const Header = () => {
  return (
    <header className="bg-light">
        <nav className="container navbar navbar-light">
            <a className="navbar-brand" href="/">
                <img src={logo.src} width="60" alt="" />
            </a>
            <a className="btn btn-success rounded-lg" href="#">653 080 072</a>
        </nav>
    </header>
  );
};

export default Header;

'use client';

import React, { useState, useEffect, useRef } from 'react';
import logo from './assets/images/logo-sos-pharma.png';
import $ from 'jquery';
import Popper from 'popper.js';

const App = () => {
  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col pt-5">
          <a className="h6 font-weight-bold text-success" href="/">SOS Pharma</a>
          <h4 className="mt-4">Livraison de médicaments à domicile</h4>
          <p className="mt-4 text-muted">Commandez vos médicaments en toute confiance et recevez-les rapidement chez vous avec SOS Pharma. Fini les longues files d'attente à la pharmacie! Avec SOS Pharma, commandez vos médicaments en ligne et recevez-les directement chez vous, en toute confiance et rapidement.</p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 py-5">
          <a className="btn btn-success rounded-lg rounded-after btn-lg btn-block" href="/order-drug">Commandez vos médicaments ici</a>
        </div>
      </div>
    </div>
  );
};

export default App;

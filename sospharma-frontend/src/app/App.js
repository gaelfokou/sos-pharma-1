'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  const { orderData } = useSelector(state => state.order);

  return (
    <div className="container">
      <div className="row">
        <div className="col pt-5">
          <div className="d-flex justify-content-between">
            <a className="h6 font-weight-bold text-success" href="/">SOS Pharma</a>
            {orderData.length > 0 ? (<a className="h6 font-weight-bold text-success" href="/order-list">Historique ({`${orderData.length}`})</a>) : (<a className="h6 font-weight-bold text-success" href="/order-list">Historique</a>)}
          </div>
          <h4 className="mt-4">Livraison de médicaments à domicile</h4>
          <p className="mt-4 text-muted">Commandez vos médicaments en toute confiance et recevez-les rapidement chez vous avec SOS Pharma. Fini les longues files d'attente à la pharmacie! Avec SOS Pharma, commandez vos médicaments en ligne et recevez-les directement chez vous, en toute confiance et rapidement.</p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 py-5">
          <div className="d-flex justify-content-center">
            <a className="btn btn-success text-truncate rounded-lg rounded-after btn-lg btn-width-50" href="/order-drug">Commandez vos médicaments ici</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

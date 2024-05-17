'use client';

import React, { useState, useEffect, useRef } from 'react';
import logo from '../assets/images/logo-sos-pharma.png';
import $ from 'jquery';
import Popper from 'popper.js';

import { useDispatch, useSelector } from 'react-redux';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { orderData } = useSelector(state => state.order);

  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 py-5">
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

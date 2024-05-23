'use client';

import React, { useState, useEffect, useRef } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import 'intl-tel-input/build/css/intlTelInput.css';
import 'font-awesome/css/font-awesome.min.css';
import '../assets/css/style.css';

import Header from "./Header";
import Footer from "./Footer";
import { authCheck } from '../redux/Actions';

import { useDispatch, useSelector } from 'react-redux';

export default function LayoutDashboard({ children }) {
  const dispatch = useDispatch();
  const { auth } = useSelector(state => state.order);

  const propAuthCheck = (callback=null) => dispatch(authCheck(callback));

  useEffect(() => {
    propAuthCheck();
  }, []);

  return (
    <div className="d-flex flex-column justify-content-between vh-100">
      <div className="d-flex flex-column flex-grow-1">
        <Header />
        {children}
      </div>
      <Footer />
    </div>
  );
}

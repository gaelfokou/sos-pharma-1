'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import 'intl-tel-input/build/css/intlTelInput.css';
import 'font-awesome/css/font-awesome.min.css';
import '../assets/css/style.css';

import { authCheck } from '../redux/Actions';

import Header from "./Header";
import Footer from "./Footer";

export default function LayoutDashboard({ children, deferredPrompt }) {
  const dispatch = useDispatch();
  const { auth } = useSelector(state => state.order);

	const propAuthCheck = (token, callback=null) => dispatch(authCheck(token, callback));

  useEffect(() => {
    propAuthCheck(auth);
  }, []);

  return (
    <div className="d-flex flex-column justify-content-between vh-100">
      <div className="d-flex flex-column flex-grow-1">
        <Header deferredPrompt={deferredPrompt} />
        {children}
      </div>
      <Footer />
    </div>
  );
}

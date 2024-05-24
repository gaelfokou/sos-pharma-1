'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import 'intl-tel-input/build/css/intlTelInput.css';
import '../assets/css/style.css';

import { tokenCheck, loadData } from '../redux/Actions';

import Header from "./Header";
import Footer from "./Footer";

export default function LayoutPublic({ children }) {
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.order);

  const propTokenCheck = (token, callback=null) => dispatch(tokenCheck(token, callback));
  const propLoadData = () => dispatch(loadData());

  useEffect(() => {
    propTokenCheck(token);
    propLoadData();
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

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';

import { VERSION_STATE } from '../configs/Constants';
import { purgeStoredState } from '../redux/Actions';

import LayoutPublic from "../components/LayoutPublic";
import LayoutDashboard from "../components/LayoutDashboard";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { version } = useSelector(state => state.order);

  const propPurgeStoredState = () => dispatch(purgeStoredState());

  useEffect(() => {
    if (version !== VERSION_STATE) {
      propPurgeStoredState();
    }
  }, []);

  return (
    <>
      {pathname.startsWith('/dashboard') ? (<LayoutDashboard>
        {children}
      </LayoutDashboard>) : (<LayoutPublic>
        {children}
      </LayoutPublic>)}
    </>
  );
}

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
    document.title =
    pathname.startsWith('/login') ?
      "Connexion | SOS Pharma"
    :
    pathname.startsWith('/dashboard') ?
      "Tableau de bord | SOS Pharma"
    :
    pathname.startsWith('/order-drug') ?
      "Commandez vos médicaments | SOS Pharma"
    :
    pathname.startsWith('/order-list') ?
      "Historique des commandes | SOS Pharma"
    :
      "SOS Pharma";

    if (version !== VERSION_STATE) {
      propPurgeStoredState();
    }
	}, [pathname]);

  return (
    <>
      {pathname.startsWith('/dashboard') ? (
        <LayoutDashboard>
          {children}
        </LayoutDashboard>
      ) : (
        <LayoutPublic>
          {children}
        </LayoutPublic>
      )}
    </>
  );
}

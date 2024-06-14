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
      "SOS Pharma - Connexion"
    :
    pathname.startsWith('/dashboard') ?
      "SOS Pharma - Tableau de bord"
    :
    pathname.startsWith('/order-drug') ?
      "SOS Pharma - Commandez vos médicaments"
    :
    pathname.startsWith('/order-list') ?
      "SOS Pharma - Historique des commandes"
    :
      "SOS Pharma - Commandez vos médicaments en ligne";

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
        pathname.startsWith('/login') ? (
          <LayoutDashboard>
            {children}
          </LayoutDashboard>
        ) : (
          <LayoutPublic>
            {children}
          </LayoutPublic>
        )
      )}
    </>
  );
}

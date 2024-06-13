'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';

import { VERSION_STATE } from '../configs/Constants';
import { purgeStoredState } from '../redux/Actions';

import LayoutPublic from "../components/LayoutPublic";
import LayoutDashboard from "../components/LayoutDashboard";
import { useNetworkCheck } from "../utils/NetworkContext";

const NetworkCheck = ({ status }) => {
  return (
    <div className={`alert ${status ? 'alert-success' : 'alert-danger'}`} role="alert">
      {status ? 'Vous êtes en ligne !' : 'Vous avez perdu la connexion réseau !'}
    </div>
  );
};

const isWebview = () => {
  const userAgent = navigator.userAgent
  const normalizedUserAgent = userAgent.toLowerCase()
  const standalone = navigator.standalone

  const isIos = /ip(ad|hone|od)/.test(normalizedUserAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  const isAndroid = /android/.test(normalizedUserAgent)
  const isSafari = /safari/.test(normalizedUserAgent)
  const isWebview = (isAndroid && /; wv\)/.test(normalizedUserAgent)) || (isIos && !standalone && !isSafari)

  return isWebview
}

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { version } = useSelector(state => state.order);
  const { isOnline } = useNetworkCheck();

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
      {(!isWebview() && !isOnline) && <NetworkCheck status={isOnline} />}
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

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

  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const title =
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

    document.title = title;

    const addBtn = document.querySelector('.btn-prompt');

    window.addEventListener('beforeinstallprompt', handleEvent);

    if (addBtn !== null) {
      addBtn.addEventListener('click', handleBtn);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleEvent);

      if (addBtn !== null) {
        addBtn.removeEventListener('click', handleBtn);
      }
    }
	}, [pathname, deferredPrompt]);

  const handleEvent = (event) => {
    event.preventDefault();

    setDeferredPrompt(event);
  };

  const handleBtn = async (event) => {
    event.preventDefault();

    const title = document.title;

    document.title = title.split(' - ')[0];
    console.log('title 1 :', document.title);
    console.log('deferredPrompt :', deferredPrompt);

    if (deferredPrompt !== null) {
      deferredPrompt.prompt();

      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
    }

    document.title = title;
    console.log('title 2 :', document.title);

    setDeferredPrompt(null);
  };

  return (
    <>
      {pathname.startsWith('/dashboard') ? (
        <LayoutDashboard
          deferredPrompt={deferredPrompt}
        >
          {children}
        </LayoutDashboard>
      ) : (
        pathname.startsWith('/login') ? (
          <LayoutDashboard
            deferredPrompt={deferredPrompt}
          >
            {children}
          </LayoutDashboard>
        ) : (
          <LayoutPublic
            deferredPrompt={deferredPrompt}
          >
            {children}
          </LayoutPublic>
        )
      )}
    </>
  );
}

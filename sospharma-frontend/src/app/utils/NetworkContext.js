'use client';

import {useContext, createContext, useEffect, useState, useCallback} from 'react';

export const NetworkContext = createContext(null);

export const NetworkProvider = ({children}) => {
  const [isOnline, setOnlineStatus] = useState(true);

  const handleConnectionChange = () => {
    setOnlineStatus(navigator.onLine);
  };

  const getNetworkConnection = () => {
    return (
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection ||
      null
    );
  }

  useEffect(() => {
    handleConnectionChange();
  }, []);

  useEffect(() => {
    window.addEventListener("load", handleConnectionChange);
    window.addEventListener("online", handleConnectionChange);
    window.addEventListener("offline", handleConnectionChange);

    const connection = getNetworkConnection();
    connection?.addEventListener("change", handleConnectionChange);

    return () => {
      window.removeEventListener("load", handleConnectionChange);
      window.removeEventListener("online", handleConnectionChange);
      window.removeEventListener("offline", handleConnectionChange);
      connection?.removeEventListener("change", handleConnectionChange);
    };
  }, [isOnline]);

  return (
    <NetworkContext.Provider value={{isOnline}}>{children}</NetworkContext.Provider>
  );
}

export const useNetworkCheck = ()=>{
  const context = useContext(NetworkContext);
  if(!!!context){
      throw Error("useNetworkCheck must be inside of NetworkProvider");
  }

  return context;
}

export default NetworkProvider;

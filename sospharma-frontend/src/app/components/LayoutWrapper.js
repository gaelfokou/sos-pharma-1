'use client';

import { usePathname } from 'next/navigation';

import LayoutPublic from "../components/LayoutPublic";
import LayoutDashboard from "../components/LayoutDashboard";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

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

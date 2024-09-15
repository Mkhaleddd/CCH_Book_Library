// src/components/Layout.tsx

import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

// Define the props interface for the Layout component
interface LayoutProps {
  recentSearches: string[];
  setRecentSearches: React.Dispatch<React.SetStateAction<string[]>>;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  debounceVal: unknown;
}

const Layout: React.FC<LayoutProps> = ({
  recentSearches,
  setRecentSearches,
  setSearchTerm,
  debounceVal
}) => {
  const location = useLocation();
  const showNavbar = ['/', '/library', '/favourites', '/settings', '/support'].includes(location.pathname);

  return (
    <>
      {showNavbar && (
        <Navbar
          recentSearches={recentSearches}
          setRecentSearches={setRecentSearches}
          setSearchTerm={setSearchTerm}
          debounceVal={debounceVal}
        />
      )}

      <Outlet />
    </>
  );
};

export default Layout;

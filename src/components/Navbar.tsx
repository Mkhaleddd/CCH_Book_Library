import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaQuestionCircle, FaCog, FaSearch } from 'react-icons/fa';
import { IoLibrary } from 'react-icons/io5';
import { SlHeart } from 'react-icons/sl';
import { MdLogout } from 'react-icons/md';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { onChangeHandler } from '../utils';

// Define the props interface for the Navbar component
interface NavbarProps {
  recentSearches: string[];
  setRecentSearches: React.Dispatch<React.SetStateAction<string[]>>;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  debounceVal: unknown;
}

const Navbar: React.FC<NavbarProps> = ({
  recentSearches,
  setRecentSearches,
  setSearchTerm,
  debounceVal
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <> 
      <header className="flex  md:flex-row  bg-gray-100 shadow-md fixed top-0 left-0 right-0 z-20">
        <div className="relative flex items-center p-4 ">
          <FaSearch className="absolute left-6 text-gray-400" />
          <input 
            type="search" 
            name="search" 
            className="text-lg bg-slate-200 outline-blue-800 pl-10 pr-4 py-2 rounded-lg w-full" 
            placeholder="Search your favourite book" 
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            onChange={e => onChangeHandler(e, setRecentSearches, setSearchTerm, debounceVal)}
          />
        </div>
          <button
            className="md:hidden p-2 bg-gray-100 text-gray-500 hover:text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
          <nav className={`flex flex-col md:flex-row self-center md:items-center md:space-x-4 ${isMenuOpen ? 'block absolute md:relative bg-gray-100 w-full top-16 md:top-0  ' : 'hidden  '} md:block`}>
            <ul className="flex  flex-col md:flex-row space-x-4 space-y-2">
            <h1 className='text-2xl font-bold mr-2'>
            <span className='text-blue-950'>Book</span> Base
          </h1>
              <li className='text-lg font-medium text-gray-400 hover:font-bold hover:text-blue-950'>
                <NavLink
                  to='/'
                  className={({ isActive }) =>
                    `flex items-center ${isActive ? 'text-blue-950 font-bold' : 'text-gray-400'}`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaHome className="mr-2 w-6 h-6" />
                  Discover
                </NavLink>
              </li>
              <li className='text-lg font-medium text-gray-400 hover:font-bold hover:text-blue-950'>
                <NavLink
                  to='/library'
                  className={({ isActive }) =>
                    `flex items-center ${isActive ? 'text-blue-950 font-bold' : 'text-gray-400'}`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  <IoLibrary className="mr-2 w-6 h-6" />
                  My Library
                </NavLink>
              </li>
              <li className='text-lg font-medium text-gray-400 hover:font-bold hover:text-blue-950'>
                <NavLink
                  to='/favourites'
                  className={({ isActive }) =>
                    `flex items-center ${isActive ? 'text-blue-950 font-bold' : 'text-gray-400'}`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  <SlHeart className="mr-2 w-6 h-6" />
                  Favourites
                </NavLink>
              </li>
              <li className='text-lg font-medium text-gray-400 hover:font-bold hover:text-blue-950'>
                <NavLink
                  to='/settings'
                  className={({ isActive }) =>
                    `flex items-center ${isActive ? 'text-blue-950 font-bold' : 'text-gray-400'}`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaCog className="mr-2 w-6 h-6" />
                  Settings
                </NavLink>
              </li>
              <li className='text-lg font-medium text-gray-400 hover:font-bold hover:text-blue-950'>
                <NavLink
                  to='/support'
                  className={({ isActive }) =>
                    `flex items-center ${isActive ? 'text-blue-950 font-bold' : 'text-gray-400'}`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaQuestionCircle className="mr-2 w-6 h-6" />
                  Support
                </NavLink>
              </li>
              <li className='text-lg font-medium text-gray-400 hover:font-bold hover:text-blue-950'>
                <NavLink
                  to='/login'
                  className={({ isActive }) =>
                    `flex items-center ${isActive ? 'text-blue-950 font-bold' : 'text-gray-400'}`
                  }
                  onClick={handleLogout}
                >
                  <MdLogout className="mr-2 w-6 h-6" />
                  Logout
                </NavLink>
              </li>
            </ul>
          </nav>
       
      </header>
     
      {isInputFocused && (
            <div className='absolute bg-gray-100 text-base text-gray-600 divide-y w-full z-10  top-1 md:mt-16 p-2 shadow-lg rounded-lg'>
              {recentSearches.filter(el => el !== "").slice(-6).map((el, index) => (
                <div key={index} className="p-1 hover:bg-gray-200 cursor-pointer">
                  {el}
                </div>
              ))}
            </div>
          )}
    </>
  );
};

export default Navbar;

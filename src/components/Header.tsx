import { FC } from "react";
import { onChangeHandler } from "../utils"
import { FaSearch } from 'react-icons/fa'


interface HeaderProps {
    recentSearches: string[]; // Assuming recentSearches is an array of strings
    setRecentSearches: React.Dispatch<React.SetStateAction<string[]>>; // Function to update recent searches
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>; // Function to update search term
    debounceVal: unknown; 
  }
  
const Header : FC<HeaderProps> = ({recentSearches,setRecentSearches,setSearchTerm,debounceVal}) => {
  return (
    <>
    <div className="flex-col">
        <div className="relative flex items-center">
      <FaSearch className="absolute left-12 md:left-3 text-gray-400" />
      <input 
        type="search" 
        name="search" 
        className="ml-10 :ml-0 text-lg bg-slate-200 outline-blue-800 pl-10 pr-4 py-2  rounded-lg w-full" 
        placeholder="Search your favourite book" 
        onChange={e => onChangeHandler(e, setRecentSearches, setSearchTerm, debounceVal)}
      />
    </div>
      <div className='text-base text-gray-600 bg-gray-100  divide-y w-1/2 left-10 relative  p-2 '>
      {recentSearches.filter(el=>el!="").slice(-6,-1).map(el=>(
        <div>{el}</div>
      ))}
    </div>
    </div>
    
    </>
  )
}

export default Header
import { FC, useMemo, useState } from 'react';
import { ActionTypes, Book } from '../Reducers/CartReducer';
import { filterCategories, sortBooks, SortCriteria } from '../utils';
import BookCarousel from './BookCarousel';
import {FaSortUp} from "react-icons/fa";

interface CategeriozedBookListProps {
  categories: string[];
  filtered: Book[];
  setFiltered: React.Dispatch<React.SetStateAction<Book[]>>;
  books: Book[];
  isFavorite: boolean;
  setIsFavourite: React.Dispatch<React.SetStateAction<boolean>>;
  dispatch:React.Dispatch<ActionTypes>;
}

const CategeriozedBookList: FC<CategeriozedBookListProps> = ({ categories, filtered, setFiltered, books, isFavorite, setIsFavourite,dispatch }) => {
  const [selected,setSelected]=useState<null | string>(null)
   const sortedBooks = useMemo(() => {
    return sortBooks(filtered, SortCriteria.TITLE_ASC);
  }, [filtered]);

  const handleSort = () => {
    setFiltered(sortedBooks);
  };
  return (
    <>
      <section className='bg-gray-100 p-4 w-3/5 overflow-hidden mx-auto my-4 rounded-md relative'>
        <div className="flex justify-between items-center mb-4">
          <span className='text-black text-2xl md:text-4xl font-semibold'>Categories</span>
          <button className='text-blue-600 bg-blue-100 hover:bg-blue-700 hover:text-white text-sm md:text-base px-3 py-1 md:px-4 md:py-2 rounded-lg'
           onClick={()=>handleSort()}
          >
            <FaSortUp />
          </button>
        </div>
        <div className="mt-6">
          <ul><button
                className={`rounded-lg inline text-gray-800 bg-blue-10 ${selected==="all"?"text-white bg-blue-700":""} font-semibold text-sm md:text-base p-2 m-1`}
                onClick={() => filterCategories("all", setFiltered, books,setSelected)}
              >
                All
              </button>
            {categories.filter(el => el != null).map((val, index) => (
              <button
                key={index}
                className={`rounded-lg inline text-gray-800 bg-blue-10 ${selected===val?"text-white bg-blue-700":""} font-semibold text-sm md:text-base p-2 m-1`}
                onClick={() => filterCategories(val, setFiltered, books,setSelected)}
              >
                {val}
              </button>
            ))}
          </ul>
        </div>
        <div className='relative'>
        <BookCarousel
           books={filtered}
           dispatch={dispatch}
           isFavorite={isFavorite}
           setIsFavourite={setIsFavourite}

         />
         
        </div>
      </section>
      
    </>
  );
};

export default CategeriozedBookList;

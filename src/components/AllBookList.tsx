import { FC } from 'react';
import BookCard from './BookCard';
import { ActionTypes, Book } from "../Reducers/CartReducer";
import BookCarousel from './BookCarousel';

interface AllBookListProps {
  books: Book[];
  dispatch: React.Dispatch<ActionTypes>;
  isFavorite: boolean;
  setIsFavourite: React.Dispatch<React.SetStateAction<boolean>>;
}

const AllBookList: FC<AllBookListProps> = ({ books, dispatch, isFavorite, setIsFavourite }) => {

  return (
    <section className='bg-gray-100 p-6 mt-24  mx-auto rounded-md w-3/5 overflow-hidden'>
      <div className="flex justify-between items-center mb-4">
        <span className='text-black text-2xl md:text-4xl font-semibold'>Recommended</span>
      </div>
      <div className='relative overflow-hidden'>
         <BookCarousel
           books={books}
           dispatch={dispatch}
           isFavorite={isFavorite}
           setIsFavourite={setIsFavourite}
         />

        
      </div>
    </section>
  );
}

export default AllBookList;

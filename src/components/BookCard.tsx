import React, { FC, useState } from 'react';
import { ActionTypes, Book } from '../Reducers/CartReducer';
import { successToast } from '../utils';
import { SlHeart } from "react-icons/sl";
import BookDetails from './BookDetails';

export interface BookCardProps {
  book: Book; // Updated the prop type to Book
  isFavorite?: boolean;
  dispatch: React.Dispatch<ActionTypes>;
  setIsFavourite: React.Dispatch<React.SetStateAction<boolean>>;
}

const BookCard: FC<BookCardProps> = ({ book, isFavorite = false, setIsFavourite, dispatch }) => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const handleBookClick = () => {
    setSelectedBook(book);
  };

  const handleCloseDetail = () => {
    setSelectedBook(null);
  };

  const handleLikeClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent triggering the book click event
    const newIsFavorite = !isFavorite;
    setIsFavourite(newIsFavorite);
    console.log("action", newIsFavorite);
    if (dispatch) {
      if (newIsFavorite) {
        dispatch({ type: 'ADD_TO_FAVORITES', payload: book });
        successToast('The book is added to Favourites');
        console.log("Added to favorites");
      } else {
        dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: book.id });
        successToast('The book is removed from Favourites');
        console.log("Removed from favorites");
      }
    }
  };

  return (
    <>
      <div
        id={book.id}
        className='flex-col bg-white mb-2 p-2 w-52 rounded-lg shadow-sm hover:cursor-pointer'
        onClick={handleBookClick}
      >
        <button
          className={`relative z-10 top-2 left-1 p-2 rounded-full bg-white shadow-md transition-opacity duration-300 ${isFavorite ? 'text-red-500' : 'text-gray-400'} opacity-0 hover:opacity-100`}
          onClick={handleLikeClick}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <SlHeart size={24} />
        </button>
        <img
          loading='lazy'
          src={book.volumeInfo.imageLinks?.thumbnail || '/default-image.jpg'}
          alt={book.volumeInfo.title}
          className="w-full h-48 object-cover relative bottom-6"
        />
        <p className='text-md text-black m-2 text-lg font-semibold truncate'>{book.volumeInfo.title}</p>
        <p className='text-gray-700 text-sm font-semibold'>{book.volumeInfo.authors?.join(', ') || 'Unknown Author'}</p>
      </div>
      {selectedBook &&
        <BookDetails
          key={selectedBook.id}
          book={book}
          onClose={handleCloseDetail}
          dispatch={dispatch}
        />
      }
    </>
  );
};

export default BookCard;

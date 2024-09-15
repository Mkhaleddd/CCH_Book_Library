import React, { useEffect, useRef } from 'react';
import { ActionTypes, Book } from '../Reducers/CartReducer';

interface BookDetailProps {
  book: Book | null; 
  onClose: () => void;
  dispatch: React.Dispatch<ActionTypes>
}

const BookDetail: React.FC<BookDetailProps> = ({ book, onClose,dispatch }) => {
  if (!book) return null; // Return null if no book is selected
  const detailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (detailRef.current && !detailRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose])
  const {
    id,
    volumeInfo: {
      imageLinks: { thumbnail } = { thumbnail: '/default-image.jpg' },
      title,
      authors = ['Unknown Author'],
      description = 'No description available.',
      publishedDate = 'Unknown date',
    }
  } = book;

  return (
    <div 
    ref={detailRef} 
    className="fixed top-0 right-0 sm:w-1/3 w-2/3 h-full bg-blue-950 shadow-lg rounded-l-lg p-8 hide-scrollbar z-50" 
    id={id}>
      <div className="flex flex-col items-center">
        <img
          src={thumbnail}
          alt={title}
          className="w-48 h-64 object-cover mb-4"
        />
        <h2 className="text-1xl font-bold text-white  mb-2">{title}</h2>
        <p className="text-md font-semibold text-blue-100 mb-2">{authors.join(', ')}</p>
        <p className="text-blue-100 mb-4">{publishedDate}</p>
        <p className="text-blue-100 mb-4  text-sm  whitespace-pre-wrap hide-scrollbar ">{description}</p>
           
        <button
            className="px-4 py-2  bg-blue-700 ml-12 m-3 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 active:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-transform transform active:scale-95"
           onClick={()=>dispatch({type:"ADD_TO_CART",payload:book})}
          >
             Read Now
          </button>
      </div>
    </div>
  );
};

export default BookDetail;

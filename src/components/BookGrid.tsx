import { FC, useMemo, useState } from 'react';
import { Book, ActionTypes } from '../Reducers/CartReducer';
import SortingComponent from './SortingComponent';
import { sortBooks } from '../utils';

interface BookGridProps {
  booksDisplay: Book[];
  dispatch: React.Dispatch<ActionTypes>;
}

const BookGrid: FC<BookGridProps> = ({ booksDisplay, dispatch }) => {
  const [sortCriteria, setSortCriteria] = useState<SortCriteria>('title-asc');
  const sortedBooks = useMemo(() => {
    return sortBooks(booksDisplay, sortCriteria);
  }, [sortCriteria, booksDisplay]);
 
  return (
    <>
    <div className="p-4 bg-gray-100 min-h-screen m-4 mt-24 rounded-sm w-full md:w-3/5 mx-auto">
      {sortedBooks.length === 0 ? (
        <p className="text-center text-gray-700">No books to display.</p>
      ) : (
            <>    
                      <SortingComponent 
                          sortCriteria={sortCriteria}
                          setSortCriteria={setSortCriteria}
                     />
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {sortedBooks.map(book => (
                    <div
                      key={book.id}
                      className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
                    >
                      <img
                        src={book.volumeInfo.imageLinks?.thumbnail || '/default-image.jpg'}
                        alt={book.volumeInfo.title || 'Book cover'}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4 flex-col">
                        <h3 className="text-lg font-semibold text-black truncate">{book.volumeInfo.title}</h3>
                        <p className="text-gray-600 mt-1">{book.volumeInfo.authors?.join(', ') || 'Unknown Author'}</p>
                        {book.volumeInfo.description && (
                          <p className='text-gray-800 mt-2 text-sm truncate'>{book.volumeInfo.description}</p>
                        )}
                        <a
                          href={book.volumeInfo.infoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-700 hover:underline"
                        >
                          More Details
                        </a>
                      </div>
                      
                      <button
                        className="px-4 py-2 bg-blue-700 m-3 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 active:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-transform transform active:scale-95"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevents the click event from bubbling up
                          dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: book.id });
                          dispatch({type:"REMOVE_FROM_CART",payload:book.id})
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
            </>
        
      )}
    </div>
    </>
    
    
  );
};

export default BookGrid;


import { FC, } from 'react';
import BookCard from './BookCard'
import { Book } from '../Reducers/CartReducer';

interface FavProps {
  favourites: Book[];
  
}
const FavouriteBooks :FC<FavProps> = ({favourites}) => {
  return (
    <>
       <div className='bg-gray-100 p-6 w-3/5 mx-auto my-4 rounded-md'>
      <h2 className='text-black text-4xl mb-4'>Cart</h2>
      {favourites.length === 0? (
        <p>Your cart is empty.</p>
      ) : (
        <div className=' grid grid-flow-col auto-cols-max md:auto-cols-min gap-4 md:gap-6 mb-2 mt-3 snap-center md:snap-start'>
             {favourites.map(book => (
            <BookCard
              key={book.id}
              id={book.id}
              img={book.volumeInfo.imageLinks?.thumbnail}
              title={book.volumeInfo.title}
              author={book.volumeInfo?.authors?
                book.volumeInfo.authors[0] :
                 "unknown"}
            />
          ))}
        </div>
      )}
    </div>
    </>
  )
}

export default FavouriteBooks
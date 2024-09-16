import { FC } from 'react';
import { ActionTypes, Book } from '../Reducers/CartReducer';
import BookCard from './BookCard';
import Skeleton from './Skeleton';

interface BookCarouselProps {
  books: Book[];
  dispatch: React.Dispatch<ActionTypes>;
  isFavorite: boolean;
  setIsFavourite:React.Dispatch<React.SetStateAction<boolean>>
}

const BookCarousel: FC<BookCarouselProps> = ({ books, dispatch, isFavorite, setIsFavourite }) => {
  
  return (
    <section className="relative  overflow-hidden">
      <div
        id="carousel"
        className="  flex overflow-x-auto snap-x snap-mandatory gap-6 py-4 whitespace-nowrap"
        style={{ scrollBehavior: 'smooth' }}
      >
        {books.length > 0  ? (
          books.map(book => (
            <BookCard
              key={book.id}
              book={book}
              isFavorite={isFavorite}
              dispatch={dispatch}
              setIsFavourite={setIsFavourite}
            />
          ))
        ) : (
            
              Array.from({length:4}).map((_,key)=>
                      (
                        <Skeleton key={key}/>
                      ))
        )}
      </div>
    
    </section>
  );
}

export default BookCarousel;

// Favorites.tsx
import  { FC } from 'react';
import { ActionTypes, Book } from '../Reducers/CartReducer';
import BookGrid from '../components/BookGrid';

interface FavoritesProps {
  favourites: Book[];
  dispatch: React.Dispatch<ActionTypes>;
 
}

const Favorites: FC<FavoritesProps> = ({ favourites,dispatch }) => {
  return (
    <BookGrid 
     booksDisplay={favourites}
     dispatch={dispatch} 
    />
  );
};

export default Favorites;

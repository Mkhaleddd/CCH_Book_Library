import React from 'react';
import Cart from '../components/Cart';
import { ActionTypes, Book } from '../Reducers/CartReducer';

interface LibraryProps {
  cart: Book[]; 
  dispatch: React.Dispatch<ActionTypes>;

}

const Library: React.FC<LibraryProps> = ({ cart, dispatch }) => {
  return (
    <>
      <Cart 
        cart={cart}
        dispatch={dispatch} 
      />
    </>
  );
}

export default Library;

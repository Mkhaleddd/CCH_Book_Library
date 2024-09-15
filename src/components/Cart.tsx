import { FC } from 'react';
import { ActionTypes, Book } from '../Reducers/CartReducer';
import BookGrid from './BookGrid';

interface CartProps {
  cart: Book[];
  dispatch: React.Dispatch<ActionTypes>;
}

const Cart: FC<CartProps> = ({ cart,dispatch}) => {
      
 
  return (
    <BookGrid
      booksDisplay={cart} 
      dispatch={dispatch}
    />
  );
};

export default Cart;

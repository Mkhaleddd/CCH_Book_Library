
export interface Book {
    id: string;
    volumeInfo: {
      [x: string]: any;
      categories?: undefined  | string[];
      title: string;
      authors: string[] | undefined;
      publishedDate?: string;
      description?:string;
    };
  }

  interface State {
    books: Book[];
    cart: Book[]; 
    favourites:Book[];
  }
  
 
  const ADD_BOOKS = "ADD_BOOKS";
  const ADD_TO_CART="ADD_TO_CART";
  const ADD_TO_FAVORITES="ADD_TO_FAVORITES";
  const REMOVE_FROM_CART="REMOVE_FROM_CART";
  const REMOVE_FROM_FAVORITES="REMOVE_FROM_FAVORITES";

  interface AddBooksAction {
    type: typeof ADD_BOOKS;
    payload: Book[];
  }
 
  interface AddToCartAction {
    type: typeof ADD_TO_CART;
    payload: Book;
  }
  interface AddToFavAction {
    type:typeof ADD_TO_FAVORITES;
    payload:Book;
  }
  interface RemoveFromCartAction{
    type:typeof REMOVE_FROM_CART;
    payload:string
  }
  interface RemoveFromFavAction{
    type:typeof REMOVE_FROM_FAVORITES;
    payload:string
  }
 export type ActionTypes =AddBooksAction | AddToCartAction | AddToFavAction | RemoveFromCartAction | RemoveFromFavAction
  
export const cartReducer = (state: State, action: ActionTypes) => {
  switch (action.type) {
    case ADD_BOOKS:
      return { ...state, books: action.payload };
    case ADD_TO_CART:
      return {...state,cart: [...state.cart, action.payload]};
    case ADD_TO_FAVORITES:
      return{...state,favourites:[...state.favourites,action.payload]}
    case REMOVE_FROM_CART:
      return{...state,cart:state.cart.filter(f=>f.id!==action.payload)}

    case REMOVE_FROM_FAVORITES:
      return{...state,favourites:state.favourites.filter(f=>f.id!==action.payload)}
        
    default:
      return state
   }
  };
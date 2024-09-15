import React from 'react';
import { ActionTypes, Book } from '../Reducers/CartReducer';
import AllBookList from '../components/AllBookList';
import CategorizedBookList from '../components/CategeriozedBookList'; // Fixed import name

interface HomePageProps {
  categories: string[]; // Categories for book categorization
  filtered: Book[]; // List of filtered books
  setFiltered: React.Dispatch<React.SetStateAction<Book[]>>; // Function to update filtered books
  books: Book[]; // List of all books
  dispatch: React.Dispatch<ActionTypes>; // Dispatch function for cart actions
  isFavorite: boolean; // Whether the book is a favorite
  setIsFavourite: React.Dispatch<React.SetStateAction<boolean>>; // Function to update favorite status
}

const HomePage: React.FC<HomePageProps> = ({
  categories,
  filtered,
  setFiltered,
  books,
  dispatch,
  isFavorite,
  setIsFavourite,

}) => {
  return (
    <>
     
      <AllBookList
        books={books}
        isFavorite={isFavorite}
        setIsFavourite={setIsFavourite}
        dispatch={dispatch}
      />
      <CategorizedBookList
        categories={categories}
        filtered={filtered}
        setFiltered={setFiltered}
        books={books}
        dispatch={dispatch}
        isFavorite={isFavorite}
        setIsFavourite={setIsFavourite}
      />
    </>
  );
}

export default HomePage;

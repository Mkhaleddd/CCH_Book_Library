// src/App.tsx

import { useState, useEffect, useReducer, lazy, Suspense, memo } from 'react';
import useDebounce from './hooks/useDebounce';
import './App.css';
import axios from 'axios';
import { Book, cartReducer } from './Reducers/CartReducer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loader from './components/Loader';
import PrivateRoute from './pages/PrivateRoute';
import Layout from './pages/Layout';

const SignUpPage = lazy(() => import('./pages/SignUp'));
const LoginPage = lazy(() => import('./pages/LogIn'));
const Settings = lazy(() => import('./pages/Settings'));
const Support = lazy(() => import('./pages/Support'));
const NotFound = lazy(() => import('./pages/NotFound'));
const HomePage = memo(lazy(() => import('./pages/HomePage')));
const Favourites = memo(lazy(() => import('./pages/Favourites')));
const Library = memo(lazy(() => import('./pages/Library')));

function App() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const debounceVal = useDebounce(searchTerm); 
  const [filtered, setFiltered] = useState<Book[]>([]);
  const [isFavorite, setIsFavourite] = useState(false);
  const [state, dispatch] = useReducer(cartReducer, {
    books: [],
    cart: [],
    favourites: [],
  });

  const { books, cart, favourites } = state;

  const fetchProducts = async () => {
    try {
      const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;
      const { data } = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${debounceVal || ''}&key=${API_KEY}&maxResults=15`);
      const fetchedBooks: Book[] = data.items || [];
      dispatch({ type: 'ADD_BOOKS', payload: fetchedBooks });
      console.log(data)
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    if (debounceVal) {
      fetchProducts();
    }
  }, [debounceVal]);

  const categories = [...new Set(books.flatMap((p) => p.volumeInfo?.categories || []))].filter(Boolean);

  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route 
            path="/" 
            element={
              <Layout 
                recentSearches={recentSearches} 
                setRecentSearches={setRecentSearches}
                setSearchTerm={setSearchTerm}
                debounceVal={debounceVal}
              />
            }
          >
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <HomePage
                    categories={categories}
                    filtered={filtered}
                    setFiltered={setFiltered}
                    books={books}
                    dispatch={dispatch}
                    isFavorite={isFavorite}
                    setIsFavourite={setIsFavourite}
                  />
                </PrivateRoute>
              }
            />
            <Route
              path="/library"
              element={
                <PrivateRoute >
                  <Library
                    cart={cart}
                    dispatch={dispatch}
                  />
                </PrivateRoute>
              }
            />
            <Route
              path="/favourites"
              element={
                <PrivateRoute>
                  <Favourites
                    favourites={favourites}
                    dispatch={dispatch}
                  />
                </PrivateRoute>
              }
            />
            <Route path="/settings" element={<Settings />} />
            <Route path="/support" element={<Support />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;

'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setBooks } from '../store/slices/bookSlice';
import { RootState } from '../store';
import { useSelector } from 'react-redux';

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const books = useSelector((state: RootState) => state.books.books);
  const dispatch = useDispatch();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    setQuery(searchTerm);

    const filteredBooks = books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm)
    );

    dispatch(setBooks(filteredBooks));
  };

  return (
    <div className="p-4 mb-4">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search by title or author"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
};

export default Search;

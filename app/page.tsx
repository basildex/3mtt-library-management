'use client';

import React from 'react';
import BookList from '../components/BookList';
import Search from '../components/Search';
import { store } from '../store';
import { Provider } from 'react-redux';

const HomePage: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          Library Management System by Basil Ilenikhena
        </h1>
        <Search />
        <BookList />
      </div>
    </Provider>
  );
};

export default HomePage;

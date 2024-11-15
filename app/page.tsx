'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import BookList from '../components/BookList';
import Search from '../components/Search';
import LibrarianPanel from '../components/LibrarianPanel';
import { RootState } from '../store';

import { useDispatch } from 'react-redux';
import { setUserRole } from '../store/slices/userSlice';

const HomePage: React.FC = () => {
  const userRole = useSelector((state: RootState) => state.user.role);

  const dispatch = useDispatch();

  const loginAsLibrarian = () => {
    dispatch(setUserRole('librarian'));
  };

  const loginAsMember = () => {
    dispatch(setUserRole('member'));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Library Management System
      </h1>
      <div className="flex justify-around">
        <div className="m-2">
          <button
            title="Librarian Button"
            onClick={loginAsLibrarian}
            className="px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Open Librarian Panel
          </button>
        </div>
        <div className="m-2">
          <button
            title="Member Button"
            onClick={loginAsMember}
            className="px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Open Member Panel
          </button>
        </div>
      </div>

      {userRole === 'member' && <Search />}
      {userRole === 'librarian' && <LibrarianPanel />}
      {userRole === 'member' && <BookList />}
    </div>
  );
};

export default HomePage;

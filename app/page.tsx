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

  const toggleRole = () => {
    const newRole = userRole === 'member' ? 'librarian' : 'member';
    dispatch(setUserRole(newRole));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Library Management System
      </h1>
      <div className="mb-4">
        <button
          onClick={toggleRole}
          className="px-4 py-2 bg-purple-500 text-white rounded-md"
        >
          Switch to {userRole === 'member' ? 'librarian' : 'member'}
        </button>
        <p className="mt-2">Current Role: {userRole}</p>
      </div>
      {userRole === 'member' && <Search />}
      {userRole === 'librarian' && <LibrarianPanel />}
      {userRole === 'member' && <BookList />}
    </div>
  );
};

export default HomePage;

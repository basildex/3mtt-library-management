'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { borrowBook, returnBook } from '../store/slices/bookSlice';

interface Book {
  id: string;
  title: string;
  author: string;
  ISBN: string;
  isAvailable: boolean;
}

const BookList: React.FC = () => {
  const dispatch = useDispatch();
  const books = useSelector((state: RootState) => state.books.books);

  const handleBorrow = (bookId: string, role: 'Member' | 'Librarian') => {
    dispatch(borrowBook({ bookId, role }));
  };

  const handleReturn = (bookId: string) => {
    dispatch(returnBook(bookId));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Book List</h2>
      <ul className="space-y-4">
        {books.map((book: Book) => (
          <li
            key={book.id}
            className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md"
          >
            <div>
              <h3 className="text-lg font-semibold text-blue-400">
                {book.title}
              </h3>
              <p className="text-sm text-gray-600">Author: {book.author}</p>
              <p className="text-sm text-gray-600">ISBN: {book.ISBN}</p>
              <p className="text-sm text-gray-600">
                Availability: {book.isAvailable ? 'Available' : 'Borrowed'}
              </p>
            </div>
            <div className="flex space-x-2">
              {book.isAvailable ? (
                <>
                  <button
                    onClick={() => handleBorrow(book.id, 'Member')}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                  >
                    Borrow as Member
                  </button>
                  <button
                    onClick={() => handleBorrow(book.id, 'Librarian')}
                    className="px-4 py-2 bg-green-500 text-white rounded-md"
                  >
                    Borrow as Librarian
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleReturn(book.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                >
                  Return
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;

'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { borrowBook, returnBook } from '../store/slices/bookSlice';

const BookList: React.FC = () => {
  const dispatch = useDispatch();

  // Subscribe to Redux state
  const books = useSelector((state: RootState) => state.books.books);
  const filteredBooks = useSelector(
    (state: RootState) => state.books.filteredBooks
  );
  const userRole = useSelector((state: RootState) => state.user.role); // Assuming you have user role in state

  // Determine which list to display
  const displayedBooks = filteredBooks?.length ? filteredBooks : books;

  const handleBorrow = (bookIsbn: string, role: 'Member' | 'Librarian') => {
    dispatch(borrowBook({ isbn: bookIsbn, role }));
  };

  const handleReturn = (bookIsbn: string) => {
    dispatch(returnBook(bookIsbn));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Book List</h2>
      {displayedBooks.length === 0 ? (
        filteredBooks !== null ? (
          <p className="text-gray-500">No books match your search.</p>
        ) : (
          <p className="text-gray-500">No books available.</p>
        )
      ) : (
        <ul className="space-y-4">
          {displayedBooks.map((book) => (
            <li
              key={book.id}
              className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md"
            >
              <div>
                <h3 className="text-lg font-semibold text-blue-400">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-600">Author: {book.author}</p>
                <p className="text-sm text-gray-600">ISBN: {book.isbn}</p>
                <p className="text-sm text-gray-600">
                  Availability: {book.available ? 'Available' : 'Borrowed'}
                </p>
              </div>
              <div className="flex space-x-2">
                {book.available ? (
                  <>
                    <button
                      onClick={() => handleBorrow(book.isbn, 'Member')}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                      Borrow as Member
                    </button>
                    {userRole === 'librarian' && (
                      <button
                        onClick={() => handleBorrow(book.isbn, 'Librarian')}
                        className="px-4 py-2 bg-green-500 text-white rounded-md"
                      >
                        Toggle Availability
                      </button>
                    )}
                  </>
                ) : (
                  <button
                    onClick={() => handleReturn(book.isbn)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md"
                  >
                    Return
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookList;

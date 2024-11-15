import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addBook,
  toggleBookStatus,
  removeBook,
} from '../store/slices/bookSlice';
import { RootState } from '../store';

const LibrarianPanel: React.FC = () => {
  const dispatch = useDispatch();
  const books = useSelector((state: RootState) => state.books.books);
  const [newBook, setNewBook] = useState({
    id: '',
    title: '',
    author: '',
    isbn: '',
    available: false,
  });
  const [isbnToRemove, setIsbnToRemove] = useState('');

  const handleAddBook = () => {
    if (newBook.title && newBook.author && newBook.isbn && newBook.available) {
      dispatch(addBook(newBook));
      setNewBook({
        id: String(books.length + 1),
        title: '',
        author: '',
        isbn: '',
        available: false,
      });
    }
  };

  const handleRemoveBook = () => {
    if (isbnToRemove) {
      dispatch(removeBook(isbnToRemove));
      setIsbnToRemove('');
    }
  };

  const toggleStatus = (bookIsbn: string) => {
    dispatch(toggleBookStatus(bookIsbn));
  };

  return (
    <div className="p-4 bg-inherit rounded-lg">
      <h2 className="text-xl font-bold mb-4">Librarian Panel</h2>
      <div className="mb-4">
        <h3 className="font-medium">Add New Book</h3>
        <input
          type="text"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          placeholder="Title"
          className="p-2 mr-2 border text-slate-700"
        />
        <input
          type="text"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          placeholder="Author"
          className="p-2 mr-2 border text-slate-700"
        />
        <input
          type="text"
          value={newBook.isbn}
          onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
          placeholder="ISBN"
          className="p-2 mr-2 border text-slate-700"
        />
        <div className="m-2">
          <input
            type="checkbox"
            checked={newBook.available}
            onChange={(e) =>
              setNewBook({ ...newBook, available: e.target.checked })
            }
            placeholder="Available"
            className="p-2 mr-2 border"
          />
          <label className="ml-2 text-blue-400 m-2">
            Check: If Book Currently Available
          </label>
        </div>
        <button
          onClick={handleAddBook}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Add Book
        </button>
      </div>

      <div>
        <h3 className="font-medium">Remove Book</h3>
        <input
          type="text"
          value={isbnToRemove}
          onChange={(e) => setIsbnToRemove(e.target.value)}
          placeholder="ISBN"
          className="p-2 mr-2 border"
        />
        <button
          onClick={handleRemoveBook}
          className="p-2 bg-red-500 text-slate-700 rounded"
        >
          Remove Book
        </button>
      </div>

      <h3 className="mt-4 font-medium mb-2">Available Books</h3>
      <ul>
        {books.map((book) => (
          <li key={book.isbn}>
            {book.title} by {book.author} -{' '}
            <span
              className={book.available ? 'text-green-600' : 'text-red-600'}
            >
              {book.available ? 'Available' : 'Borrowed'}
            </span>
            <button
              onClick={() => toggleStatus(book.isbn)}
              className="m-4 px-4 py-2 bg-green-500 text-white rounded-md"
            >
              Toggle Status
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LibrarianPanel;

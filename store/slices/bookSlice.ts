import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  available: boolean;
}

interface BookState {
  books: Book[];
  filteredBooks: Book[] | null; // null indicates no filter applied
}

const initialState: BookState = {
  books: [
    {
      id: '1',
      title: 'Book One',
      author: 'Author A',
      isbn: '123',
      available: true,
    },
    {
      id: '2',
      title: 'Book Two',
      author: 'Author B',
      isbn: '456',
      available: true,
    },
    // Add more books as needed
  ],
  filteredBooks: null,
};

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks: (state, action: PayloadAction<string>) => {
      const keyword = action.payload.trim().toLowerCase();
      if (keyword === '') {
        // If search is empty, remove filter
        state.filteredBooks = null;
      } else {
        // Filter books based on title, author, or ISBN
        state.filteredBooks = state.books.filter(
          (book) =>
            book.title.toLowerCase().includes(keyword) ||
            book.author.toLowerCase().includes(keyword) ||
            book.isbn.includes(keyword)
        );
      }
    },
    borrowBook: (
      state,
      action: PayloadAction<{ isbn: string; role: 'Member' | 'Librarian' }>
    ) => {
      const { isbn, role } = action.payload;
      const book = state.books.find((b) => b.isbn === isbn);
      if (book && book.available) {
        if (role === 'Member') {
          book.available = false; // Members affect availability
        } else if (role === 'Librarian') {
          book.available = !book.available; // Librarians toggle availability
        }
      }
    },
    returnBook: (state, action: PayloadAction<string>) => {
      const isbn = action.payload;
      const book = state.books.find((b) => b.isbn === isbn);
      if (book && !book.available) {
        book.available = true;
      }
    },
    toggleBookStatus: (state, action: PayloadAction<string>) => {
      const isbn = action.payload;
      const book = state.books.find((b) => b.isbn === isbn);
      if (book) {
        book.available = !book.available;
      }
    },
    addBook: (state, action: PayloadAction<Book>) => {
      state.books.push(action.payload);
    },
    removeBook: (state, action: PayloadAction<string>) => {
      state.books = state.books.filter((b) => b.isbn !== action.payload);
      // Also remove from filteredBooks if it's active
      if (state.filteredBooks) {
        state.filteredBooks = state.filteredBooks.filter(
          (b) => b.isbn !== action.payload
        );
      }
    },
  },
});

export const {
  setBooks,
  borrowBook,
  returnBook,
  addBook,
  removeBook,
  toggleBookStatus,
} = bookSlice.actions;
export default bookSlice.reducer;

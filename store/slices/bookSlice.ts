import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Book {
  id: string;
  title: string;
  author: string;
  ISBN: string;
  isAvailable: boolean;
}

interface BookState {
  books: Book[];
}

const initialState: BookState = {
  books: [
    // Example books for initial state
    { id: '1', title: 'Book One', author: 'Author A', ISBN: '123', isAvailable: true },
    { id: '2', title: 'Book Two', author: 'Author B', ISBN: '456', isAvailable: true },
  ],
};

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks(state, action: PayloadAction<Book[]>) {
      state.books = action.payload;
    },
    borrowBook(state, action: PayloadAction<{ bookId: string; role: 'Member' | 'Librarian' }>) {
      const { bookId, role } = action.payload;
      const book = state.books.find((b) => b.id === bookId);

      if (book) {
        // For members, set availability to false when borrowing
        if (role === 'Member') {
          book.isAvailable = false;
        }
        // Librarians can borrow without affecting availability
      }
    },
    returnBook(state, action: PayloadAction<string>) {
      const bookId = action.payload;
      const book = state.books.find((b) => b.id === bookId);

      if (book) {
        book.isAvailable = true;
      }
    },
  },
});

export const { setBooks, borrowBook, returnBook } = bookSlice.actions;
export default bookSlice.reducer;

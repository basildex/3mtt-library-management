import Member, { IMember } from './Member';

interface ILibrarian extends IMember {
  addBook(bookData: any): Promise<void>;
  removeBook(bookId: string): Promise<void>;
}

// Librarian-specific functionalities would be implemented on the client-side.

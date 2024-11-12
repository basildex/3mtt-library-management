import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/mongodb';
import Book from '@/models/Book';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();
  switch (req.method) {
    case 'GET':
      const books = await Book.find({});
      res.status(200).json(books);
      break;
    case 'POST':
      const newBook = await Book.create(req.body);
      res.status(201).json(newBook);
      break;
    // Implement PUT and DELETE for updating and deleting books
  }
}

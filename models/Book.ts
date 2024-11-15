import mongoose, { Schema, Document } from 'mongoose';

interface IBook extends Document {
  id: string;
  title: string;
  author: string;
  isbn: string;
  available?: boolean;
}

const BookSchema = new Schema({
  id: String,
  title: String,
  author: String,
  isbn: String,
  available: { type: Boolean, default: true },
});

export default mongoose.models.Book ||
  mongoose.model<IBook>('Book', BookSchema);

import mongoose, { Schema, Document } from 'mongoose';

interface IBook extends Document {
  title: string;
  author: string;
  ISBN: string;
  isAvailable: boolean;
}

const BookSchema = new Schema({
  title: String,
  author: String,
  ISBN: String,
  isAvailable: { type: Boolean, default: true },
});

export default mongoose.models.Book || mongoose.model<IBook>('Book', BookSchema);

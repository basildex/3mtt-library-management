import mongoose, { Schema, Document } from 'mongoose';

interface IMember extends Document {
  name: string;
  memberId: string;
  borrowedBooks: Array<string>;
}

const MemberSchema = new Schema({
  name: String,
  memberId: String,
  borrowedBooks: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
});

export default mongoose.models.Member || mongoose.model<IMember>('Member', MemberSchema);

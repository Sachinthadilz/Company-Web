import mongoose, { Document, Schema } from 'mongoose';

export interface IEmployeeOfMonth extends Document {
  name: string;
  role: string;
  bio: string;
  quote: string;
  photoUrl: string;
  photoPublicId: string;
  month: number;   // 1-12
  year: number;
  active: boolean; // only active one shown on homepage tab
  createdAt: Date;
}

const EmployeeOfMonthSchema = new Schema<IEmployeeOfMonth>(
  {
    name:           { type: String, required: true, trim: true },
    role:           { type: String, required: true, trim: true },
    bio:            { type: String, default: '' },
    quote:          { type: String, default: '' },
    photoUrl:       { type: String, default: '' },
    photoPublicId:  { type: String, default: '' },
    month:          { type: Number, required: true, min: 1, max: 12 },
    year:           { type: Number, required: true },
    active:         { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<IEmployeeOfMonth>('EmployeeOfMonth', EmployeeOfMonthSchema);

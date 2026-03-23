import mongoose, { Document, Schema } from 'mongoose';

export interface ITestimonial extends Document {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;       // 1-5
  avatarUrl: string;
  avatarPublicId: string;
  published: boolean;
  order: number;
  createdAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    name:            { type: String, required: true, trim: true },
    role:            { type: String, default: '' },
    company:         { type: String, default: '' },
    content:         { type: String, required: true },
    rating:          { type: Number, default: 5, min: 1, max: 5 },
    avatarUrl:       { type: String, default: '' },
    avatarPublicId:  { type: String, default: '' },
    published:       { type: Boolean, default: true },
    order:           { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);

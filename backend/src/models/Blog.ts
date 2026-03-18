import mongoose, { Document, Schema } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverUrl: string;
  coverPublicId: string;
  author: string;
  tags: string[];
  published: boolean;
  publishedAt?: Date;
  createdAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title:          { type: String, required: true, trim: true },
    slug:           { type: String, required: true, unique: true, trim: true, lowercase: true },
    excerpt:        { type: String, default: '' },
    content:        { type: String, required: true },
    coverUrl:       { type: String, default: '' },
    coverPublicId:  { type: String, default: '' },
    author:         { type: String, default: 'ARTecX Team' },
    tags:           [{ type: String }],
    published:      { type: Boolean, default: false },
    publishedAt:    { type: Date },
  },
  { timestamps: true }
);

// Auto-set publishedAt when first published
BlogSchema.pre('save', function (next) {
  if (this.published && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

export default mongoose.model<IBlog>('Blog', BlogSchema);

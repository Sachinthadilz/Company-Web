import mongoose, { Document, Schema } from 'mongoose';

export interface IHeroImage extends Document {
  url: string;
  publicId: string;
  order: number;
  createdAt: Date;
}

const HeroImageSchema = new Schema<IHeroImage>(
  {
    url:      { type: String, required: true },
    publicId: { type: String, required: true },
    order:    { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IHeroImage>('HeroImage', HeroImageSchema);

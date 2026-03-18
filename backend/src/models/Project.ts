import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  githubLink?: string;
  liveLink?: string;
  createdAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    technologies: [{ type: String }],
    image: { type: String, default: '' },
    githubLink: { type: String, default: '' },
    liveLink: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model<IProject>('Project', ProjectSchema);

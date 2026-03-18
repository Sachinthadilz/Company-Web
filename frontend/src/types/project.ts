export interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  githubLink?: string;
  liveLink?: string;
  createdAt: string;
}

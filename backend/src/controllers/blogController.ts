import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import Blog from '../models/Blog';
import cloudinary from '../config/cloudinary';

const blogSchema = z.object({
  title:         z.string().min(3),
  slug:          z.string().min(3).regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, hyphens'),
  excerpt:       z.string().optional().default(''),
  content:       z.string().min(10),
  coverUrl:      z.string().optional().default(''),
  coverPublicId: z.string().optional().default(''),
  author:        z.string().optional().default('ARTecX Team'),
  tags:          z.array(z.string()).optional().default([]),
  published:     z.boolean().optional().default(false),
});

/** GET /api/blogs — public, only published, sorted newest first */
export const getPublishedBlogs = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const blogs = await Blog.find({ published: true })
      .select('-content') // list view — no heavy content
      .sort({ publishedAt: -1, createdAt: -1 });
    res.status(200).json({ success: true, data: blogs });
  } catch (e) { next(e); }
};

/** GET /api/blogs/:slug — public, single post */
export const getBlogBySlug = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, published: true });
    if (!blog) { res.status(404).json({ success: false, message: 'Post not found' }); return; }
    res.status(200).json({ success: true, data: blog });
  } catch (e) { next(e); }
};

/** GET /api/admin/blogs — all (published + drafts) */
export const getAllBlogs = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const blogs = await Blog.find().select('-content').sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: blogs });
  } catch (e) { next(e); }
};

/** GET /api/admin/blogs/:id — full post for editing */
export const getBlogById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) { res.status(404).json({ success: false, message: 'Post not found' }); return; }
    res.status(200).json({ success: true, data: blog });
  } catch (e) { next(e); }
};

/** POST /api/admin/blogs */
export const createBlog = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const parsed = blogSchema.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ success: false, errors: parsed.error.issues }); return; }
    const blog = new Blog(parsed.data);
    await blog.save();
    res.status(201).json({ success: true, data: blog });
  } catch (e: any) {
    if (e.code === 11000) { res.status(409).json({ success: false, message: 'Slug already exists' }); return; }
    next(e);
  }
};

/** PUT /api/admin/blogs/:id */
export const updateBlog = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) { res.status(404).json({ success: false, message: 'Post not found' }); return; }
    Object.assign(blog, req.body);
    if (blog.published && !blog.publishedAt) blog.publishedAt = new Date();
    await blog.save();
    res.status(200).json({ success: true, data: blog });
  } catch (e: any) {
    if (e.code === 11000) { res.status(409).json({ success: false, message: 'Slug already exists' }); return; }
    next(e);
  }
};

/** DELETE /api/admin/blogs/:id */
export const deleteBlog = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) { res.status(404).json({ success: false, message: 'Post not found' }); return; }
    if (blog.coverPublicId) await cloudinary.uploader.destroy(blog.coverPublicId).catch(() => {});
    res.status(200).json({ success: true, message: 'Post deleted' });
  } catch (e) { next(e); }
};

import { Request, Response, NextFunction } from 'express';
import Testimonial from '../models/Testimonial';
import cloudinary from '../config/cloudinary';

/** GET /api/testimonials — public, published only */
export const getPublished = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = await Testimonial.find({ published: true }).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data });
  } catch (e) { next(e); }
};

/** GET /api/admin/testimonials — all */
export const getAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = await Testimonial.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data });
  } catch (e) { next(e); }
};

/** POST /api/admin/testimonials */
export const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const t = new Testimonial(req.body);
    await t.save();
    res.status(201).json({ success: true, data: t });
  } catch (e) { next(e); }
};

/** PUT /api/admin/testimonials/:id */
export const update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const t = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!t) { res.status(404).json({ success: false, message: 'Not found' }); return; }
    res.json({ success: true, data: t });
  } catch (e) { next(e); }
};

/** DELETE /api/admin/testimonials/:id */
export const remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const t = await Testimonial.findByIdAndDelete(req.params.id);
    if (!t) { res.status(404).json({ success: false, message: 'Not found' }); return; }
    if (t.avatarPublicId) await cloudinary.uploader.destroy(t.avatarPublicId).catch(() => {});
    res.json({ success: true, message: 'Deleted' });
  } catch (e) { next(e); }
};

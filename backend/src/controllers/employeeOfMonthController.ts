import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import EmployeeOfMonth from '../models/EmployeeOfMonth';
import cloudinary from '../config/cloudinary';

const schema = z.object({
  name:          z.string().min(2),
  role:          z.string().min(2),
  bio:           z.string().optional().default(''),
  quote:         z.string().optional().default(''),
  photoUrl:      z.string().optional().default(''),
  photoPublicId: z.string().optional().default(''),
  month:         z.coerce.number().min(1).max(12),
  year:          z.coerce.number().min(2000),
  active:        z.boolean().optional().default(true),
});

/** GET /api/employee-of-month  — public, returns all records sorted newest first */
export const getAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const list = await EmployeeOfMonth.find().sort({ year: -1, month: -1 });
    res.status(200).json({ success: true, data: list });
  } catch (e) { next(e); }
};

/** POST /api/admin/employee-of-month */
export const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ success: false, errors: parsed.error.issues });
      return;
    }
    const record = await EmployeeOfMonth.create(parsed.data);
    res.status(201).json({ success: true, data: record });
  } catch (e) { next(e); }
};

/** PUT /api/admin/employee-of-month/:id */
export const update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const record = await EmployeeOfMonth.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!record) { res.status(404).json({ success: false, message: 'Record not found' }); return; }
    res.status(200).json({ success: true, data: record });
  } catch (e) { next(e); }
};

/** DELETE /api/admin/employee-of-month/:id */
export const remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const record = await EmployeeOfMonth.findByIdAndDelete(req.params.id);
    if (!record) { res.status(404).json({ success: false, message: 'Record not found' }); return; }
    // Remove photo from Cloudinary if present
    if (record.photoPublicId) {
      await cloudinary.uploader.destroy(record.photoPublicId).catch(() => {});
    }
    res.status(200).json({ success: true, message: 'Deleted' });
  } catch (e) { next(e); }
};

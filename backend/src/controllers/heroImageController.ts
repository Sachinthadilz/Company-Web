import { Request, Response, NextFunction } from 'express';
import HeroImage from '../models/HeroImage';
import cloudinary from '../config/cloudinary';

/** GET /api/hero-images  (public) */
export const getHeroImages = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const images = await HeroImage.find().sort({ order: 1, createdAt: 1 });
    res.status(200).json({ success: true, data: images });
  } catch (error) {
    next(error);
  }
};

/** POST /api/admin/hero-images  — body already contains url + publicId from /api/upload */
export const createHeroImage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { url, publicId } = req.body as { url: string; publicId: string };
    if (!url || !publicId) {
      res.status(400).json({ success: false, message: 'url and publicId are required' });
      return;
    }
    const count   = await HeroImage.countDocuments();
    const image   = await HeroImage.create({ url, publicId, order: count });
    res.status(201).json({ success: true, data: image });
  } catch (error) {
    next(error);
  }
};

/** DELETE /api/admin/hero-images/:id */
export const deleteHeroImage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const image = await HeroImage.findByIdAndDelete(req.params.id);
    if (!image) {
      res.status(404).json({ success: false, message: 'Hero image not found' });
      return;
    }
    // Remove from Cloudinary too
    await cloudinary.uploader.destroy(image.publicId);
    res.status(200).json({ success: true, message: 'Hero image deleted' });
  } catch (error) {
    next(error);
  }
};

/** PUT /api/admin/hero-images/reorder  — body: { ids: string[] } ordered array */
export const reorderHeroImages = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { ids } = req.body as { ids: string[] };
    if (!Array.isArray(ids)) {
      res.status(400).json({ success: false, message: 'ids must be an array' });
      return;
    }
    await Promise.all(
      ids.map((id, index) => HeroImage.findByIdAndUpdate(id, { order: index }))
    );
    res.status(200).json({ success: true, message: 'Order updated' });
  } catch (error) {
    next(error);
  }
};

import { Request, Response } from 'express';
import { Category } from '../../models/Category';

export async function changeCategory(req: Request, res: Response) {
  try {
    const { categoryId } = req.params;
    const { icon, name } = req.body;

    await Category.findByIdAndUpdate(categoryId, { icon, name });

    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
  }
}

import { Request, Response } from 'express';

import { Category } from '../../models/Category';

export async function listCategorById(req: Request, res: Response) {
  try {
    const {categoryId} = req.params;

    const categories = await Category.findById(categoryId);

    res.json(categories);
  } catch (error) {
    res.sendStatus(500);
  }
}

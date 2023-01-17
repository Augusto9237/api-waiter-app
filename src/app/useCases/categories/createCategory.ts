import { Request, Response } from 'express';

import { Category } from '../../models/Category';

export async function createCategory(req: Request, res: Response) {
  try {
    const { icon, name } = req.body;

    await Category.create({ icon, name });

    res.status(201).json({ msg: 'Categoria cadastrada com sucesso!' });
  } catch (error) {
    res.sendStatus(500);
  }
}

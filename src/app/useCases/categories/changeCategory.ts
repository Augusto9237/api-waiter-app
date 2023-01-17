import { Request, Response } from 'express';
import { Category } from '../../models/Category';

export async function changeCategory(req: Request, res: Response) {
  try {
    const { categoryId } = req.params;
    const { icon, name } = req.body;

    await Category.findByIdAndUpdate(categoryId, { icon, name });

    res.status(200).json({ msg: 'Categoria atualizada com sucesso!' });
  } catch (error) {
    res.status(500).json({ msg: 'Erro ao atualizar categoria!' });
  }
}

import { Request, Response } from 'express';
import { Category } from '../../models/Category';


export async function deleteCategory(req: Request, res: Response) {
  try {
    const { categoryId } = req.params;

    await Category.findByIdAndDelete(categoryId);

    res.status(200).json({ msg: 'Categoria deletada com sucesso!' });
  } catch (error) {
    res.status(500).json({ msg: 'Erro ao deletar categoria!' });
  }
}

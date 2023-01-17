import { Request, Response } from 'express';

import { Product } from '../../models/Product';


export async function deleteProduct(req: Request, res: Response) {
  try {
    const { productId } = req.params;

    await Product.findByIdAndDelete(productId);

    res.status(200).json({ msg: 'Produto deletado com sucesso!' });
  } catch (error) {
    res.status(500).json({ msg: 'Erro ao deletar o produto!' });
  }
}

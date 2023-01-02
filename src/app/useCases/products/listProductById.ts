import { Request, Response } from 'express';

import { Product } from '../../models/Product';

export async function listProductById(req: Request, res: Response) {
  try {
    const {productId} = req.params;

    const products = await Product.findById(productId);

    res.json(products);
  } catch (error) {
    res.sendStatus(500);
  }
}

import { Request, Response } from 'express';

import { Product } from '../../models/Product';

export async function changeProduct(req: Request, res: Response) {
  try {
    const { productId } = req.params;
    const imagePath = req.file?.filename;
    const {name, description, price, category, ingredients} = req.body;

    const options = { returnOriginal: false };

    await Product.findByIdAndUpdate( productId, {
      name,
      description,
      imagePath,
      price,
      category,
      ingredients: ingredients ? JSON.parse(ingredients) : [],
    }, options);

    res.status(201).json({ msg: 'Produto atualizado com sucesso!' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Erro ao atualizar o produto!' });
  }
}

import { Request, Response } from 'express';

import { Product } from '../../models/Product';

export async function updateProduct(req: Request, res: Response) {
  try {
    const {productId} = req.params;
    const imagePath = req.file?.filename;
    const {name, description, price, category, ingredients} = req.body;

    const options = { returnOriginal: false };
    console.log(name, description, price, category, ingredients);
    const product = await Product.findByIdAndUpdate( productId, {
      name,
      description,
      imagePath,
      price,
      category,
      ingredients: ingredients ? JSON.parse(ingredients) : [],
    }, options);

    res.status(201).json(product);

  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

import { Request, Response } from 'express';
import { Order } from '../../models/Order';

export async function listOrders(req: Request, res: Response) {
  try {
    const orders = await Order.find()
      .populate({
        path: 'clerk',
        select: '-password'
      })
      .populate('products.product')
      .sort({ createdAt: 1 });

    res.json(orders);
  } catch (error) {
    res.sendStatus(500);
  }
}

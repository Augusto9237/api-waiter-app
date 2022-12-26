import { Request, Response } from 'express';
import { io } from '../../..';
import { Order } from '../../models/Order';

export async function createOrder(req: Request, res: Response) {
  try {
    const { table, client, products, total } = req.body;

    const order = await Order.create({ table, client, products, total });
    const orderDetails = await order.populate('products.product');

    io.emit('orders@new', orderDetails);

    res.status(201).json(order);
  } catch (error) {
    res.sendStatus(500);
  }
}

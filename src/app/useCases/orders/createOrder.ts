import { Request, Response } from 'express';
import { io } from '../../..';
import { Order } from '../../models/Order';

export async function createOrder(req: Request, res: Response) {
  try {
    const { table, clerk, client, products, total } = req.body;

    const order = await Order.create({ table, clerk, client, products, total });
    const orderClerk = await order.populate({
      path: 'clerk',
      select: '-password'
    });
    const orderDetails = await order.populate('products.product');

    io.emit('orders@new', orderDetails, orderClerk);

    res.status(201).json(order);
  } catch (error) {
    res.sendStatus(500);
  }
}

import { Request, Response } from 'express';
import { Order } from '../../models/Order';

export async function listOrders(req: Request, res: Response) {
  const { limit, offset } = req.query;

  let limits = Number(limit);
  let offsets = Number(offset);

  if(!limits) {
    limits = 5;
  }

  if(!offsets) {
    offsets = 0;
  }

  const next = offsets + limits;
  const countOrders = await Order.countDocuments();
  const nextUrl = next < countOrders ? `/orders?limit=${limits}&offset=${next}` : null;

  const previous = offsets - limits < 0 ? null :  offsets - limits;
  const previousUrl = previous != null ? `/orders?limit=${limits}&offset=${previous}` : null;

  try {
    const orders = await Order.find()
      .sort({ _id: -1 })
      .skip(offsets)
      .limit(limits)
      .populate({
        path: 'clerk',
        select: '-password',
      })
      .populate('products.product');


    res.status(200).json({
      pagination: {
        next: nextUrl,
        previous: previousUrl,
        limit: limits,
        offset: offsets,
        total: countOrders
      },
      orders
    });
  } catch (error) {
    res.sendStatus(500);
  }
}

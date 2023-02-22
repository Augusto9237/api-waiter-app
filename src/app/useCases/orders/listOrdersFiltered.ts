import { Request, Response } from 'express';
import { Order } from '../../models/Order';

export async function getOrdersByPeriod(req: Request, res: Response): Promise<any> {
  try {
    const groupBy: string = req.query.groupBy as string;
    const now = new Date();
    let start: Date;
    let end: Date;

    if (groupBy === 'week') {
      start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      end = now;
    } else if (groupBy === 'month') {
      start = new Date(now.getFullYear(), now.getMonth(), 1);
      end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    } else if (groupBy === 'year') {
      start = new Date(now.getFullYear(), 0, 1);
      end = new Date(now.getFullYear(), 11, 31);
    } else {
      start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    }

    const orders = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: start, $lt: end }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'clerk',
          foreignField: '_id',
          as: 'clerk'
        }
      },
      {
        $unwind: '$clerk'
      },
      {
        $lookup: {
          from: 'products',
          localField: 'products.product',
          foreignField: '_id',
          as: 'products.product'
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' },
            client: '$client',
            table: '$table',
            clerk: '$clerk',
            status: '$status',
            product: '$products.product'
          },
          quantity: { $sum: '$products.quantity' },
          total: { $sum: { $multiply: ['$products.quantity', '$products.product.price'] } }
        }
      },
      {
        $project: {
          _id: 0,
          date: {
            year: '$_id.year',
            month: '$_id.month',
            day: '$_id.day'
          },
          client: '$_id.client',
          table: '$_id.table',
          clerk: {
            _id: '$_id.clerk._id',
            name: '$_id.clerk.name'
          },
          product: {
            name: '$_id.product.name',
            price: '$_id.product.price',
            category: '$_id.product.category'
          },
          status: '$status',
          quantity: '$quantity',
          total: '$total'
        }
      }
    ]);

    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
}

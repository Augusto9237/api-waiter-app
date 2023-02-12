import { Request, Response } from 'express';
import { Order } from '../../models/Order';

export async function listOrdersFiltered(req: Request, res: Response) {
  let groupBy: 'day' | 'week' | 'month' | null | any = req.query.groupBy;

  // Se o parâmetro groupBy não foi passado, define como null
  if (!groupBy) {
    groupBy = null;
  }

  try {
  // Se groupBy for null, retorna todos os dados sem agrupamento
    if (!groupBy) {
      const orders = await Order.find()
        .populate({
          path: 'clerk',
          select: '-password'
        })
        .populate('products.product')
        .sort({ createdAt: 1 });

      res.json(orders);
      return;
    }

    // Caso contrário, agrupa e retorna os dados
    let dateExpression: string;
    switch (groupBy) {
    case 'day':
      dateExpression = '$dayOfMonth';
      break;
    case 'week':
      dateExpression = '$week';
      break;
    case 'month':
      dateExpression = '$month';
      break;
    default:
      dateExpression = '$dayOfMonth';
      break;
    }

    const result = await Order.aggregate([
      {
        $group: {
          _id: { [dateExpression]: { $dayOfMonth: '$createdAt' } },
          count: { $sum: 1 },
          total: { $sum: '$total' }
        }
      }
    ]);

    res.json(result);
  } catch (error) {
    res.sendStatus(500);
  }
}

import { Request, Response } from 'express';
import { User } from '../../models/User';

export async function changeUser(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const { name, password, office } = req.body;

    await User.findByIdAndUpdate(userId, { name, password, office });

    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
  }
}

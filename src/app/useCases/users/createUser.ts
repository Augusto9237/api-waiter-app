import { Request, Response } from 'express';

import { User } from '../../models/User';

export async function createUser(req: Request, res: Response) {
  try {
    const { name, password, office } = req.body;

    const user = await User.create({  name, password, office });

    res.status(201).json(user);
  } catch (error) {
    res.sendStatus(500);
  }
}

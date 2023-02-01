import { Request, Response } from 'express';

import { User } from '../../models/User';

export async function listAttendants(req: Request, res: Response) {
  const attendants = await User.find({ office: 'CLERK' }).select('-password');

  res.json(attendants);
}

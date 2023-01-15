import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../../models/User';

export async function createUser(req: Request, res: Response) {
  try {
    const { name, password, office } = req.body;

    const userDb = await User.findOne({ name: name });

    if (userDb) {
      return res.status(404).json({ msg: 'Usuario já cadastrado!' });
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      password: passwordHash,
      office });

    res.status(201).json(user);
  } catch (error) {
    res.sendStatus(500);
  }
}

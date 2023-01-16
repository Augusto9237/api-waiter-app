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

    await User.create({
      name,
      password: passwordHash,
      office });

    res.status(201).json({ msg: 'Usuário cadastrado com sucesso!' });
  } catch (error) {
    res.status(500).json({ msg: 'Erro ao cadastrar o usuário!' });
  }
}

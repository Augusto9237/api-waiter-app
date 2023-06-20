import { Request, Response } from 'express';
import { User } from '../../models/User';
import bcrypt from 'bcrypt';

export async function changeUser(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const { name, password, office } = req.body;

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    await User.findByIdAndUpdate(userId, {
      name,
      password: passwordHash,
      office,
    });

    res.status(200).json({ msg: 'Usuário atualizado com sucesso!' });
  } catch (error) {
    res.status(500).json({ msg: 'Erro ao atualizar o usuário!' });
  }
}

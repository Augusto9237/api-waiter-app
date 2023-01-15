import { Request, Response } from 'express';
import { User } from '../../models/User';
import bcrypt from 'bcrypt';

export async function authUser(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const { name, password} = req.body;

    if (!name) {
      return res.status(422).json({msg: 'O nome é obrigatorio!'});
    }

    if (!password) {
      return res.status(422).json({msg: 'A senha é obrigatoria!'});
    }

    const user = await User.findOne({name: name});

    if (!user) {
      return res.status(404).json({msg: 'Usuario não encontrado!'});
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if(!checkPassword) {
      return res.status(422).json({ msg: 'Senha invalida!'});
    }

    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
  }
}

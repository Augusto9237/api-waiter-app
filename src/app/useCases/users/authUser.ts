import { Request, Response } from 'express';
import { User } from '../../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function authUser(req: Request, res: Response) {
  try {
    const { name, password } = req.body;

    if (!name) {
      return res.status(422).json({ msg: 'O nome é obrigatorio!' });
    }

    if (!password) {
      return res.status(422).json({ msg: 'A senha é obrigatoria!' });
    }

    const user = await User.findOne({ name: name });

    if (!user) {
      return res.status(404).json({ msg: 'Usuario não encontrado!' });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(422).json({ msg: 'Usuario e/ou Senha invalida' });
    }

    try {
      const secret = process.env.SECRET!;
      const token = jwt.sign(
        {
          id: user._id,
          nm: user.name,
          of: user.office
        },
        secret,
      );

      res.status(200).json({msg: 'Autenticado com sucesso!', token});

    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    res.sendStatus(500);
  }
}

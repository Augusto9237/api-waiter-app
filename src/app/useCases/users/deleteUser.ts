import { Request, Response } from 'express';
import { User } from '../../models/User';


export async function deleteUser(req: Request, res: Response) {
  try {
    const { userId } = req.params;

    await User.findByIdAndDelete(userId);

    res.status(200).json({ msg: 'Usuário deletado com sucesso!' });
  } catch (error) {
    res.status(500).json({ msg: 'Erro ao deletar o usuário!' });
  }
}

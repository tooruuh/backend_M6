import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import userCreateService from "../../services/User/userCreate.service";

const userCreateController = async (req: Request, res: Response) => {
  try {
    // acessando os dados do corpo da requisição,
    // usando desestruturação
    const { name, email, password, phone } = req.body;

    // chamando o Service que vai retornar o newUser,
    // que será inferido pelo TS como tipo IUser
    const newUser = await userCreateService({ name, email, password, phone });

    // retornando 201 com JSON do newUser para o cliente
    return res.status(201).send(newUser);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default userCreateController;

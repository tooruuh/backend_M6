import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import { IUserUpdate } from "../../interfaces/User";
import userUpdateService from "../../services/User/userUpdate.service";

const userUpdateController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { name, email, password, phone }: IUserUpdate = req.body;

    const response = await userUpdateService({
      id,
      name,
      email,
      password,
      phone,
    });

    return res.status(201).json(response);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default userUpdateController;

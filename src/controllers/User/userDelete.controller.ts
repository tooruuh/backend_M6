import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import userDeleteService from "../../services/User/userDelete.service";

const userDeleteController = async (req: Request, res: Response) => {
  try {
    const email = req.userEmail;

    const user = await userDeleteService(email);

    return res.status(200).json({ message: "User deleted with sucess!" });
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default userDeleteController;

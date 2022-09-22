import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import userDeleteSelfService from "../../services/User/userDeleteSelf.service";

const userDeleteSelfController = async (req: Request, res: Response) => {
  try {
    const email = req.userEmail;

    const user = await userDeleteSelfService(email);

    return res.status(200).json({ message: "User deleted with sucess!" });
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default userDeleteSelfController;

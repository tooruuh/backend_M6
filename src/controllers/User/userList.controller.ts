import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import userListService from "../../services/User/userList.service";

const userListController = async (req: Request, res: Response) => {
  try {
    const email = req.userEmail;

    const user = await userListService(email);

    return res.status(200).send(user);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default userListController;

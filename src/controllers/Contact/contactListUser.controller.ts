import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import contactListUserService from "../../services/Contact/contactListUser.service";

const contactListUserController = async (req: Request, res: Response) => {
  try {
    const email = req.userEmail;

    const user = await contactListUserService(email);

    return res.status(200).send(user);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default contactListUserController;

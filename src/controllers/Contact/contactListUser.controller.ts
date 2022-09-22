import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import contactListService from "../../services/Contact/contactList.service";

const contactListController = async (req: Request, res: Response) => {
  try {
    const email = req.userEmail;

    const user = await contactListService(email);

    return res.status(200).send(user);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default contactListController;

import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import { IContact } from "../../interfaces/Contact";
import { IUserUpdate } from "../../interfaces/User";
import contatactUpdateService from "../../services/Contact/contactUpdate.service";

const contactUpdateController = async (req: Request, res: Response) => {
  try {
    const { id, id_contact } = req.params;

    const { name, email, contact }: IContact = req.body;

    const response = await contatactUpdateService({
      id,
      name,
      email,
      contact,
      id_contact,
    });

    return res.status(201).json(response);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default contactUpdateController;

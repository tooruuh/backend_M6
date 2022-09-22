import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import contactCreateService from "../../services/Contact/contactCreate.service";

const contactCreateController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, contact } = req.body;

    const newUser = await contactCreateService({
      id,
      name,
      email,
      contact,
    });

    return res.status(201).send(newUser);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default contactCreateController;

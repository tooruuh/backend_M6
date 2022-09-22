import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Contact } from "../entities/contact.entity";

const validateContactIdInUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const contactRepository = AppDataSource.getRepository(Contact);

  const userId = req.userId;
  const { id_contact } = req.params;

  const contacts = await contactRepository.find();

  const contactsId = contacts.find((contact) => console.log(contact.id));

  next();
};

export default validateContactIdInUserMiddleware;

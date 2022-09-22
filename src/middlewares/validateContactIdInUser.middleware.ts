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

  // if (!contactUserOk) {
  //   return res.status(401).json({
  //     message: "you cannot update/delete a contact other than you",
  //   });
  // }
  next();
};

export default validateContactIdInUserMiddleware;

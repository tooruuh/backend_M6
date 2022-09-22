import { AppDataSource } from "../../data-source";
import bcrypt from "bcrypt";
import { IUserUpdate } from "../../interfaces/User";
import { AppError } from "../../errors/appError";
import { IContactUpdate } from "../../interfaces/Contact";
import { Contact } from "../../entities/contact.entity";
import { User } from "../../entities/user.entity";

const contatactUpdateService = async ({
  id,
  name,
  email,
  contact,
  id_contact,
}: IContactUpdate) => {
  const contactRepository = AppDataSource.getRepository(Contact);
  const contactsList = await contactRepository.find();
  const contactData = contactsList.find((contact) => contact.id === id_contact);

  const contactUpdate = {
    name: name || contactData?.name,
    email: email || contactData?.email,
    contact: contact || contactData?.contact,
  };

  await contactRepository.update(contactData!.id, {
    ...contactUpdate,
  });

  return { ...contactUpdate };
};

export default contatactUpdateService;

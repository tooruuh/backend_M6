import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { IContact } from "../../interfaces/Contact";

const contactCreateService = async ({ id, name, email, contact }: IContact) => {
  const contactsRepository = AppDataSource.getRepository(Contact);
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id });

  if (!user) {
    throw new AppError(404, "Not found user");
  }
  const newContact = new Contact();
  newContact.name = name;
  newContact.email = email;
  newContact.contact = contact;
  newContact.user = user?.id;

  contactsRepository.create(newContact);
  await contactsRepository.save(newContact);

  return newContact;
};

export default contactCreateService;

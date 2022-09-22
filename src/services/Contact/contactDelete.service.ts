import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";

const contactDeleteService = async (id: string, id_contact: string) => {
  const contactRepository = AppDataSource.getRepository(Contact);
  const contactsList = await contactRepository.find();
  const contact = contactsList.find((contact) => contact.id === id_contact);

  await contactRepository.delete(contact!.id);

  return true;
};

export default contactDeleteService;

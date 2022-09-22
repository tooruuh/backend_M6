import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";

const contactDeleteSelfService = async (id: string, id_contact: string) => {
  const contactRepository = AppDataSource.getRepository(Contact);
  const contactsList = await contactRepository.find();
  const contact = contactsList.find((contact) => contact.id === id_contact);

  const userRepository = AppDataSource.getRepository(User);
  const userList = await userRepository.find();
  const user = userList.find((user) => user.id === id);

  const userContactsId = user?.contacts.map(
    (contactId) => contactId.id === id_contact
  );

  const verifyContact = userContactsId?.includes(true);

  if (!verifyContact) {
    throw new AppError(
      401,
      "you cannot update/delete a contact other than you"
    );
  }

  await contactRepository.delete(contact!.id);

  return true;
};

export default contactDeleteSelfService;

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
  const contactId = contactsList.find((contact) => contact.id === id_contact);

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

  const contactUpdate = {
    name: name || contactId?.name,
    email: email || contactId?.email,
    contact: contact || contactId?.contact,
  };

  await contactRepository.update(contactId!.id, {
    ...contactUpdate,
  });

  return { ...contactUpdate };
};

export default contatactUpdateService;

import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import contactDeleteSelfService from "../../services/Contact/contactDeleteSelf.service";

const contactDeleteSelfController = async (req: Request, res: Response) => {
  try {
    const { id, id_contact } = req.params;

    const user = await contactDeleteSelfService(id, id_contact);

    return res.status(200).json({ message: "Contact deleted with sucess!" });
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default contactDeleteSelfController;

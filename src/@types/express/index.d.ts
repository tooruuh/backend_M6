import * as express from "express";
import { Contact } from "../../entities/contact.entity";

declare global {
  namespace Express {
    interface Request {
      userId: string;
      userEmail: string;
    }
  }
}

import { Router } from "express";

const routes = Router();

import { authUser } from "./middlewares/authUser.middleware";
import validateUserCreateMiddleware from "./middlewares/validateUserCreate.middleware";
import validateUserIdMiddleware from "./middlewares/validateUserId.middleware";
import validateContactIdInUserMiddleware from "./middlewares/validateContactIdInUser.middleware";
import validateContactCreateMiddleware from "./middlewares/validateContactCreate.middleware";

import userCreateController from "./controllers/User/userCreate.controller";
import userLoginController from "./controllers/User/userLogin.controller";
import userListController from "./controllers/User/userList.controller";
import userUpdateController from "./controllers/User/userUpdate.controller";
import userDeleteSelfController from "./controllers/User/userDelete.controller";

import contactCreateController from "./controllers/Contact/contactCreate.controller";
import contactListController from "./controllers/Contact/contactListUser.controller";
import contactUpdateController from "./controllers/Contact/contactUpdate.controller";
import contactDeleteController from "./controllers/Contact/contactDelete.controller";

//USER
routes.post("/users", validateUserCreateMiddleware, userCreateController);
routes.post("/users/login", userLoginController);
routes.get("/users/me", authUser, userListController);
routes.delete(
  "/users/me/:id",
  authUser,
  validateUserIdMiddleware,
  userDeleteSelfController
);
routes.patch(
  "/users/me/:id",
  authUser,
  validateUserIdMiddleware,
  userUpdateController
);

//CONTACTS
routes.post(
  "/users/contacts/:id",
  authUser,
  validateContactCreateMiddleware,
  validateUserIdMiddleware,
  contactCreateController
);
routes.get("/users/contacts", authUser, contactListController);
routes.delete(
  "/users/contacts/:id/:id_contact",
  authUser,
  validateUserIdMiddleware,
  contactDeleteController
);
routes.patch(
  "/users/contacts/:id/:id_contact",
  authUser,
  validateUserIdMiddleware,
  contactUpdateController
);

export default routes;

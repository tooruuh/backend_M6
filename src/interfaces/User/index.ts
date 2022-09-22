export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface IUserCreate {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserUpdate {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
}

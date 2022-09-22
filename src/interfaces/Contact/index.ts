export interface IContact {
  id: string;
  name: string;
  email: string;
  contact: string;
}

export interface IContactUpdate {
  id: string;
  name?: string;
  email?: string;
  contact?: string;
  id_contact: string
}

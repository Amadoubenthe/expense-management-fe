import { Role } from './role.model';

export class User {
  id!: number;
  firstName!: string;
  lastName!: string;
  email!: string;
  roleId!: number;
  password!: string;
  createdAt!: string;
  updatedAt!: string;
  deletedAt: any;
  phone!: number;
  Role?: Role;
}

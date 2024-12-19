import {RoleName} from "./RoleName";
import {Evaluation} from "./Evaluation";
export class UserModel {
  userId?: number;
  username?:string;
  email?: string;
  password?: string;
  phoneNumber?: number;
  Address?: string;
  roleName?: RoleName;
  image?: string;
  rate?: number;
  valid?: boolean;
  blocked?: boolean;

  evaluation!:Evaluation;
}

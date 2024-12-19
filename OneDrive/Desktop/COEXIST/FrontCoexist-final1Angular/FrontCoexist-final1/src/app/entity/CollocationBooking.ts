// CollocationBooking.ts


import { AnnouncementCollocation } from "./AnnouncementCollocation";
import {UserModel} from "./User.model";

export class CollocationBooking {
  idCollocationBooking!: number;
  annoncementCollocationId!: any;
  annoncementCollocation!: AnnouncementCollocation;
  startDate!: Date;
  endDate!: Date;
  telephone!:string;
  message!:string;
  user!: UserModel;
}

// Booking.ts
import {Carpooling} from "./Carpooling";
import {FeedBack} from "./FeedBack";
import {UserModel} from "./User.model";

export class Booking {
  bookingID!: number;
  nb!: number;
  carpooling!: Carpooling; // Assuming you have a Carpooling class

  user: UserModel; // Assuming you have a User class
  feedBack!: FeedBack;
// Assuming you have a FeedBack class

}

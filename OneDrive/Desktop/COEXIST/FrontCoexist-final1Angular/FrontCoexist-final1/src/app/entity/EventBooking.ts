import {TypeEventBookingStatus} from "./TypeEventBookingStatus";
import {UserModel} from "./User.model";

export class EventBooking {
  bookingEventId!: number;
  numberOfTickets!: number;
  totalAmount!: number;
  pricePerTicket!: number;
  event!: Event;

  cardNumber!: String;
  cardHolderName!: String;
  expirationDate!: String;
  cvv!: String;
  user!: UserModel;
}

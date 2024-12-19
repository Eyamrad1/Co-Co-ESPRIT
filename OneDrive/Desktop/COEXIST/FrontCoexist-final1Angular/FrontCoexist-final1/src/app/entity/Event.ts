import {LikedEvents} from "./LikedEvents";
import {Evaluation} from "./Evaluation";
import {UserModel} from "./User.model";

export class Event {
  eventId!: number;
  eventName!: string;
  eventDescription!: string;
  eventDate?: string;
  eventLocation!: string;
  imageUrl?: string;
  images?: string;
  totalPlaces!:number;
  remainingPlaces!:number
  pricePerTicket!:number

  user!: UserModel;

  likeCount?: number;
  dislikeCount?: number;
  likedEventsList!: LikedEvents[];
  evaluations!: Evaluation[];
}

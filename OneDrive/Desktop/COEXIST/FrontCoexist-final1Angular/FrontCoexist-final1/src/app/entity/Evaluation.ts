import {EventPosition} from "./EventPosition";
import {MyEvent} from "./MyEvent";
import {UserModel} from "./User.model";

export class Evaluation {
  IdEvaluation!: number;
  eventPosition!: EventPosition;
  comment: string = ""; // Add a property for comment


  event!:MyEvent;

  user!: UserModel;
}

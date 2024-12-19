import {Day} from "./Day";
import {CarpoolingType} from "./CarpoolingType";
import {UserModel} from "./User.model";

export class Preference {
  preferenceID!: number;
  departureTime!: Date;
  longitudeDeparture!: string;
  latitudeDestination!: string;
  latitudeDeparture!: string;
  longitudeDestination!: string;
  availableSeats!: number;
  costPerSeat!: number;
  day!: string;
  time!: string;
  carpoolingType!: string;
  //user: UserModel;
}

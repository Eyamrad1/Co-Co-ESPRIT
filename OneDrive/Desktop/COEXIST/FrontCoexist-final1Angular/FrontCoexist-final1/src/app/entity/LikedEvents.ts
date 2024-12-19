import {UserModel} from "./User.model";

export class LikedEvents {
  idEventLiked!: number;
  likedAt!: Date;
  isLiked!: boolean;
  event!: Event;
  user!: UserModel;

}

// AnnouncementCollocation.ts
import {HouseType} from "./HouseType";
import {EquipmentType} from "./EquipementType";
import { FileDB } from "./FileDB";
import { FeedBack } from "./FeedBack";
import { Etat } from "./Etat";
import {UserModel} from "./User.model";


export class AnnouncementCollocation {


    id!: any;
    annoncementCollocationId!: number;
    homeSize!: number;
    numPerso!: number;
    address!: string;
    pricePerPerson!: number;
    houseType!: HouseType;
    equipmentType!: EquipmentType;
    images!:FileDB[];
    favori!:Boolean;
    archive!:Boolean;
  feedbackMap!:FeedBack[];
    averageRating!:number;
    etat!:Etat;
    user: UserModel;

}

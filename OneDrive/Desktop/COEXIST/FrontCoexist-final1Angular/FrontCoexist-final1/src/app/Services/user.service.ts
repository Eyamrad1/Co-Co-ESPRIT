import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable, OnInit} from "@angular/core";
import {UserModel} from "../entity/User.model";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private baseUrl:string='http://localhost:8000/api'
    constructor(private http:HttpClient) { }

    getAllUser():Observable<UserModel[]> {
        return this.http.get<UserModel[]>(`${this.baseUrl}/getAllUser`);
    }

    deleteUser(userid : string): Observable<UserModel> {
        return this.http.delete<UserModel>(`${this.baseUrl}/deleteUser/{id}`)
    }

    UpdateUser(user: UserModel): Observable<UserModel> {
        return this.http.post<UserModel>(this.baseUrl + '/updateUser/{id}', user);
    }

  addImage(eventData: FormData): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.baseUrl}/add-image`, eventData);
  }

}

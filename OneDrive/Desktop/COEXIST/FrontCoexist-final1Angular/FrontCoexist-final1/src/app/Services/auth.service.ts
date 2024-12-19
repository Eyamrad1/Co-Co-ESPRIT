import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, map, Observable} from "rxjs";
import {UserModel} from "../entity/User.model";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userSubject: BehaviorSubject<UserModel | null>;
  public user: Observable<UserModel | null>;
  isconn: any=false;
  private baseUrl = 'http://localhost:8000/api/v1/auth';
  private baseUrl1 ='http://localhost:8000/api'

  constructor(private http: HttpClient, private router: Router) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

    authenticate(data: any) {
        return this.http.post(  `${this.baseUrl}/authenticate`, data)

    }
  getIsConnected() {
    return this.userValue != null ;
  }

  register(data: any) {
    return this.http.post(`${this.baseUrl}/register`, data)
  }

  saveUserDetails(user: any) {
    localStorage.setItem('userDetails', JSON.stringify(user));
  }

  getUserDetails(param: string) {
    const userDetails = localStorage.getItem('userDetails');

    if (userDetails) {
      const userDetailsParsed = JSON.parse(userDetails);
      if (param == "id") {
        return userDetailsParsed.id;
      } else if (param == "username") {
        return userDetailsParsed.username;
      } else if (param == "email") {
        return userDetailsParsed.email;
      } else if (param == "all") {
        return userDetailsParsed;
      } else {
        return "specify required details : id, username, email, all";
      }
    } else {
      return null;
    }
  }

  getAuthToken(): string {
    const token = localStorage.getItem('access_token');
    console.log('SERVICE token is' + token)

    return token || 'EMPTY';
  }


  deleteUser(userId : number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl1}/deleteUser/${userId}`)
  }

  UpdateUser(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(this.baseUrl1 + '/updateUser/${id}', user);
  }

  activateUser(id:Number): Observable<any> {
    return this.http.put(`${this.baseUrl1}/validate-user/${id}`, id);
  }


  bloquerUser(email:string):Observable<any>{
    return this.http.put(`${this.baseUrl1}/bloque-user/${email}`, email);
  }

  forgetPassword(username: String, resetPass: any) {
    return this.http.put(`${this.baseUrl1}/forgetpass/${username}`, resetPass);
  }
  userForgetPassword(email: any) {
    return this.http.post(`${this.baseUrl1}/forgetpassword/${email}`,email);
  }
  forgetPasswordbyemail(email: String, resetPass: any) {
    return this.http.put(`${this.baseUrl1}/forgetpassbyemail/${email}`, resetPass);
  }
  getAccessToken(): string {
    return localStorage.getItem('accessToken');
  }
  getrefresgtoken():string{
    return localStorage.getItem('refreshToken')||sessionStorage.getItem('refreshToken')!;}

  refreshToken(): Observable<any> {
    // Implement logic to call the token refresh API
    return this.http.post<any>(`${this.baseUrl}/refresh-token`, { refreshToken: localStorage.getItem('refreshToken') });
  }

  getUserById(id: any) {
    return this.http.get<UserModel>(`${this.baseUrl1}/show-user-by-id/${id}`);
  }
  isLoggedIn() {
    const userDetails = localStorage.getItem('userDetails');
    return userDetails != null;
  }
  logout() {
    localStorage.removeItem('userDetails');
  }

  searchUsers(keyword: string): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.baseUrl1}/recherche/${keyword}`);
  }

  getUserId(): number | null {
    const userId = localStorage.getItem('userId');
    return userId ? parseInt(userId, 10) : null;
  }
}

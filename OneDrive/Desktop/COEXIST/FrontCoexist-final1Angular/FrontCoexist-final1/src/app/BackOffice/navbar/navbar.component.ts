import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../Services/auth.service";
import {Router} from "@angular/router";
import {UserService} from "../../Services/user.service";
import {UserModel} from "../../entity/User.model";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  userDetails!: any;
  users: UserModel[] = [];
  keyword: string = '';


  constructor(private authService: AuthService, private router: Router,private userservice:UserService) {
  }

  ngOnInit(): void {
    this.userDetails = this.authService.getUserDetails("all");
    this.isLoggedIn();
    this.getAllUser();
    console.log("this.isLoggedIn() ===",this.isLoggedIn());
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
  }




  getAllUser(){
    // Call the service to get the list of events
    this.userservice.getAllUser().subscribe(
        data => {
          this.users = data;
        },
        error => {
          console.error('Error loading events', error);
          // Handle error appropriately, show a message to the user, etc.
        }
    );
  }
    search(): void {
        this.authService.searchUsers(this.keyword).subscribe(
            (data: UserModel[]) => {
                // Update image URLs for each event in the search results
                //const baseUrl = 'http://localhost:8000/COEXIST/api/v1/file/images/{imageName:.+}'; // Change this to your actual base URL
                this.users = data.map(user => ({
                    ...user,
                    // imageUrl: baseUrl + user.image
                }));


            },
            (error) => {
                console.log('Error occurred while searching for users:', error);
            }
        );
    }

}

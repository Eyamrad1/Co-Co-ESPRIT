import {Component, OnInit} from '@angular/core';
import {UserDetails} from "../entity/UserDetails.model";
import {AuthService} from "../Services/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  isToggled = false;
  userDetails!: UserDetails;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.userDetails = this.authService.getUserDetails("all");

  }

  toggleSidebar() {
    this.isToggled = !this.isToggled;
  }
}

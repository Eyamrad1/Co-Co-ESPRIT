
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../Services/auth.service";
import {Router} from "@angular/router";
import {UserModel} from "../../../entity/User.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  public loginForm!: FormGroup;
  users: UserModel[] = [];


  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })
  }

  ngOnInit(): void {

  }
 /* authenticate() {
    console.log('this.loginForm.value ===== ', this.loginForm.value)
    this.authService.authenticate(this.loginForm.value).subscribe(
      async (response: any) => {
        if (response) {

          //this.authService.saveUserDetails(response);
          console.log("logged success response : ", response);
          alert("welcome ! " )
          if (response.roleName === 'ADMIN') {
            await this.router.navigate(['/admin/getAllUsers']);
          } else if (response.role === 'STUDENT') {
            //await this.homeAuthenticate();
          await this.router.navigate(['/user/home']);
        } else {
          console.log("mochkel response : ", response);
          alert("mockel ! " )
        }
      }, error => {
        // Handle login error (e.g., display error message)
        console.error('mochkel login', error.error);
        alert("mockel ! " )
      }
    )
  }

  */
  authenticate() {
    console.log('this.loginForm.value ===== ', this.loginForm.value)
    this.authService.authenticate(this.loginForm.value).subscribe(
      async (response: any) => {
        if (response) {
          if (this.loginForm.value.password === 'abdo1234' && this.loginForm.value.email == 'abdessalem.lasswed@esprit.tn') {
            await this.router.navigate(['/admin/getAllUsers']);
          } else {
            console.log("logged success response : ", response);
            alert("Welcome!")
            // Store the userId in localStorage
            localStorage.setItem('userId', response.userId);
            await this.router.navigate(['/user/home']);
          }
        } else {
          console.log("mochkel response : ", response);
          alert("mochkel!")
        }
      }, error => {
        console.error('mochkel login', error.error);
        alert("mochkel!")
      }
    )
  }

  /*
    authenticate() {
      console.log('this.loginForm.value ===== ', this.loginForm.value);
      this.authService.authenticate(this.loginForm.value).subscribe(
        async (response: any) => {
          if (response) {
            console.log("logged success response : ", response);
            alert("Welcome!");

            // Check the role of the user
            if (response.roleName === 'ADMIN') {
              await this.router.navigate(['/admin/getAllUsers']);
            } else if (response.roleName === 'STUDENT') {
              await this.router.navigate(['/user/home']);
            } else {
              // Handle unrecognized role
              console.error('Unrecognized role:', response.role);
              // Redirect or show appropriate message
            }
          } else {
            console.log("mochkel response : ", response);
            alert("Problem with login");
          }
        },
        error => {
          // Handle login error (e.g., display error message)
          console.error('Login problem:', error.error);
          alert("Problem with login");
        }
      );
    }

   */


  /*login() {
    this.authService.authenticate(this.loginForm.value).subscribe(
      async (response: any) => {
        if (response) {

          this.authService.saveUserDetails(response);
          console.log("logged success response : ", response);
          await this.router.navigate(['/welcome']);
        } else {
          console.log("mochkel response : ", response);
        }
      }, error => {
        // Handle login error (e.g., display error message)
        console.error('mochkel login', error.error);
      }
    )
  }*/



}

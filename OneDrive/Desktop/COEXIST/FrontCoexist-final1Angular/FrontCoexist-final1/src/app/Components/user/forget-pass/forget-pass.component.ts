import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {UserModel} from "../../../entity/User.model";
import {UserService} from "../../../Services/user.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../Services/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.css']
})
export class ForgetPassComponent implements OnInit {
  forgetPassForm: FormGroup;
  token: string | undefined;
  user: UserModel | null;
  isconn: any;
  username:String;
  constructor(  private authService: AuthService,
                private fb: FormBuilder,
                private router: Router,
                private toastr: ToastrService) {
    this.token = undefined;
    this.isconn = this.authService.getIsConnected()
    console.error('isconnnnn' + this.isconn)

  }

  changePassword = this.fb.group({
    oldPassword: ['', Validators.required],
    newPassword: ['', Validators.required],
    confirmNewPassword: ['', Validators.required]
  });

  ngOnInit(): void {


  }

  updatePassword() {
    if (this.changePassword.get("confirmNewPassword")?.value == this.changePassword.get("newPassword")?.value) {

      if (this.changePassword.valid) {
        const updatedForm = this.changePassword.value;
        console.log('form final before update : ', updatedForm);
        this.authService.forgetPassword(this.username, updatedForm).subscribe(
          response => {
            console.log('data li tbadlet : ', response);
            this.toastr.success('Password updated successfully', 'Updated');
          }, error => {
            this.toastr.error(error.message, 'Error');
          }
        );
      } else {
        console.log('form is not valid : ', this.changePassword.value);
        this.toastr.error("form is not valid  ", 'Error');

      }
    } else {
      this.toastr.error("confirm password not equals", 'Error');
    }
  }


  back() {
    this.router.navigate(['/admin/getAllUsers']);
  }

}

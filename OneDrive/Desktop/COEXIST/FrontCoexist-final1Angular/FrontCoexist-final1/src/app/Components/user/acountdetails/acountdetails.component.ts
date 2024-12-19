import { Component } from '@angular/core';
import {AuthService} from "../../../Services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {UserModel} from "../../../entity/User.model";

@Component({
  selector: 'app-acountdetails',
  templateUrl: './acountdetails.component.html',
  styleUrls: ['./acountdetails.component.css']
})
export class AcountdetailsComponent {
  roleList: string[] = [];
  user?: any;
  data: any;

  id: number = this.authService.getUserDetails("id");

  constructor(private authService: AuthService, private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private toastr: ToastrService) {
  }


  userForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    role: ['', Validators.required],
    imageUrl: ['', Validators.required]
  });

  ngOnInit(): void {
    this.authService.getUserById(this.id).subscribe((response: any) => {
      if (response) {
        this.user = response;
        console.log('OnInit mta3 updateUser component get user byId : ', this.user);

        this.userForm.patchValue({

          username: this.user?.username || '',
          email: this.user?.email || '',
          password: this.user?.password,
          role: this.user?.role || '',
          imageUrl: this.user?.imageUrl || 'link'
        });
        console.log("this.userForm :", this.userForm.value)
      } else {
        console.log('response is undefined');
      }
    });

  }

  update() {
    if (this.userForm.valid) {
      const updatedForm = this.userForm.value;
      console.log('form final before update : ', updatedForm);
      this.authService.UpdateUser(this.user ).subscribe(
          response => {
            console.log('data li tbadlet : ', response);
            this.toastr.success('User updated successfully', 'Updated');
          }, error => {
            this.toastr.error(error.message, 'Error');
          }
      );
    } else {
      console.log('form is not valid : ', this.userForm.value);
      this.toastr.error("form is not valid  ", 'Error');

    }
  }


  back() {
    this.router.navigate(['admin/dashboard/show-user']);
  }

}

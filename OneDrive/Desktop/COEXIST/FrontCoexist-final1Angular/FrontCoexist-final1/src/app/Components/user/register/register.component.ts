import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../Services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
//import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  registerForm!: FormGroup;


  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router, private snackbar: MatSnackBar) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required ],
      email: ['', Validators.required,Validators.pattern("^@esprit.tn"), Validators.email],
      password: ['', Validators.required, Validators.minLength(8)],
      phoneNumber: ['', Validators.required, Validators.maxLength(8)],
      Address: ['', Validators.required],
      roleName: ['', Validators.required],
      image: [null]
    })
  }

  ngOnInit() {
  }
  onFileChange(event: any) {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.registerForm.patchValue({
      profileImage: file
    });
  }

  register() {
    const formData = new FormData();

    Object.keys(this.registerForm.value).forEach(key => {
      formData.append(key, this.registerForm.value[key]);
    });
    console.log("this.registerForm.value : ", this.registerForm.value);
    console.log("this.formData after assign : ", formData);

    this.authService.register(this.registerForm.value).subscribe(
      (response: any) => {
        this.registerForm.reset();
        console.log("response : ", response);
        console.log("this.registerForm.value : ", this.registerForm.value);
        alert("user added ! " )
         this.router.navigate(['/user/authenticate']);
        this.snackbar.open('User added successfully!', 'Close', {
          duration: 9000,
        });
      }, error => {
        console.error('error.error : ', error.error, 'error.status : ', error.status);
        alert("remplir all")
      }
    )
  }

}



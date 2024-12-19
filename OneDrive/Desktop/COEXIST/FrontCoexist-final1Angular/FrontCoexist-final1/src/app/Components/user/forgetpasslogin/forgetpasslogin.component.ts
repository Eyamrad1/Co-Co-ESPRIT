import {Component, OnInit} from '@angular/core';
import {OtpService} from "../../../Services/otp.service";
import {AuthService} from "../../../Services/auth.service";
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserModel} from "../../../entity/User.model";
import {OTP} from "../../../entity/OTP";

@Component({
  selector: 'app-forgetpasslogin',
  templateUrl: './forgetpasslogin.component.html',
  styleUrls: ['./forgetpasslogin.component.css']
})
export class ForgetpassloginComponent implements OnInit{

  token: string | undefined;
  fg: FormGroup;
  fgreset: FormGroup;
  showResetPasswordCard: boolean = false;

  constructor(private authservice: AuthService, private router: Router,private otpservice:OtpService) {
    this.token = undefined;}

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newPassword = control.get('newPassword');
    const confirmPassword = control.get('confirmPassword');

    if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }

    return null;
  }
  ngOnInit(): void {
    this.fg = new FormGroup({
      email: new FormControl('', [Validators.required]),
      //recaptcha: new FormControl(null, [Validators.required])
    });
    this.fgreset = new FormGroup({
      code: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    }, this.passwordMatchValidator);

  }
  public submitfg(): void {

    if(this.fg.valid){
      this.authservice.userForgetPassword(this.fg.value.email).subscribe( (response) =>
        {
          this.showResetPasswordCard = true;
          alert ("code sent successfully to your mail")

        },
        (error) => alert ("code invalide resend it "))

    }}
  public submitfgreset(): void {
    if(this.fgreset.valid){

      const formData = {
        newPassword: this.fgreset.value.newPassword,
        code: this.fgreset.value.code,
      };
      this.authservice.forgetPasswordbyemail(this.fg.value.email, formData).subscribe( (response) => {
          alert ("password changed successfully")
          this.router.navigate(['/user/authenticate']);
        },

        error => alert ("error while changing password"))


    }
    else{
      alert("form invalid");

    }

  }

  resendcode($event: any) {
    $event.preventDefault();
    this.submitfg();
  }



  /*token: string | undefined;
  fg: FormGroup;
  fgreset: FormGroup;
  showResetPasswordCard: boolean = false;

  constructor(private authservice: AuthService, private router: Router,private otpservice:OtpService) {
      this.token = undefined;}

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
      const newPassword = control.get('newPassword');
      const confirmPassword = control.get('confirmPassword');

      if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
          return { passwordMismatch: true };
      }

      return null;
  }


  ngOnInit(): void {
      this.fg = new FormGroup({
          email: new FormControl('', [Validators.required])
      });


  }
  public submitfg(): void {

      if(this.fg.valid){
          this.authservice.userForgetPassword(this.fg.value.email).subscribe( (response) =>
              {
                  this.showResetPasswordCard = true;

                  alert ("code sent successfully to your mail")

              },
              (error) =>
          alert ("Oops"));



      }}
  public submitfgreset(): void {
      if(this.fgreset.valid){

          const formData = {
              newPassword: this.fgreset.value.newPassword,
              code: this.fgreset.value.code,
          };
          this.authservice.forgetPasswordbyemail(this.fg.value.email, formData).subscribe( (response) => {

                   alert ("password changed successfully")
                  this.router.navigate(['/user/authenticate']);
              },

              error =>
                  alert ("oops  "));



      }
      else{



      }

  }

  resendcode($event: any) {
      $event.preventDefault();
      this.submitfg();
  }

   */

    /*fg!: FormGroup;
    fgreset!: FormGroup;
    users: UserModel[] = [];
      user: any;



    constructor(private otpservice:OtpService, private fb: FormBuilder, private router:Router, private authservice: AuthService) {
      this.fgreset = this.fb.group({
        code: ['', Validators.required],
        newPassword: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      })
      this.fg = this.fb.group({
        email: ['', Validators.required],
        //recaptcha: [null, Validators.required]
      })


    }
    ngOnInit(): void {
    }

    resend(user: UserModel) {

      this.authservice.userForgetPassword(user.email).subscribe(
        (response: any) => {
          //this.fg.reset();
          console.log("response : ", response);
          console.log("this.fgreset.value : ", user.email);
          alert("code sent to your email ! " )

          this.router.navigate(['/user/authenticate']);
        }, error => {
          // Handle login error (e.g., display error message)
          console.error('error.error : ', error.error, 'error.status : ', error.status);
          alert("remplir all")
        }
      )
    }
    verifier(user: UserModel): void {
      this.authservice.userForgetPassword(user.email).subscribe(
          () => {

            console.log('Utilisateur activé avec succès.');

            alert("this user is Activated !");
            window.location.reload();
          },
          (error) => {
            console.error('Une erreur s\'est produite lors de l\'activation :', error);
            // Gérer l'erreur d'activation
          }
      );
    }

    send() {
      console.log('this.fg.value ===== ', this.fg.value)
      this.authservice.userForgetPassword(this.fg.value).subscribe(
        async (response: any) => {
          if (response) {

            //this.authService.saveUserDetails(response);
            console.log("logged success response : ", response);
            alert("code sent to your email ! " )
            await this.router.navigate(['/user/authenticate']);
          } else {
            console.log("mochkel response : ", response);
            alert("mockel ! " )
          }
        }, error => {
          // Handle login error (e.g., display error message)
          console.error('mochkel', error.error);
          alert("mockel ! " )
        }
      )
    }

     */


}

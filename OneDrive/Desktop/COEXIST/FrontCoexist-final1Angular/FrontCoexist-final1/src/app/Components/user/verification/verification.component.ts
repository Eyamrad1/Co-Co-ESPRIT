import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {OtpService} from "../../../Services/otp.service";
import {OTP} from "../../../entity/OTP";

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent {
  constructor(private router: Router, private otpservice: OtpService) { }

  test: Date = new Date();

  title = 'otp-app';
  newotp: OTP | undefined;

  otp!: string;
  inputDigitLeft: string = "Verify code";
  btnStatus: string = "btn-light";

  public configOptions = {
    length: 6,
    inputClass: 'digit-otp',
    containerClass: 'd-flex justify-content-between'
  }

  ngOnInit() {
  }

  onOtpChange(event: any) {
    this.otp = event;
    if(this.otp.length < this.configOptions.length) {
      this.inputDigitLeft = this.configOptions.length - this.otp.length + " digits Left";
      this.btnStatus = 'btn-light';
    }

    if (this.otp.length === this.configOptions.length )  {

      this.otpservice.verifyOTP(this.otp).subscribe(result => {
        if (result) {
          // Faire quelque chose si le résultat est vrai
          this.inputDigitLeft = "Let's go!";
          this.btnStatus = 'btn-primary';
        } else {
          // Faire quelque chose si le résultat est faux
          this.inputDigitLeft = "Invalid OTP";
          this.btnStatus = 'btn-danger';
        }
      });

    }
  }

  isButtonClicked = false;
  onButtonClick() {
    if (this.inputDigitLeft === "Let's go!") {
      this.isButtonClicked = true;
      this.router.navigate(['/user/authenticate']);
    }
  }

}

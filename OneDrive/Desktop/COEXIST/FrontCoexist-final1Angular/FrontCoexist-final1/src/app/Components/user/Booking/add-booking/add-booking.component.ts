import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { BookingService} from "../../../../Services/booking.service";
import {Carpooling} from "../../../../entity/Carpooling";
import {Booking} from "../../../../entity/Booking";
import {CarpoolingService} from "../../../../Services/carpooling.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.css']
})
export class AddBookingComponent implements OnInit{

    carpooling: Carpooling[]=[];

    constructor(
    private carpoolingService: CarpoolingService,
    private bookingService: BookingService) {}
  ngOnInit(): void {}




}

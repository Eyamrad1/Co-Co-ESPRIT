import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';
import {ReservationService} from "../../../Services/reservation.service";
import {EventService} from "../../../Services/event.service";
import {Event} from "../../../entity/Event";
import {AuthService} from "../../../Services/auth.service";

@Component({
  selector: 'app-reservation-event',
  templateUrl: './reservation-event.component.html',
  styleUrls: ['./reservation-event.component.css']
})
export class ReservationEventComponent implements OnInit {
  userId: number ;
  numberOfTickets: number = 0;
  eventId?: number;
  event: Event | undefined;
  // Additional properties for card details
  cardNumber: string = '';
  cardHolderName: string = '';
  expirationDate: string = '';
  cvv: string = '';

  constructor(
      private reservationService: ReservationService,
      private eventService: EventService,
      private route: ActivatedRoute,
      private router: Router,
      private snackBar: MatSnackBar,
      private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const idParam = params['eventId'];
      this.eventId = isNaN(idParam) ? undefined : +idParam;
      this.loadEventDetails();
    });
    this.userId = this.authService.getUserId()
  }

  loadEventDetails(): void {
    if (this.eventId !== undefined) {
      this.eventService.getEvent(this.eventId).subscribe(
          (data: Event) => {
            this.event = data;
          },
          (error) => {
            console.error('Error loading event details', error);
          }
      );
    } else {
      console.error('Event ID not found in route parameters');
    }
  }

  makeReservation(): void {
    console.log('Card Number:', this.cardNumber);
    console.log('Card Holder Name:', this.cardHolderName);
    console.log('Expiration Date:', this.expirationDate);
    console.log('CVV:', this.cvv);

    if (!this.event || this.numberOfTickets <= 0 || !this.eventId) {
      console.error('Invalid event ID or number of tickets');
      this.snackBar.open('Invalid event ID or number of tickets', 'Close', {
        duration: 9000, // Duration in milliseconds
      });
      return;
    }

    // Check if any of the card details are empty or undefined
    if (!this.cardNumber || !this.cardHolderName || !this.expirationDate || !this.cvv) {
      console.error('Invalid card details');
      this.snackBar.open('Invalid card details', 'Close', {
        duration: 9000, // Duration in milliseconds
      });
      return;
    }

    this.reservationService.createReservation(
        this.userId,
        this.eventId,
        this.numberOfTickets,
        this.cardNumber,
        this.cardHolderName,
        this.expirationDate,
        this.cvv
    ).subscribe(
        (response) => {
          console.log('Reservation created response:', response);
          this.openSuccessSnackBar();
        },
        (error) => {
          this.openSuccessSnackBar();

        }
    );
  }

  openSuccessSnackBar(): void {
    this.snackBar.open('Your reservation has been created successfully', 'OK', {
      duration: 5000
    }).afterDismissed().subscribe(() => {
      this.router.navigate(['/user/events']);
    });
  }


}

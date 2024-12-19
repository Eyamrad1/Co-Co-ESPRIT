// display-all-booking.component.ts

import { Component, OnInit } from '@angular/core';
import { Booking } from '../../../../entity/Booking'; // Adjust the path to your Booking model
import { BookingService } from '../../../../Services/booking.service'; // Adjust the path to your BookingService

@Component({
  selector: 'app-display-all-booking',
  templateUrl: './display-all-booking.component.html',
  styleUrls: ['./display-all-booking.component.css'],
})
export class DisplayAllBookingComponent implements OnInit {
  bookings: Booking[] = [];
  currentPage = 1; // Initialize with the default page
  itemsPerPage = 3; // Set your desired items per page
p:number;
  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.bookingService.getAllBookings().subscribe((data: Booking[]) => {
      this.bookings = data;
    });
  }

  confirmDelete(bookingId: number): void {
    if (confirm('Are you sure you want to delete this carpooling?')) {
      this.deleteBooking(bookingId);
    }
  }

  deleteBooking(bookingId: number): void {
    this.bookingService.deleteBooking(bookingId).subscribe(
      () => {
        // Booking deleted successfully, remove it from the list
        this.bookings = this.bookings.filter(
          (booking) => booking.bookingID !== bookingId
        );
      },
      (error) => {
        console.error('Error deleting booking:', error);
        // Handle the error (e.g., show an error message to the user)
      }
    );
  }
}

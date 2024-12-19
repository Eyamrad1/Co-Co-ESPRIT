import { Component, OnInit } from '@angular/core';
import { Event } from "src/app/entity/Event";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import {EventService} from "../../../../Services/event.service";


@Component({
  selector: 'app-display-event',
  templateUrl: './display-event.component.html',
  styleUrls: ['./display-event.component.css'],
  providers: [EventService]
})
export class DisplayEventComponent implements OnInit {
  events: Event[] = [];

  constructor(private snackBar: MatSnackBar, public eventService: EventService, private router: Router) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getAllEvents().subscribe(
      (data: Event[]) => {
        this.events = data;
      },
      (error) => {
        console.error('Error loading events', error);
      }
    );
  }

  confirmDelete(event: Event): void {
    if (confirm('Are you sure you want to delete this event?')) {
      this.deleteEvent(event);
      window.location.reload();
      this.snackBar.open('Event added successfully!', 'Close', {
        duration: 7000,
      });
    }
  }



  navigateToAddEvent() {
    this.router.navigate(['/add-event']);
  }
  navigateToGraph() {
    this.router.navigate(['admin//Graph']);
  }
  navigateToUpdateEvent(event: Event) {
    this.router.navigate(['/update-event', event.eventId]);
  }

  deleteEvent(event: Event): void {
    if (event && event.eventId) {
      const eventId = event.eventId;

      this.eventService.deleteEvent(eventId).subscribe(
        (response: any) => {
          console.log('Event deleted successfully', response);
          this.loadEvents();
          // Reload the page after successful deletion with a timestamp query parameter
          window.location.href = window.location.pathname + '?timestamp=' + new Date().getTime();
        },
        (error: any) => {
          console.error('Error deleting event', error);
          // Log the error details to the console
          if (error instanceof HttpErrorResponse) {
            console.error('Status:', error.status);
            console.error('Response body:', error.error);
          }
          // Handle error appropriately
        }
      );
    }
  }
}

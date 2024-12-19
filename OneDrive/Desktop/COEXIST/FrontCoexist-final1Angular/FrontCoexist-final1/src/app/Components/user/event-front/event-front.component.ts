
import { Component, OnInit } from '@angular/core';
import { Event } from '../../../entity/Event';
import { Router } from '@angular/router';
import {EventService} from "../../../Services/event.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../../Services/auth.service";


@Component({
  selector: 'app-event-front',
  templateUrl: './event-front.component.html',
  styleUrls: ['./event-front.component.css']
})
export class EventFrontComponent implements OnInit {
  events: Event[] = [];
  userId:number;
  keyword: string = '';
  currentPage: number = 1;
  pageSize: number = 6; // Number of events per page
  pagedEvents: Event[] = [];
  pagedEventsGrouped: Event[][] = [];
  likeCounts: { [key: number]: number } = {}; // Object to store like counts for each event
  dislikeCounts: { [key: number]: number } = {}; // Object to store dislike counts for each event




  // Assuming eventId is 1 for demonstration, replace with your logic to get the event ID
  isLiked: boolean = true; // Set initial reaction, change based on user interaction


  constructor(private authService:AuthService ,private snackBar: MatSnackBar,private eventService: EventService, private router: Router) {}

  ngOnInit(): void {
    this.loadEvents();
    this.userId = this.authService.getUserId()
  }
  search(): void {
    if (!this.keyword.trim()) {
      // If the search query is empty, load all events
      this.loadEvents();
      return;
    }
    // Check if the search query matches a date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (dateRegex.test(this.keyword.trim())) {
      this.searchByDate(this.keyword.trim());
      return;
    }
    // Check if the search query starts with a special character '@' to indicate location
    if (this.keyword.trim().startsWith('@')) {
      this.searchByLocation(this.keyword.trim().substring(1));
      return;
    }
    // Otherwise, search by description
    this.searchByDescription(this.keyword.trim());

    // Here you can call the searchEvents method
    this.eventService.searchEvents(this.keyword).subscribe(
      (events: Event[]) => {
        this.events = events;

      },
      (error) => {
        console.log('Error occurred while searching events:', error);
      }
    );
  }






  loadEvents(): void {
    this.eventService.getAllEvents().subscribe(
      (data: Event[]) => {
        this.events = data;
        this.groupEvents(); // Group events into arrays of three per row
        this.setPage(1); // Initial page load
      },
      (error) => {
        console.error('Error loading events', error);
      }
    );
  }


  // Function to group events into arrays of three per row
  groupEvents(): void {
    this.pagedEventsGrouped = [];
    for (let i = 0; i < this.pagedEvents.length; i += 3) {
      this.pagedEventsGrouped.push(this.pagedEvents.slice(i, i + 3));
    }
  }

  // Function to set the current page and paged events
  setPage(pageNumber: number): void {
    const startIndex = (pageNumber - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.events.length);
    this.pagedEvents = this.events.slice(startIndex, endIndex);
    this.currentPage = pageNumber;
    this.groupEvents(); // Update grouped events after setting the page
  }


  onPrevPage(): void {
    if (this.currentPage > 1) {
      this.setPage(this.currentPage - 1);
    }
  }

  onNextPage(): void {
    if (this.currentPage < this.totalPages()) {
      this.setPage(this.currentPage + 1);
    }
  }

  totalPages(): number {
    return Math.ceil(this.events.length / this.pageSize);
  }

  addOrUpdateReaction( eventId: number,userId: number, isLiked: boolean): void {
    this.eventService.addOrUpdateReaction(eventId,userId,isLiked).subscribe(
        () => {
          console.log('Reaction added/updated successfully');
          this.snackBar.open('Reaction added/updated successfully', 'Close', {
            duration: 9000, // Duration in milliseconds
          });
        },
        (error) => {
          console.error('Failed to add/update reaction:', error);
          this.snackBar.open('you cant react to this event you are not participant', 'Close', {
            duration: 9000, // Duration in milliseconds
          });
        }
    );
  }



  searchByDate(eventDate: string): void {
    this.eventService.searchEventsByDate(eventDate).subscribe(
      (data: Event[]) => {
        this.events = data;
        this.updateImageUrls(); // Update image URLs after getting search results
        this.setPage(1); // Reset to first page after search
      },
      (error) => {
        console.log('Error occurred while searching events by date:', error);
      }
    );
  }

  searchByDescription(eventDescription: string): void {
    this.eventService.searchEventsByDescription(eventDescription).subscribe(
      (data: Event[]) => {
        this.events = data;
        this.updateImageUrls(); // Update image URLs after getting search results
        this.setPage(1); // Reset to first page after search
      },
      (error) => {
        console.log('Error occurred while searching events by description:', error);
      }
    );
  }

  searchByLocation(eventLocation: string): void {
    this.eventService.searchEventsByLocation(eventLocation).subscribe(
      (data: Event[]) => {
        this.events = data;
        this.updateImageUrls(); // Update image URLs after getting search results
        this.setPage(1); // Reset to first page after search
      },
      (error) => {
        console.log('Error occurred while searching events by location:', error);
      }
    );
  }
  updateImageUrls(): void {
    const baseUrl = 'http://localhost:8000/images/'; // Adjust the base URL as needed
    this.events.forEach(event => {
      event.imageUrl = baseUrl + event.imageUrl; // Update image URL with full URL
    });
  }

  shareOnFacebook(eventId: number): void {
    const confirmation = window.confirm("Are you sure you want to share this event on Facebook?");
    if (confirmation) {
      this.eventService.shareEventOnFacebook(eventId).subscribe(
        (result: string) => {
          console.log(result); // Handle success
          alert("Event shared successfully on Facebook!");
        },
        (error) => {
          console.error('Error sharing event on Facebook:', error); // Handle error
          alert("Event shared successfully on Facebook!");
        }
      );
    } else {
      console.log('Sharing on Facebook canceled');

    }
  }



  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }
  protected readonly event = event;

}

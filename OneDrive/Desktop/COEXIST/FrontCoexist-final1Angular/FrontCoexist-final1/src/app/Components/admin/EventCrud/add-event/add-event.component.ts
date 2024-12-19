import {Component, ViewChild} from '@angular/core';
import {Event} from "src/app/entity/Event";
import {Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import {NgForm} from "@angular/forms";
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {EventService} from "../../../../Services/event.service";


@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css'],
  providers: [DatePipe]  // Provide DatePipe here
})
export class AddEventComponent {
  event: Event = new Event();
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  @ViewChild('eventForm') eventForm!: NgForm;

  constructor(private snackBar: MatSnackBar,private eventService: EventService, private router: Router, private datePipe: DatePipe) {}

  addEvent(): void {
    if (this.eventForm.valid) {
      const formData = new FormData();
      formData.append('eventName', this.event.eventName);
      formData.append('eventDescription', this.event.eventDescription);
      if (this.event.eventDate) {
        const formattedDate = this.datePipe.transform(this.event.eventDate, 'yyyy-MM-dd\'T\'HH:mm:ss');
        if (formattedDate) {
          formData.append('eventDate', formattedDate);
        }
      }
      formData.append('eventLocation', this.event.eventLocation);
      formData.append('totalPlaces', this.event.totalPlaces.toString()); // Add totalPlaces
      formData.append('remainingPlaces', this.event.remainingPlaces.toString());
      formData.append('pricePerTicket', this.event.pricePerTicket.toString());// Add remainingPlaces

      if (this.selectedFile) {
        formData.append('image', this.selectedFile); // Make sure 'image' matches the backend's expected part name
      }

      this.eventService.addEvent(formData)
        .subscribe(
          response => {
            console.log('Event added successfully', response);
            this.router.navigate(['/admin/display-event']);
            // Display success toast notification
            this.snackBar.open('Event added successfully!', 'Close', {
              duration: 7000,
            });
          },
          error => {
            console.error('Error adding event', error);
          }
        );

    } else {
      console.error('The form is not valid.');
    }
  }


  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}


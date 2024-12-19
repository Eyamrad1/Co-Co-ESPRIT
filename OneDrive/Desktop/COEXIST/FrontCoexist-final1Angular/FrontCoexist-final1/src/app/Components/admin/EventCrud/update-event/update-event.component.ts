import {Component, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from "rxjs";
import { Event } from "src/app/entity/Event";
import {DatePipe} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {EventService} from "../../../../Services/event.service";


@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent {
  private apiUrl = 'http://localhost:8000';
  event: Event = new Event();
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  @ViewChild('eventForm') eventForm!: NgForm;
  eventId!: number;
  eventData: FormData = new FormData();



  constructor(private router: Router,private route: ActivatedRoute, private http: HttpClient, private eventService: EventService, private datePipe: DatePipe) {}

  ngOnInit() {
    // Retrieve eventId from route parameters
    this.route.params.subscribe(params => {
      const eventId = params['id'];
      // Fetch event details using eventId
      this.eventService.getEvent(eventId).subscribe(response => {
        this.event = response;
      }, error => {
        console.error('Error fetching event details', error);
        // Handle error appropriately
      });
    });
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
  confirmUpdate(): void {
    if (confirm("Are you sure you want to update this event?")) {
      this.updateEvent();
    }
  }


  updateEvent() {
    // Check if event and eventId are defined
    if (this.event && this.event.eventId) {
      // Check if eventDate is defined
      if (this.event.eventDate) {
        // Ensure that eventDate is a string
        const eventDateStr: string = typeof this.event.eventDate === 'string' ? this.event.eventDate : '';

        // Format eventDate to match the server-side format
        this.event.eventDate = this.datePipe.transform(new Date(eventDateStr), 'yyyy-MM-ddTHH:mm:ss') || '';
      }

      this.eventService.updateEvent(this.event, this.event.eventId)
        .subscribe(response => {
          console.log('Event updated successfully', response);
          this.router.navigate(['/display-event']);
        }, error => {
          console.error('Error updating event', error);
          // Handle error appropriately
        });
    }
  }





}

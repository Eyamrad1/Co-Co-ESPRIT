import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CollocationBookingService } from 'src/app/Services/collocation-booking.service';
import { FeedbackcService } from 'src/app/Services/feedbackc.service';
import { CollocationBooking } from 'src/app/entity/CollocationBooking';
import { FeedBack } from 'src/app/entity/FeedBack';
import {AuthService} from "../../../Services/auth.service";


@Component({
  selector: 'app-anncollbooking',
  templateUrl: './anncollbooking.component.html',
  styleUrls: ['./anncollbooking.component.css']
})
export class AnncollbookingComponent {
  newCollocationBookingFormGroup!: FormGroup;
  allCollocationBookings: CollocationBooking[] = [];
  feedbackForm!:FormGroup;
  showModal:Boolean = false;
  collocationBookingId!:any;
  userId!:number;
  id!:String | null  ;

  constructor(private fb: FormBuilder, private feedbackcService: FeedbackcService,
              private collocationBookingService: CollocationBookingService, private router: ActivatedRoute,
              private route: Router,private authService: AuthService) { }

  ngOnInit(): void {
    this.feedbackForm = this.fb.group({
      feed_Back: ['', Validators.required],
      rate: [null, Validators.required]
    });
    this.userId = this.authService.getUserId();
    this.id = this.router.snapshot.paramMap.get('id');

    this.collocationBookingService.getCollocationBookingsByAnnId(this.userId, this.id ).subscribe((data) => {
      // @ts-ignore
      this.allCollocationBookings = data;
      console.log("🚀 ~ AllBookingcollComponent ~ this.collocationBookingService.getAllCollocationBookings ~ data:", data)
    });
  }

  redirectToCreateCollocationBooking() {
    this.route.navigate(['/home/addBooColl']);
  }

  handleDeleteCollocationBooking(collocationBooking: CollocationBooking) {
    let confirmation = confirm("Are you sure?");
    if (!confirmation) return;

    this.collocationBookingService.deleteCollocationBooking(collocationBooking.idCollocationBooking).subscribe({
      next: (resp) => {
        // Supprimer l'élément du tableau
        const index = this.allCollocationBookings.indexOf(collocationBooking);
        if (index !== -1) {
          this.allCollocationBookings.splice(index, 1);
        }
      },
      error: err => {
        console.log(err);
      }
    });
  }
  show_Modal(id: any) {
    console.log("🚀 ~ AllBookingcollComponent ~ show_Modal ~ id:", id)
    this.showModal = true
    this.collocationBookingId = id
  }

  onStateChange(event: Event, collocationBooking: CollocationBooking) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    console.log('Selected state:', selectedValue);

    // Convert the selected value to the corresponding enum value

  }
  submitFeedback() {
    if ( this.feedbackForm.valid) {
      const feedback: FeedBack = this.feedbackForm.value;
      this.feedbackcService.addFeedback(feedback, this.collocationBookingId).subscribe({
        next: (resp) => {
            console.log('Feedback added successfully:', resp);
            // Do something with the successful response, e.g., redirect the user, show a success message, etc.
          },
          error: err => {
            console.error('Error adding feedback:', err);
            // Handle errors here, e.g., show an error message to the user
          }
      });
      this.collocationBookingId = ""
      this.showModal = false

    }
  }
  closeModal(){
    this.collocationBookingId = ""
      this.showModal = false
  }


}

import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CollocationBooking} from "../../../entity/CollocationBooking";
import {CollocationBookingService} from "../../../Services/collocation-booking.service";
import {Router} from "@angular/router";
import { FeedBack } from 'src/app/entity/FeedBack';
import {FeedbackcService} from "../../../Services/feedbackc.service";

@Component({
  selector: 'app-all-bookingcoll',
  templateUrl: './all-bookingcoll.component.html',
  styleUrls: ['./all-bookingcoll.component.css']
})
export class AllBookingcollComponent {
  newCollocationBookingFormGroup!: FormGroup;
  allCollocationBookings: CollocationBooking[] = [];
  feedbackForm!:FormGroup;
  showModal:Boolean = false;
  collocationBookingId!:any;
  userId!:any;
  selectedRating = 0;
  Rating = 0;
  stars = [
    {
      id: 1,
      icon: 'star',
      class: 'star-gray star-hover star',
      hovered: false
    },
    {
      id: 2,
      icon: 'star',
      class: 'star-gray star-hover star',
      hovered: false
    },
    {
      id: 3,
      icon: 'star',
      class: 'star-gray star-hover star',
      hovered: false
    },
    {
      id: 4,
      icon: 'star',
      class: 'star-gray star-hover star',
      hovered: false
    },
    {
      id: 5,
      icon: 'star',
      class: 'star-gray star-hover star',
      hovered: false
    }

  ];
  currentPage: number = 1;
  itemsPerPage: number = 2;
  totalPages: number = 0;

  constructor(private fb: FormBuilder, private feedbackcService: FeedbackcService, private collocationBookingService: CollocationBookingService, private router: Router) { }

  ngOnInit(): void {
    this.feedbackForm = this.fb.group({
      feed_Back: ['', Validators.required],
      rate: [this.selectedRating, Validators.required]
    });
    this.userId = localStorage.getItem('userId');;
    this.collocationBookingService.getCollocationBookingsById(this.userId).subscribe((data) => {
      // @ts-ignore
      this.allCollocationBookings = data;
      this.totalPages = Math.ceil(this.allCollocationBookings.length / this.itemsPerPage);

      console.log("🚀 ~ AllBookingcollComponent ~ this.collocationBookingService.getAllCollocationBookings ~ data:", data)
    });
  }
  getClassObject(star: any) {
    const classObj: { [key: string]: boolean } = {
      'gold-star': star.hovered
    };
    classObj[star.class as string] = true;
    return classObj;
  }

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  getPaginatedCollocationBookings(): CollocationBooking[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.allCollocationBookings.length);
    return this.allCollocationBookings.slice(startIndex, endIndex);
  }
  toggleHover(star: any) {
    star.hovered = !star.hovered;
  }
  redirectToCreateCollocationBooking() {
    this.router.navigate(['/home/addBooColl']);
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
  }
  submitFeedback() {
    if ( this.feedbackForm.valid) {
      this.feedbackForm.value.rate = this.Rating;
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
  selectStar(value : any): void{


    this.stars.filter( (star) => {

      if ( star.id <= value){

        star.class = 'star-gold star';

      }else{

        star.class = 'star-gray star';

      }

      return star;
    });



    this.Rating = value;
    this.selectedRating = value;


  }


}

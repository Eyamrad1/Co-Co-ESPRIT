import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CollocationBookingService} from "../../../Services/collocation-booking.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CollocationBooking} from "../../../entity/CollocationBooking";
import { AnnouncementCollocationService } from 'src/app/Services/announcement-collocation.service';
import { AnnouncementCollocation } from 'src/app/entity/AnnouncementCollocation';
import { ToastrService } from 'ngx-toastr';
import {AuthService} from "../../../Services/auth.service";

@Component({
  selector: 'app-add-bookingcoll',
  templateUrl: './add-bookingcoll.component.html',
  styleUrls: ['./add-bookingcoll.component.css']
})
export class AddBookingcollComponent {
  progress: number = 0;
  progressWidth: number = 0;

  newCollocationBookingFormGroup!: FormGroup;
  id: string | null = ""
  userId!: number;
  announcementCollocation!: AnnouncementCollocation;

  constructor(private toastr: ToastrService,  private router: ActivatedRoute,private authService:AuthService , private route: Router,
    private formBuilder: FormBuilder, private collocationBookingService: CollocationBookingService,
    private collocationService: AnnouncementCollocationService
    ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.id = this.router.snapshot.paramMap.get('id');
    this.userId = this.authService.getUserId();

  }

  initializeForm(): void {
    this.newCollocationBookingFormGroup = this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      statusType: ['ALREADY']
      // Ajoutez d'autres champs au besoin en fonction des propriétés de la réservation de colocation
    });
  }

  handleSaveCollocationBooking(): void {
    if (!this.id) {
      console.error('ID is missing.');
      return;
    }

    this.collocationService.getAnnouncementById(parseInt(this.id)).subscribe({
      next: (announcement: AnnouncementCollocation) => {
        if (!this.newCollocationBookingFormGroup.valid) {
          this.toastr.error('Le formulaire n\'est pas valide',"",{
            timeOut: 750,
          })

          // You may want to display an error message to the user
          return;
        }

        const collocationBooking: CollocationBooking = this.newCollocationBookingFormGroup.value as CollocationBooking;
        collocationBooking.annoncementCollocation = announcement;

        this.addCollocationBooking(collocationBooking, this.userId);
      },
      error: err => {
        this.toastr.error('Le formulaire n\'est pas valide',"",{
          timeOut: 750,
        })
      }
    });
  }

  private addCollocationBooking(collocationBooking: CollocationBooking, userId: Number): void {

    this.collocationBookingService.addCollocationBooking(collocationBooking, userId).subscribe({
      next: () => {
        this.handleBookingSuccess();
      },
      error: err => {
        // console.error('Error adding collocation booking:', err);
        this.toastr.error('Error adding collocation booking:',"",{
          timeOut: 750,
        })
      }
    });
  }

  private handleBookingSuccess(): void {
    this.toastr.success("\n" + "The roommate reservation has been successfully registered!","",{
      timeOut: 750,
    });
    this.route.navigateByUrl('/booColl');
  }
}

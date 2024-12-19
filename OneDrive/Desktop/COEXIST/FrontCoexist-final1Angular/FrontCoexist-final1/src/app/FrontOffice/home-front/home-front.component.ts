import { Component } from '@angular/core';
import { CarpoolingService } from "../../Services/carpooling.service";
import { Carpooling } from "../../entity/Carpooling";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { map } from 'rxjs/operators'; // Import the map operator

@Component({
  selector: 'app-home-front',
  templateUrl: './home-front.component.html',
  styleUrls: ['./home-front.component.css']
})
export class HomeFrontComponent {

  lastCarpooling: Observable<Carpooling>;

  constructor(
    private carpoolingService: CarpoolingService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.lastCarpooling = this.getLastCarpooling();
    this.checkForMatchingCarpooling(this.lastCarpooling);
    this.lastCarpooling.subscribe(
      (lastCarpooling: Carpooling | null) => {
        if (lastCarpooling !== null) {
          // Do something with the last carpooling
          console.log('Last carpooling:', lastCarpooling);
        } else {
          console.log('No carpooling found');
        }
      },
      (error) => {
        console.error('Error occurred while fetching carpoolings:', error);
      }
    );
  }

  getLastCarpooling(): Observable<Carpooling> {
    return this.carpoolingService.getAllCarpooling().pipe(
      map((carpoolings: Carpooling[]) => {
        return carpoolings.length > 0 ? carpoolings[carpoolings.length - 1] : null;
      })
    );
  }

  checkForMatchingCarpooling(newCarpooling: Observable<Carpooling>) {
    this.carpoolingService.compareLastPreferenceAndLastCarpooling().subscribe(
      (matchingCarpooling: Carpooling) => {
        if (matchingCarpooling !== null) {
          this.openSnackBar('Notification: Matching carpooling found.', 'open');
           // Navigate to the notification component
        }
      },
      (error) => {
        console.error('Error occurred while checking for matching carpooling:', error);
      }
    );
  }

  openSnackBar(message: string, action: string) {
    let snackBarRef = this.snackBar.open(message, action, {
      duration: 20000, // Duration in milliseconds
    });

    // Handle the SnackBar click event
    snackBarRef.onAction().subscribe(() => {
      this.router.navigate(['/notificationss']); // Navigate to the desired component
    });
  }
}

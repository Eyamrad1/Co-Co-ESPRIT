import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarpoolingService } from '../../../../Services/carpooling.service';
import { Carpooling } from '../../../../entity/Carpooling';
import * as L from 'leaflet';
import 'leaflet-control-geocoder';
import { AuthService } from "../../../../Services/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-carpooling',
  templateUrl: './add-carpooling.component.html',
  styleUrls: ['./add-carpooling.component.css']
})
export class AddCarpoolingComponent implements OnInit, AfterViewInit {
  carpoolingForm!: FormGroup;
  carpoolingType = ['DAILY', 'SPECIFIC'];

  map: any;
  departureMarker: any;
  destinationMarker: any;
  userId: number;
  constructor(private authService: AuthService, private fb: FormBuilder, private carpoolingService: CarpoolingService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.carpoolingForm = this.fb.group({
      availableSeats: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
      costPerSeat: [null, [Validators.required, Validators.min(0), Validators.max(99999)]],
      carpoolingType: ['', Validators.required],
      day: [null],
      time: [null],
      departureTime: [null],
      registrationNumber: [null, Validators.required],
      longitudeDeparture: [null, Validators.required],
      latitudeDeparture: [null, Validators.required],
      longitudeDestination: [null, Validators.required],
      latitudeDestination: [null, Validators.required]
    }, { validators: this.departureTimeValidator });

    this.userId = this.authService.getUserId()

  }
  departureTimeValidator(group: FormGroup) {
    const departureTime = group.get('departureTime').value;
    if (departureTime !== null) { // Validate only if departureTime is not null
      const now = new Date();
      if (new Date(departureTime) <= now) {
        group.get('departureTime').setErrors({ departureTimeInvalid: true }); // Set error if departure time is invalid
      } else {
        group.get('departureTime').setErrors(null); // Clear error if departure time is valid
      }
    }
    return null; // Return null to satisfy Angular validator interface
  }
  ngAfterViewInit(): void {
    this.initializeMap();
  }

  initializeMap() {
    this.map = L.map('map', {
      center: [36.8983, 10.1894],
      zoom: 18,
      layers: [
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '...' })
      ]
    });

    this.map.on('click', (e: any) => this.onMapClick(e));

    const geocoder = (<any>L.Control).geocoder({
      defaultMarkGeocode: false
    }).addTo(this.map);

    geocoder.on('markgeocode', (e: any) => {
      const bbox = e.geocode.bbox;
      const poly = L.polygon([
        bbox.getSouthEast(),
        bbox.getNorthEast(),
        bbox.getNorthWest(),
        bbox.getSouthWest()
      ]);
      this.map.fitBounds(poly.getBounds());
    });
  }

  async onMapClick(e: any) {
    const tunisiaBounds: [number, number][] = [
      [30.2288, 7.5245], // Southwest corner of Tunisia
      [37.3499, 11.5984] // Northeast corner of Tunisia
    ];

    const clickedLatLng = e.latlng;

    // Check if the clicked location falls within Tunisia's boundaries
    if (L.latLngBounds(tunisiaBounds).contains(clickedLatLng)) {
      // Proceed with setting departure or destination marker
      if (!this.departureMarker) {
        if (confirm('Is this the departure location?')) {
          this.departureMarker = L.marker(e.latlng, { draggable: true, icon: this.getDepartureIcon() }).addTo(this.map);
          this.carpoolingForm.patchValue({
            longitudeDeparture: e.latlng.lng.toFixed(6),
            latitudeDeparture: e.latlng.lat.toFixed(6)
          });
          const locationName = await this.getLocationName(e.latlng);
          this.departureMarker.bindPopup(locationName).openPopup();
          this.departureMarker.on('dragend', async (event: any) => {
            const marker = event.target;
            const position = marker.getLatLng();
            this.carpoolingForm.patchValue({
              longitudeDeparture: position.lng.toFixed(6),
              latitudeDeparture: position.lat.toFixed(6)
            });
            const locationName = await this.getLocationName(position);
            marker.setPopupContent(locationName).openPopup();
          });
        }
      } else {
        if (confirm('Is this the destination location?')) {
          if (this.destinationMarker) {
            this.map.removeLayer(this.destinationMarker);
          }
          this.destinationMarker = L.marker(e.latlng, { draggable: true, icon: this.getDestinationIcon() }).addTo(this.map);
          this.carpoolingForm.patchValue({
            longitudeDestination: e.latlng.lng.toFixed(6),
            latitudeDestination: e.latlng.lat.toFixed(6)
          });
          const locationName = await this.getLocationName(e.latlng);
          this.destinationMarker.bindPopup(locationName).openPopup();
          this.destinationMarker.on('dragend', async (event: any) => {
            const marker = event.target;
            const position = marker.getLatLng();
            this.carpoolingForm.patchValue({
              longitudeDestination: position.lng.toFixed(6),
              latitudeDestination: position.lat.toFixed(6)
            });
            const locationName = await this.getLocationName(position);
            marker.setPopupContent(locationName).openPopup();
          });
        }
      }
    } else {
      alert('Please select a location within Tunisia.');
    }
  }

  private async getLocationName(location: L.LatLng): Promise<string> {
    return new Promise((resolve, reject) => {
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${location.lat}&lon=${location.lng}&format=json`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          if (data.display_name) {
            resolve(data.display_name);
          } else {
            reject('Location name not found');
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  private getDepartureIcon() {
    return L.icon({
      iconUrl: '/assets/backOffice/img/dep.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [0, -30] // Adjust the vertical offset as needed
    });
  }

  private getDestinationIcon() {
    return L.icon({
      iconUrl: '/assets/backOffice/img/dest.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [0, -30] // Adjust the vertical offset as needed
    });
  }

  addCarpooling(): void {
    const carpoolingData: Carpooling = this.carpoolingForm.value;
    if (this.carpoolingForm.valid) {
      this.carpoolingService.addCarpooling(carpoolingData, this.userId).subscribe(
        (response: any) => {
          console.log(response);
          alert('Success! Carpooling data added.');
          this.carpoolingForm.reset();
          this.checkForMatchingCarpooling(carpoolingData);
        },
        (error) => {
          console.error(error);
          alert('Failed to add carpooling data. Please try again.');
        }
      );
    } else {
      alert('Please fill in all required fields.');
    }
  }

  checkForMatchingCarpooling(newCarpooling: Carpooling) {
    this.carpoolingService.compareLastPreferenceAndLastCarpooling().subscribe(
      (matchingCarpooling: Carpooling) => {
        if (matchingCarpooling !== null) {
          this.openSnackBar('Notification: Matching carpooling found.', 'Close', '');
          this.carpoolingService.emitMatchingCarpooling(matchingCarpooling);
        }
      },
      (error) => {
        console.error('Error occurred while checking for matching carpooling:', error);
      }
    );
  }

  openSnackBar(message: string, action: string, url: string) {
    const snackBarRef = this.snackBar.open(message, action, {
      duration: 20000, // Duration in milliseconds
    });

    snackBarRef.onAction().subscribe(() => {
      this.router.navigateByUrl('http://localhost:4200/notificationss');
    });
  }
}

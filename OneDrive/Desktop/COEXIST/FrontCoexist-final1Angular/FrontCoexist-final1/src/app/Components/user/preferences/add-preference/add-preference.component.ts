import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PreferenceService } from "../../../../Services/preference.service";
import * as L from 'leaflet';
import 'leaflet-control-geocoder';
import { Preference } from "../../../../entity/Preference";

@Component({
  selector: 'app-add-preference',
  templateUrl: './add-preference.component.html',
  styleUrls: ['./add-preference.component.css']
})
export class AddPreferenceComponent implements OnInit, AfterViewInit {
  preferanceForm!: FormGroup;
  carpoolingType = ['DAILY', 'SPECIFIC'];

  map: any;
  departureMarker: any;
  destinationMarker: any;
  preference: Preference = new Preference();
  constructor(private fb: FormBuilder, private preferenceService: PreferenceService) {
  }

  ngOnInit(): void {
    this.preferanceForm = this.fb.group({
      availableSeats: [null, [Validators.min(1), Validators.max(5)]],
      costPerSeat: [null, [Validators.min(0), Validators.max(99999)]],
      carpoolingType: ['DAILY'], // Set default value to 'DAILY'
      day: [null],
      time: [null],
      departureTime: [null],

      longitudeDeparture: [null],
      latitudeDeparture: [null],
      longitudeDestination: [null],
      latitudeDestination: [null]
    }, {validators: this.departureTimeValidator});
  }


  departureTimeValidator(group: FormGroup) {
    const departureTime = group.get('departureTime').value;
    if (departureTime !== null) { // Validate only if departureTime is not null
      const now = new Date();
      if (new Date(departureTime) <= now) {
        group.get('departureTime').setErrors({departureTimeInvalid: true}); // Set error if departure time is invalid
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
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 19, attribution: '...'})
      ]
    });

    this.map.on('click', (e: any) => this.onMapClick(e));

    const geocoder = (L.Control as any).geocoder({
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
    if (!this.departureMarker) {
      if (confirm('Is this the departure location?')) {
        this.departureMarker = L.marker(e.latlng, {draggable: true, icon: this.getDepartureIcon()}).addTo(this.map);
        this.preferanceForm.patchValue({
          longitudeDeparture: e.latlng.lng.toFixed(6),
          latitudeDeparture: e.latlng.lat.toFixed(6)
        });
        const locationName = await this.getLocationName(e.latlng);
        this.departureMarker.bindPopup(locationName).openPopup();
        this.departureMarker.on('dragend', async (event: any) => {
          const marker = event.target;
          const position = marker.getLatLng();
          this.preferanceForm.patchValue({
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
        this.destinationMarker = L.marker(e.latlng, {draggable: true, icon: this.getDestinationIcon()}).addTo(this.map);
        this.preferanceForm.patchValue({
          longitudeDestination: e.latlng.lng.toFixed(6),
          latitudeDestination: e.latlng.lat.toFixed(6)
        });
        const locationName = await this.getLocationName(e.latlng);
        this.destinationMarker.bindPopup(locationName).openPopup();
        this.destinationMarker.on('dragend', async (event: any) => {
          const marker = event.target;
          const position = marker.getLatLng();
          this.preferanceForm.patchValue({
            longitudeDestination: position.lng.toFixed(6),
            latitudeDestination: position.lat.toFixed(6)
          });
          const locationName = await this.getLocationName(position);
          marker.setPopupContent(locationName).openPopup();
        });
      }
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

  addPreference(): void {
    // Bind form values to preference object
    this.preference.availableSeats = this.preferanceForm.value.availableSeats;
    this.preference.costPerSeat = this.preferanceForm.value.costPerSeat;
    this.preference.carpoolingType = this.preferanceForm.value.carpoolingType;
    this.preference.day = this.preferanceForm.value.day;
    this.preference.time = this.preferanceForm.value.time;
    this.preference.departureTime = this.preferanceForm.value.departureTime;
    this.preference.longitudeDeparture = this.preferanceForm.value.longitudeDeparture;
    this.preference.latitudeDeparture = this.preferanceForm.value.latitudeDeparture;
    this.preference.longitudeDestination = this.preferanceForm.value.longitudeDestination;
    this.preference.latitudeDestination = this.preferanceForm.value.latitudeDestination;

    if (this.preferanceForm.valid) {
      console.log('Preference data before submission:', this.preference);

      // Now add the preference data
      this.preferenceService.addPreference(this.preference).subscribe(
        (response: any) => {
          console.log('Response after submission:', response);
          // Update the preference object with the received preferenceID
          this.preference.preferenceID = response.preferenceID;
          alert('Success! Carpooling data added.');
          this.preferanceForm.reset(); // Reset the form after successful submission
          // You may also want to reset markers here if applicable
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


}

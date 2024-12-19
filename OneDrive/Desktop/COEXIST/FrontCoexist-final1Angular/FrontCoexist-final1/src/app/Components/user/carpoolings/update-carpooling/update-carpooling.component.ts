import { Component, OnInit } from '@angular/core';
import { Carpooling } from "../../../../entity/Carpooling";
import { CarpoolingService } from "../../../../Services/carpooling.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import * as L from 'leaflet';
import 'leaflet-control-geocoder'
@Component({
    selector: 'app-update-carpooling',
    templateUrl: './update-carpooling.component.html',
    styleUrls: ['./update-carpooling.component.css']
})
export class UpdateCarpoolingComponent implements OnInit {
    carpoolingID: any;
    carpoolingForm!: FormGroup;
    carpooling: Carpooling = new Carpooling();
  map: any;
  departureMarker: any;
  destinationMarker: any;

    constructor(
        private fb: FormBuilder,
        private carpoolingService: CarpoolingService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.carpoolingID = this.activatedRoute.snapshot.params['carpoolingID'];
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

        });
        this.findCarpoolingById();
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

    // Initialize geocoder control with defaultMarkGeocode set to false
    const geocoder1 = (<any>L.Control).geocoder({
      defaultMarkGeocode: false
    }).addTo(this.map);

    // Optionally, you can listen for the markgeocode event to fit bounds to the geocoded location
    geocoder1.on('markgeocode', (e: any) => {
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

    findCarpoolingById() {
        this.carpoolingService.findCarpooling(this.carpoolingID).subscribe((res)=>{
            console.log(res);
            this.carpoolingForm.patchValue(res);
        });
    }
    updateCarpooling() {
        if (this.carpoolingForm.valid) {

            this.carpoolingService.updateCarpooling(this.carpoolingID, this.carpoolingForm.value).subscribe((res: any) => {
                console.log(res);
            });
            alert("update done");
        } else {
            alert("update failed");
        }
    }


    }

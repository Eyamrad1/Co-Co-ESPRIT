import {Component, OnInit, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef} from '@angular/core';
import { CarpoolingService } from "../Services/carpooling.service";
import { Carpooling } from "../entity/Carpooling";
import * as L from "leaflet";
import {Booking} from "../entity/Booking";
import {BookingService} from "../Services/booking.service";
import {AuthService} from "../Services/auth.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit, AfterViewInit {
  comparedCarpooling: Carpooling | null = null;
  carpoolings: Carpooling[] = [];
  newBooking: Booking = new Booking();
  userId:number
  @ViewChild('mapContainer', { static: false }) mapContainer: ElementRef;

  constructor(private carpoolingService: CarpoolingService,private cd: ChangeDetectorRef,private bookingService:BookingService,private authService:AuthService) { }

  ngOnInit(): void {
    this.getComparedCarpooling();
    this.userId = this.authService.getUserId()

  }

  ngAfterViewInit(): void {
    if (this.comparedCarpooling && this.mapContainer) {
      this.initializeMaps();
    }
  }


  async getComparedCarpooling(): Promise<void> {
    try {
      const comparedCarpoolingData = await this.carpoolingService.compareLastPreferenceAndLastCarpooling().toPromise();
      if (comparedCarpoolingData) {
        const departureLocation = L.latLng(parseFloat(comparedCarpoolingData.latitudeDeparture), parseFloat(comparedCarpoolingData.longitudeDeparture));
        const departureLocationName = await this.getLocationName(departureLocation);
        this.comparedCarpooling = comparedCarpoolingData;
        // Assign departure location name
        this.cd.detectChanges();  // Manually trigger change detection
        await this.initializeMaps();
      }
    } catch (error) {
      console.error('Error fetching compared carpooling:', error);
    }
  }

  async initializeMaps(): Promise<void> {
    try {
      console.log('Map container:', this.mapContainer);

      // Ensure mapContainer is defined before accessing its nativeElement property
      if (this.mapContainer && this.mapContainer.nativeElement) {
        const latitudeDeparture = parseFloat(this.comparedCarpooling.latitudeDeparture);
        const longitudeDeparture = parseFloat(this.comparedCarpooling.longitudeDeparture);
        const latitudeDestination = parseFloat(this.comparedCarpooling.latitudeDestination);
        const longitudeDestination = parseFloat(this.comparedCarpooling.longitudeDestination);

        // Check if the coordinates are valid numbers
        if (isNaN(latitudeDeparture) || isNaN(longitudeDeparture) || isNaN(latitudeDestination) || isNaN(longitudeDestination)) {
          console.error('Invalid coordinates for carpooling:', this.comparedCarpooling.carpoolingID);
          // Skip this carpooling and continue with the next one
          return;
        }

        const mapId = this.mapContainer.nativeElement.id;
        const map = L.map(mapId, {
          center: [latitudeDeparture, longitudeDeparture],
          zoom: 15
        });

        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Fetch location names asynchronously
        const departureLocation = L.latLng(latitudeDeparture, longitudeDeparture);
        const destinationLocation = L.latLng(latitudeDestination, longitudeDestination);
        const departureName = await this.getLocationName(departureLocation);
        const destinationName = await this.getLocationName(destinationLocation);

        // Create custom icons for departure and destination markers
        const depIcon = L.icon({
          iconUrl: '/assets/backOffice/img/dep.png',
          iconSize: [32, 32],
          iconAnchor: [16, 16],
          popupAnchor: [0, -16]
        });

        const destIcon = L.icon({
          iconUrl: '/assets/backOffice/img/dest.png',
          iconSize: [32, 32],
          iconAnchor: [16, 16],
          popupAnchor: [0, -16]
        });

        // Add markers with custom icons and tooltips
        L.marker([latitudeDeparture, longitudeDeparture], { icon: depIcon })
          .addTo(map)
          .bindPopup('Departure Location')
          .bindTooltip(departureName, { direction: 'top', permanent: true })
          .openTooltip();

        // Add destination marker with custom icon and tooltip
        L.marker([latitudeDestination, longitudeDestination], { icon: destIcon })
          .addTo(map)
          .bindPopup('Destination Location')
          .bindTooltip(destinationName, { direction: 'top', permanent: true })  // Ensure destination name is bound
          .openTooltip();

        // Create a routing control
        const routingControl = L.Routing.control({
          waypoints: [
            L.latLng(latitudeDeparture, longitudeDeparture),
            L.latLng(latitudeDestination, longitudeDestination)
          ],
          routeWhileDragging: false,
          geocoder: (<any>L.Control).Geocoder.nominatim(),
          router: new L.Routing.OSRMv1({
            serviceUrl: 'https://router.project-osrm.org/route/v1'
          }),
          formatter: new L.Routing.Formatter(),
          createControl: false , // Prevent the creation of the control panel
          addWaypoints: false
        });

        // Add the routing control to the map
        routingControl.addTo(map);

        // Remove the route instructions control from the map
        const routeInstructionsContainer = routingControl.getContainer();
        if (routeInstructionsContainer) {
          map.removeControl(routeInstructionsContainer);
        }

      } else {
        console.error('Map container or nativeElement is undefined.');
      }
    } catch (error) {
      console.error('Error initializing maps:', error);
    }
  }

  private async getLocationName(location: L.LatLng): Promise<string> {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${location.lat}&lon=${location.lng}&format=json`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.display_name) {
        return data.display_name;
      } else {
        return 'Location Name Not Found';
      }
    } catch (error) {
      console.error('Error fetching location name:', error);
      throw error;
    }
  }
  addBooking(carpoolingID: number): void {
    const newBooking = new Booking();
    newBooking.nb = this.newBooking.nb;


    this.bookingService.addBooking(newBooking, carpoolingID,this.userId)
      .subscribe(
        () => {

          // Handle successful booking creation
          alert('Booking successfully added!');
        },
        (error) => {
          // Handle error
          alert('Failed to add booking. Please try again later.');
          console.error('Error adding booking:', error);
        }
      );

  }

}

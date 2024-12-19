import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Carpooling} from "../../../../entity/Carpooling";
import {Booking} from "../../../../entity/Booking";
import {CarpoolingType} from "../../../../entity/CarpoolingType";
import {CarpoolingService} from "../../../../Services/carpooling.service";
import {BookingService} from "../../../../Services/booking.service";

import 'leaflet-routing-machine';
import 'leaflet-control-geocoder';
import * as L from "leaflet";
declare module 'leaflet' {
  namespace Routing {
    function control(options?: any): any;
  }
}
@Component({
  selector: 'app-display-all-carpoolings',
  templateUrl: './display-all-carpoolings.component.html',
  styleUrls: ['./display-all-carpoolings.component.css']
})
export class DisplayAllCarpoolingsComponent implements OnInit, AfterViewInit {
  myHeaders: Headers = new Headers();
  raw: string;
  requestOptions: RequestInit;
  carpoolings: Carpooling[] = [];
  newBooking: Booking = new Booking();
  departureLocationNames: string[] = [];
  destinationLocationNames: string[] = [];
  selectedCarpoolingType: CarpoolingType; // Variable to store the selected carpooling type
// Inside your component class
  carpoolingTypes: CarpoolingType[] = [CarpoolingType.SPECIFIC, CarpoolingType.DAILY]; // Replace with your actual carpooling types
  departureLocationFilter: string = '';
  selectedDay: string;

  // Chart options

  daily :number=0;
  specifics:number=0;
  chartData: any[];
  colorScheme = { domain: ['#5AA454', '#C7B42C'] };
  showXAxis = true;
  showYAxis = true;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  constructor(private carpoolingService: CarpoolingService, private bookingService: BookingService, private cd: ChangeDetectorRef) {
    this.myHeaders.append("Authorization", "App 795ecc02c9f2d49fe25924edd434f718-14affa4c-5bdd-4c88-b905-9eb13104e963");
    this.myHeaders.append("Content-Type", "application/json");
    this.myHeaders.append("Accept", "application/json");
    this.raw = JSON.stringify({
      "messages": [
        {
          "destinations": [{"to": "21693432084"}],
          "from": "ServiceSMS",
          "text": "Hello,\n\nThis is a test message from Infobip. Have a nice day!"
        }
      ]
    });
    this.requestOptions = {
      method: "POST",
      headers: this.myHeaders,
      body: this.raw,
      redirect: "follow"
    };

    this.sendMessage();

  }

  ngOnInit(): void {
    this.getCarpools();
  }

  ngAfterViewInit(): void {
    // No need to initialize maps here
  }

  filterCarpoolsByDeparture(): void {
    const filterValue = this.departureLocationFilter.toLowerCase().trim();
    if (filterValue === '') {
      // If the search query is empty, reset the list to all carpools
      this.getCarpools();
    } else {
      // Filter carpools based on the departure place
      this.carpoolings = this.carpoolings.filter(carpool => {
        const departureName = this.departureLocationNames[this.carpoolings.indexOf(carpool)].toLowerCase();
        return departureName.includes(filterValue);
      });

      // Check if any carpools match the filter
      if (this.carpoolings.length === 0) {

      }

      // Reinitialize maps after filtering
      this.initializeMaps();
    }
  }


  async initializeMaps(): Promise<void> {
    try {
      for (const carpool of this.carpoolings) {
        const latitudeDeparture = parseFloat(carpool.latitudeDeparture);
        const longitudeDeparture = parseFloat(carpool.longitudeDeparture);
        const latitudeDestination = parseFloat(carpool.latitudeDestination);
        const longitudeDestination = parseFloat(carpool.longitudeDestination);

        // Check if the coordinates are valid numbers
        if (isNaN(latitudeDeparture) || isNaN(longitudeDeparture) || isNaN(latitudeDestination) || isNaN(longitudeDestination)) {
          console.error('Invalid coordinates for carpooling:', carpool.carpoolingID);
          continue;  // Skip this carpooling and continue with the next one
        }

        const mapId = `map_${carpool.carpoolingID}`;
        const map = L.map(mapId, {
          center: [latitudeDeparture, longitudeDeparture],
          zoom: 15
        });

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
        L.marker([latitudeDeparture, longitudeDeparture], {icon: depIcon})
          .addTo(map)
          .bindPopup('Departure Location')
          .bindTooltip(departureName, {direction: 'top', permanent: true})
          .openTooltip();

        // Add destination marker with custom icon and tooltip
        L.marker([latitudeDestination, longitudeDestination], {icon: destIcon})
          .addTo(map)
          .bindPopup('Destination Location')
          .bindTooltip(destinationName, {direction: 'top', permanent: true})  // Ensure destination name is bound
          .openTooltip();

        // Create a routing control
        const routingControl = L.Routing.control({
          waypoints: [
            L.latLng(latitudeDeparture, longitudeDeparture),
            L.latLng(latitudeDestination, longitudeDestination)
          ], routeWhileDragging: true,
          geocoder: (<any>L.Control).Geocoder.nominatim(),
          router: new L.Routing.OSRMv1({
            serviceUrl: 'https://router.project-osrm.org/route/v1'
          }),
          formatter: new L.Routing.Formatter(),
          createControl: false  // Prevent the creation of the control panel
        });

        // Add the routing control to the map
        routingControl.addTo(map);

        // Remove the route instructions control from the map
        const routeInstructionsContainer = routingControl.getContainer();
        if (routeInstructionsContainer) {
          map.removeControl(routeInstructionsContainer);
        }
      }
    } catch (error) {
      console.error('Error initializing maps:', error);
    }
  }


  async getCarpools(): Promise<void> {
    try {
      const data = await this.carpoolingService.getAllCarpooling().toPromise();

      const departureLocationNames: string[] = []; // Array to store departure location names
      for (const carpool of data) {
        const departureLocation = L.latLng(parseFloat(carpool.latitudeDeparture), parseFloat(carpool.longitudeDeparture));
        // Fetch and store departure location name
        departureLocationNames.push(await this.getLocationName(departureLocation));
        if (carpool.carpoolingType === CarpoolingType.DAILY) {
          this.daily++;
        } else if (carpool.carpoolingType === CarpoolingType.SPECIFIC) {
          this.specifics++;
        }
      }
      this.chartData = [
        { name: 'DAILY', value: this.daily },
        { name: 'SPECIFIC', value: this.specifics }
      ];
      this.carpoolings = data;
      this.departureLocationNames = departureLocationNames; // Assign departure location names to component property
      this.cd.detectChanges();  // Manually trigger change detection
      await this.initializeMaps();
    } catch (error) {
      console.error('Error getting carpools:', error);
      // Handle errors
    }

  }
  updateChartData(): void {
    this.chartData = [
      { name: 'DAILY', value: this.daily },
      { name: 'SPECIFIC', value: this.specifics }
    ];
  }
  private async getLocationName(location: L.LatLng): Promise<string> {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${location.lat}&lon=${location.lng}&format=json`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch location name');
      }
      const data = await response.json();

      if (data.display_name) {
        return data.display_name;
      } else {
        return 'Location Name Not Found';
      }
    } catch (error) {
      console.error('Error fetching location name:', error);
      // You can implement retry logic here if needed
      throw error; // Re-throw the error to propagate it further
    }
  }


  private async fetchLocationNames(): Promise<void> {
    try {
      console.log('Fetching location names for carpoolings:', this.carpoolings);

      // Create a temporary map or object to store location names
      const locationNamesMap = new Map<number, { departure: string, destination: string }>();

      for (const carpool of this.carpoolings) {
        const departureLocation = L.latLng(parseFloat(carpool.latitudeDeparture), parseFloat(carpool.longitudeDeparture));
        const destinationLocation = L.latLng(parseFloat(carpool.latitudeDestination), parseFloat(carpool.longitudeDestination));

        const departureName = await this.getLocationName(departureLocation);
        const destinationName = await this.getLocationName(destinationLocation);

        // Store location names in the temporary map
        locationNamesMap.set(carpool.carpoolingID, {departure: departureName, destination: destinationName});
      }

      // Update the departureLocationNames and destinationLocationNames arrays
      this.departureLocationNames = [];
      this.destinationLocationNames = [];
      locationNamesMap.forEach(value => {
        this.departureLocationNames.push(value.departure);
        this.destinationLocationNames.push(value.destination);
      });
    } catch (error) {
      console.error('Error fetching location names:', error);
    }
  }


  sendMessage(): void {
    const myHeaders: Headers = new Headers();
    myHeaders.append("Authorization", "App 795ecc02c9f2d49fe25924edd434f718-14affa4c-5bdd-4c88-b905-9eb13104e963");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");

    const raw: string = JSON.stringify({
      "messages": [
        {
          "destinations": [{"to": "21693432084"}],
          "from": "ServiceSMS",
          "text": "Hellpooo,\n\nThis is a test message from Infobip. Have a nice day!"
        }
      ]
    });

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("https://43nzjn.api.infobip.com/sms/2/text/advanced", requestOptions)
      .then((response: Response) => response.text())
      .then((result: string) => console.log(result))
      .catch((error: any) => console.error(error));
  }





  confirmDelete(carpoolingID: number): void {
    if (confirm('Are you sure you want to delete this carpooling?')) {
      this.deleteCarpooling(carpoolingID);
    }
  }

  deleteCarpooling(carpoolingId: number): void {
    this.carpoolingService.deleteCarpooling(carpoolingId).subscribe(
      () => {
        this.carpoolings = this.carpoolings.filter(carpool => carpool.carpoolingID !== carpoolingId);
        alert('Carpooling successfully deleted!');
      },
      (error) => {
        alert('Failed to delete carpooling. Please try again later.');
        console.error('Error deleting carpooling:', error);
      }
    );
  }

  async filterCarpoolsByType(): Promise<void> {
    if (this.selectedCarpoolingType) {
      try {
        const filteredCarpools = await this.carpoolingService.findByCarpoolingType(this.selectedCarpoolingType).toPromise();
        this.carpoolings = filteredCarpools;
        await this.fetchLocationNames();
        await this.initializeMaps();
      } catch (error) {
        console.error('Error filtering carpools by type:', error);
      }
    } else {
      // If no type is selected, reset the list to all carpools
      this.getCarpools();
    }
  }
  async filterByDay(): Promise<void> {
    console.log('Selected day:', this.selectedDay);
    if (this.selectedDay) {
      try {
        const filteredCarpools = await this.carpoolingService.findByDay(this.selectedDay).toPromise();
        this.carpoolings = filteredCarpools;
        await this.fetchLocationNames();
        await this.initializeMaps();
        // Other operations if needed
      } catch (error) {
        console.error('Error filtering carpools by day:', error);
      }
    } else {
      // If no day is selected, reset the list to all carpools
      this.getCarpools();
    }
  }

}

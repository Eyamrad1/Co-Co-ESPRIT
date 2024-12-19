import {Component, OnInit} from '@angular/core';

import {ActivatedRoute, Router} from "@angular/router";
import {EventService} from "../../../Services/event.service";
import {WeatherService} from "../../../Services/weather.service";
import {ReservationService} from "../../../Services/reservation.service";
import {Event} from "../../../entity/Event";


@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  eventId?: number;
  event: Event | undefined;
  weatherForecast: any[] = []; // Define the weatherForecast property
  events: Event[] = [];



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    public weatherService: WeatherService,
    private reservationService: ReservationService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log('Route params:', params);
      const idParam = params['eventId'];
      this.eventId = isNaN(idParam) ? undefined : +idParam;
      this.loadEventDetails();
    });
  }
    goToReservationForm( eventId:number): void {
        if (eventId !== undefined) {
        this.router.navigate(['/user/reservation', eventId]);
        } else {
            console.error('Invalid event ID');
            // Handle error appropriately
        }

    }

  loadEventDetails(): void {
    if (this.eventId !== undefined) {
      this.eventService.getEvent(this.eventId).subscribe(
        (data: Event) => {
          this.event = data;
          if (this.event?.eventDate && this.event?.eventLocation) {
            const eventDate = new Date(this.event.eventDate);
            this.fetchWeather(eventDate);
          }
        },
        (error) => {
          console.error('Error loading event details', error);
        }
      );
    } else {
      console.error('Event ID not found in route parameters');
    }
  }



  fetchWeather(date: Date): void {
        const location = 'Tunisia'; // Replace with the actual location
        const formattedDate = this.weatherService.formatDate(date);
        // Call the service method to fetch weather data
        this.weatherService.getWeatherForecast(location, formattedDate).subscribe(
            (data) => {
                console.log('Weather forecast:', data);
                // Get the weather icon URL
                const iconUrl = this.weatherService.getWeatherIconUrl(data.weather[0].icon);
                console.log('Weather icon URL:', iconUrl);
                // Push the weather data to the forecast array
                this.weatherForecast.push(data);
            },
            (error) => {
                console.error('Error fetching weather forecast', error);
                // Handle error appropriately
            }
        );
    }












    // Function to format the date
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }


  addEvaluation(eventId?: number): void {
    if (eventId !== undefined) {
      // Navigate to Add Evaluation component with the event ID
      this.router.navigate(['/add-evaluation', eventId]);
    } else {
      console.error('Invalid event ID');
      // Handle error appropriately
    }
  }
}

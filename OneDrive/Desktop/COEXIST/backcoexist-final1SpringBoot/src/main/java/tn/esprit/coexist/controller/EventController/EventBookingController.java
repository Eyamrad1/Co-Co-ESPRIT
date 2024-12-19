package tn.esprit.coexist.controller.EventController;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.coexist.entity.Event;
import tn.esprit.coexist.entity.EventBooking;
import tn.esprit.coexist.entity.User;
import tn.esprit.coexist.repository.EventRepository;
import tn.esprit.coexist.repository.UserRepository;
import tn.esprit.coexist.service.EventService.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@AllArgsConstructor
public class EventBookingController {
    @Autowired
    EventBookingService eventBookingService;
    @Autowired EventService eventService;
    @Autowired
    UserRepository userRepository;
    @Autowired
    EventRepository eventRepository;
    @Autowired
    public EventBookingController(EventBookingService eventBookingService) {
        this.eventBookingService = eventBookingService;
    }





    @PostMapping("/createReservation")
    public ResponseEntity<String> createReservationWithPayment(
            @RequestParam("userId") Integer userId,
            @RequestParam("eventId") Integer eventId,
            @RequestParam int numberOfTickets,
            @RequestParam String cardNumber,
            @RequestParam String cardHolderName,
            @RequestParam String expirationDate,
            @RequestParam String cvv) {

        double totalAmount;
        try {
            // Create the reservation and process payment
            totalAmount = eventBookingService.createReservation(userId, eventId, numberOfTickets,cardNumber, cardHolderName,
                    expirationDate,  cvv);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User not found");
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }

        return ResponseEntity.status(HttpStatus.OK).body("Reservation created successfully. Total amount: " + totalAmount);
    }


    @GetMapping("/getAllEventBookings")
    public List<EventBooking> getAllEventBookings() {
        return eventBookingService.getALLBooking();
    }

    @DeleteMapping("/deleteEventBooking/{bookingEventId}")
    public String deleteEventBookingById(@PathVariable Integer bookingEventId) {
        eventBookingService.deleteEventBookingById(bookingEventId);
        return "Event Booking deleted successfully";
    }
}
package tn.esprit.coexist.controller.EventController;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.coexist.entity.Event;
import tn.esprit.coexist.entity.User;
import tn.esprit.coexist.service.EventService.EventService;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")

@AllArgsConstructor
public class EventController {

    @Autowired
    EventService eventService;
    private static final String baseUrl = "http://localhost:8000/images/";



    @PostMapping("/addUser")
    public User addUser(@RequestBody User user) {
        return eventService.addUser(user);
    }

    @PostMapping("/add-event")
    public ResponseEntity<?> addEvent(
            @RequestParam("image") MultipartFile imageFile,
            @ModelAttribute Event event) {
        try {
            Event savedEvent = eventService.AddEvent(event, imageFile);
            return ResponseEntity.ok(savedEvent);
        } catch (Exception e) {
            e.printStackTrace();

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to add event: " + e.getMessage());
        }
    }

    @PostMapping("/{eventId}/share-fb")
    public String shareEventOnFacebook(@PathVariable Integer eventId) {
        // Retrieve the image URL associated with the event
        Event event = eventService.findById(eventId);
        String imageUrl = event.getImageUrl();

        // Share the event on Facebook
        String result = eventService.shareFb(eventId);

        return result;
    }

    @GetMapping("/most-liked")
    public ResponseEntity<Event> findMostLikedEvent() {
        Event mostLikedEvent = eventService.findMostLikedEvent();
        if (mostLikedEvent != null) {
            return new ResponseEntity<>(mostLikedEvent, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @PutMapping("/updateEvent/{eventId}")
    public Event updateEvent(@RequestBody Event event, @PathVariable Integer eventId) {
        return eventService.updateEvent(event, eventId);
    }

    @GetMapping("/findByIdEvent/{eventId}")
    public Event findById(@PathVariable Integer eventId) {
        Event event = eventService.findById(eventId);
        String relativeImageUrl = event.getImageUrl(); // Get the relative image URL from the event
        String fullImageUrl = baseUrl + relativeImageUrl; // Construct the full image URL

        // Update the event's image URL with the full URL
        event.setImageUrl(fullImageUrl);

        return event;
    }


    @GetMapping("/retrieveAllEvents")
    public List<Event> retrieveAllEvents() {
        List<Event> events = eventService.retrieveAllEvents();
        String baseUrl = "http://localhost:8000/images/";
        events.forEach(event -> {
            String relativeImageUrl = event.getImageUrl();
            String fullImageUrl = baseUrl + relativeImageUrl;
            event.setImageUrl(fullImageUrl);
        });
        return events;
    }
    @GetMapping("recherche/{keyword}")
    public List<Event> recherche(@PathVariable("keyword") String keyword) {
        return eventService.recherche (keyword);
    }

    @PutMapping("/events/{eventId}/reaction")
    public ResponseEntity<?> addOrUpdateReaction(
            @RequestParam Integer userId,
            @RequestParam Boolean isLiked,
            @PathVariable Integer eventId
    ) {
        try {
            // Get the current date and time
            Date likedAt = new Date();

            // Retrieve the event
            Event event = eventService.findById(eventId);

            // Call the service method to add or update the reaction
            eventService.addOrUpdateReaction(event, userId, isLiked, likedAt);

            // Return success response
            return ResponseEntity.ok().build();
        } catch (EntityNotFoundException e) {
            // Return not found response if the event is not found
            return ResponseEntity.notFound().build();
        } catch (IllegalStateException e) {
            // Return bad request response if there's an illegal state (e.g., user has not made a reservation)
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            // Return internal server error response for other exceptions
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to add or update reaction: " + e.getMessage());
        }
    }


    @DeleteMapping("/deleteEventById/{eventId}")
    public String deleteEventById(@PathVariable Integer eventId) {
        eventService.deleteEventById(eventId);
        return "Event deleted successfully";
    }
    @GetMapping("/search/date")
    public List<Event> searchByDate(@RequestParam LocalDateTime eventDate) {
        return eventService.searchByDate(eventDate);
    }

    // Search by description
    @GetMapping("/search/description")
    public List<Event> searchByDescription(@RequestParam String eventDescription) {
        return eventService.searchByDescription(eventDescription);
    }

    // Search by location
    @GetMapping("/search/location")
    public List<Event> searchByLocation(@RequestParam String eventLocation) {
        return eventService.searchByLocation(eventLocation);
    }

}
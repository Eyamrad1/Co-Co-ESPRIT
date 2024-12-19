package tn.esprit.coexist.service.EventService;

import facebook4j.Facebook;
import facebook4j.FacebookException;
import facebook4j.FacebookFactory;
import facebook4j.PostUpdate;
import facebook4j.auth.AccessToken;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.coexist.entity.Event;
import tn.esprit.coexist.entity.LikedEvents;
import tn.esprit.coexist.entity.User;
import tn.esprit.coexist.repository.EventBookingRepository;
import tn.esprit.coexist.repository.EventRepository;
import tn.esprit.coexist.repository.LikedEventsRepository;
import tn.esprit.coexist.repository.UserRepository;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class EventServiceImp implements EventService{
    public static final String uploadDirectory = "C:/xampp/htdocs/images/";


    @Autowired
    EventRepository eventRepository;

    @Autowired
    UserRepository userRepository;
    @Autowired
    EventBookingRepository eventBookingRepository;

    @Autowired
    LikedEventsRepository likedEventsRepository;
    @Autowired
    private JavaMailSender javaMailSender; // Inject JavaMailSender

    @Override
    public User addUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public Event AddEvent(Event event, MultipartFile imageFile) {
        try {
            Path directoryPath = Paths.get(uploadDirectory);
            if (!Files.exists(directoryPath)) {
                Files.createDirectories(directoryPath);
            }
            String originalFilename = imageFile.getOriginalFilename();
            String fileName = UUID.randomUUID().toString() + "_" + originalFilename;

            Path filePath = Paths.get(uploadDirectory, fileName);

            Files.write(filePath, imageFile.getBytes());

            event.setImageUrl(fileName);

            // Send email notification
            sendNewEventEmailNotification();

            return eventRepository.save(event);
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to upload image");
        }
    }
    public User findUserById(Integer id) {
        return userRepository.findById(id).orElse(null);
    }
    private void sendNewEventEmailNotification() {
        SimpleMailMessage message = new SimpleMailMessage();
        String Newligne = System.getProperty("line.separator");
        String url = "http://localhost:4200/events/";
        message.setFrom("aya.mrade@gmail.com");
        message.setTo("mradeya216@gmail.com");
        message.setSubject("Exciting News: New Event Added!");
        message.setText("Hi,\n\nWe're excited to invite you to our latest event! Mark your calendar and don't miss out.Click the link below for more information." +
                "See you there!\n \nBest regards,\nThe [COEXIST] Team\");" + Newligne + url);
        javaMailSender.send(message);
    }


    @Override
    public Event updateEvent(Event event, Integer eventId) {
        event.setEventId(eventId);
        return eventRepository.save(event);
    }

    @Override
    public Event findById(Integer eventId) {
        return eventRepository.findById(eventId).orElse(null);
    }

    @Override
    public List<Event> retrieveAllEvents() {
        List<Event> listEvents = eventRepository.findAll();
        return listEvents;
    }




    @Override
    public void addOrUpdateReaction(Event event, Integer userId, Boolean isLiked, Date likedAt) {
        // Ensure likedAt is set to the provided value or the current date and time
        if (likedAt == null) {
            likedAt = new Date();
        }

        // Retrieve the user entity using the provided user ID
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + userId));

        // Check if the user has made a reservation for the event
        boolean hasReservation = eventBookingRepository.existsByUserUserIdAndEventEventId(userId, event.getEventId());
        if (!hasReservation) {
            throw new IllegalStateException("User must make a reservation before liking or disliking the event.");
        }

        // Initialize like and dislike counts if null
        if (event.getLikeCount() == null) {
            event.setLikeCount(0);
        }
        if (event.getDislikeCount() == null) {
            event.setDislikeCount(0);
        }

        // Create a new LikedEvents object
        LikedEvents newReaction = new LikedEvents();
        newReaction.setLikedAt(likedAt);
        newReaction.setEvent(event);
        newReaction.setUser(user); // Set the user

        // Save the new reaction
        likedEventsRepository.save(newReaction);

        // Update like and dislike counts based on the isLiked parameter
        if (isLiked) {
            event.setLikeCount(event.getLikeCount() + 1);
            if (event.getDislikeCount() > 0) {
                event.setDislikeCount(event.getDislikeCount() - 1);
            }
        } else {
            event.setDislikeCount(event.getDislikeCount() + 1);
            if (event.getLikeCount() > 0) {
                event.setLikeCount(event.getLikeCount() - 1);
            }
        }

        // Save the updated event
        eventRepository.save(event);
    }

    @Override
    public Event findMostLikedEvent() {
        // Query the database to find the event with the highest number of likes
        List<Event> events = eventRepository.findAll(); // Assuming this method exists in your repository
        Event mostLikedEvent = null;
        int maxLikes = 0;

        for (Event event : events) {
            if (event.getLikeCount() != null && event.getLikeCount() > maxLikes) {
                maxLikes = event.getLikeCount();
                mostLikedEvent = event;
            }
        }

        return mostLikedEvent;
    }



    @Override
    public String shareFb(Integer eventId){
        String appId = "751112430484733";
        String appSecret = "9b20f8861899eb4c00293925835bda7f";
        String accessTokenString = "EAAKrIf2aZCP0BO8lQuhSl6mzcBMczxkNfb0BX3j8lIvwRv9KkaL9kJtLZCmysfdBeekpcNRKTneJIlcsYf3h8PpL2LI8XHV0mqkZA68lnRotTU8FQaOyIjBz05zuODD4uF6MPGYZBFWybCKCbN6cJRaSNAt54MBXEyoLK3WwNMxRV1Yas2rWCplQtbDd3uoZD";

        // Set up Facebook4J
        Facebook facebook = new FacebookFactory().getInstance();
        facebook.setOAuthAppId(appId, appSecret); // Set the OAuth app ID and secret
        facebook.setOAuthAccessToken(new AccessToken(accessTokenString, null));

        // Post a status message
        Event event = eventRepository.findById(eventId).orElse(null);

        // Construct full image URL
        String baseUrl = "http://localhost:8000/images/";
        String fullImageUrl = baseUrl + event.getImageUrl();

        // Construct the message
        String message = "New Post :\n" + event.getEventName() + "\n" + event.getEventDescription() + "\n" + fullImageUrl + "\n";

        // Specify the Page ID you want to post to
        String pageId = "275964915602764";

        try {
            facebook.postFeed(new PostUpdate(pageId).message(message));
            return "Status message posted successfully.";
        } catch (FacebookException e) {
            e.printStackTrace();
            System.err.println("Error posting status message: " + e.getMessage());
            return "Error";
        }
    }



    @Override
    public void deleteEventById(Integer eventId) {
        eventRepository.deleteById(eventId);
    }

    @Override
    public List<Event> recherche(String keyword) {
        if (keyword != null) {
            return eventRepository.recherche(keyword);
        } else {
            return eventRepository.findAll();
        }
    }



    @Override
    public List<Event> searchByDate(LocalDateTime eventDate) {
        return eventRepository.findByEventDate(eventDate);
    }

    @Override
    public List<Event> searchByDescription(String eventDescription) {
        return eventRepository.findByEventDescriptionContaining(eventDescription);
    }

    @Override
    public List<Event> searchByLocation(String eventLocation) {
        return eventRepository.findByEventLocationContaining(eventLocation);
    }




}
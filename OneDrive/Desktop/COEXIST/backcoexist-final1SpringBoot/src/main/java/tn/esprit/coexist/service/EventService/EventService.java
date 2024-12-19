package tn.esprit.coexist.service.EventService;

import org.springframework.web.multipart.MultipartFile;
import tn.esprit.coexist.entity.Event;
import tn.esprit.coexist.entity.User;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

public interface EventService {



    public User addUser(User user);
    public Event AddEvent(Event event, MultipartFile imageFile);


    public Event updateEvent(Event event, Integer eventId);
    public void addOrUpdateReaction(Event event, Integer userId, Boolean isLiked, Date likedAt);
    public String shareFb(Integer eventId);


    public Event findById(Integer eventId);

    public List<Event> retrieveAllEvents();
    Event findMostLikedEvent();
    public User findUserById(Integer UserId);





    public void deleteEventById(Integer eventId);


    public List<Event> recherche(String keyword);


    List<Event> searchByDate(LocalDateTime eventDate);

    List<Event> searchByDescription(String eventDescription);

    List<Event> searchByLocation(String eventLocation);




}
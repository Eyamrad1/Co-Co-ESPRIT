package tn.esprit.coexist.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)



    Integer eventId;
    @Column(name = "event_name")

    String eventName;
    String eventDescription;
    @Column(name = "event_date")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    LocalDateTime eventDate;
    String eventLocation;
    String imageUrl;
    private Integer totalPlaces; // Total number of places available for the event
    private Integer remainingPlaces; // Number of places still available
    double pricePerTicket;


    private Integer likeCount;
    private Integer dislikeCount;


    public void updateRemainingPlaces(int numberOfTicketsReserved) {
        if (remainingPlaces == null || totalPlaces == null || pricePerTicket == 0.0) {
            throw new IllegalStateException("Price per ticket must be set before updating remaining places.");
        }

        // Subtract the number of tickets reserved from the remaining places
        remainingPlaces -= numberOfTicketsReserved;

        // Ensure remaining places does not become negative
        remainingPlaces = Math.max(remainingPlaces, 0);
    }
    public void setPricePerTicket(double pricePerTicket) {
        this.pricePerTicket = pricePerTicket;
    }
    public double calculateTotalAmount(int numberOfTickets) {
        return numberOfTickets * pricePerTicket;
    }

    @ManyToOne
    private User user;


    @OneToMany(mappedBy = "event",cascade = CascadeType.ALL)
    @JsonIgnore
    private List<LikedEvents> likedEventsList;

    @OneToMany(mappedBy = "event",cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Evaluation>evaluations;

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<EventBooking> eventBookings;
}
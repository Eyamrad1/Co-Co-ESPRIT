package tn.esprit.coexist.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class EventBooking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer bookingEventId;
    int numberOfTickets;
    double totalAmount;


    String cardNumber;
    String cardHolderName;
    String expirationDate;
    String cvv;
    @ManyToOne
    private Event event;

    @ManyToOne
    private User user;




}
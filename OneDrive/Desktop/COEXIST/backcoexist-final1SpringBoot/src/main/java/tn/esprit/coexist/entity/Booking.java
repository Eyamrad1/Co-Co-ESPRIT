package tn.esprit.coexist.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data

public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer BookingID;

    private Integer nb;
    @ManyToOne
    @JsonIgnore
    private Carpooling carpooling;
    @ManyToOne (cascade = CascadeType.ALL)
    private User user;
    @OneToOne(mappedBy = "booking")
    @JsonIgnore
    private FeedBack feedBack;@Override
    public String toString() {
        return "Booking{" +
                "bookingID=" + getBookingID() +
                ", nb=" + nb +
                ", user=" + user + // Include other fields as needed
                ", feedback=" + feedBack + // Include other fields as needed
                '}';
    }

}

package tn.esprit.coexist.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Data
public class Preference{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer preferenceID;
    private LocalDateTime DepartureTime;
    private String longitudeDeparture;
    private String latitudeDestination;

    private String latitudeDeparture;
    private String longitudeDestination;



    private  int AvailableSeats;
    private float CostPerSeat;
    @Enumerated(EnumType.STRING)
    private Day day;
    private  LocalTime time;
    @Enumerated(EnumType.STRING)
    private CarpoolingType carpoolingType;
    @OneToOne(mappedBy = "preference")

    private User user;

}

package tn.esprit.coexist.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Delivery {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int deliveryId;

    @Temporal(TemporalType.DATE)
    private Date deliveryDate;

    private String deliveryAddress;
    private String deliveryPostalCode;
    private String deliveryCity;



    @OneToOne
    private Orderr orderr;


    @ToString.Exclude
    @JsonIgnore
    @ManyToOne
    User user;
}

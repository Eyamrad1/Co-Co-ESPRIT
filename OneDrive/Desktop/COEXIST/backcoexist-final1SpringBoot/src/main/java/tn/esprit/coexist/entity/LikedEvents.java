package tn.esprit.coexist.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class LikedEvents {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer idEventLiked;
    @Temporal(TemporalType.TIMESTAMP)
    Date likedAt;
    Boolean isLiked;



    @ManyToOne
    private Event event;


    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;


}

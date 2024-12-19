package tn.esprit.coexist.entity.ColocationEntity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class CollocationFeedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer feedId;
    private String  feed_Back;
    private Integer rate;
    @ManyToOne
    private CollocationBooking collocationBooking;
}


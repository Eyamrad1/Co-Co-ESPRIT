package tn.esprit.coexist.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class FeedBack {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer feedBackId;
    private String  feed_Back;
    private Integer rate;
    //@OneToOne(mappedBy = "feedback")
    @OneToOne
    private Booking booking;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}

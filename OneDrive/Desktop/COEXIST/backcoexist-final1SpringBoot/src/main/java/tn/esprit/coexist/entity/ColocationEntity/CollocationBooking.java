package tn.esprit.coexist.entity.ColocationEntity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;

import tn.esprit.coexist.entity.User;

@Entity
@Data
public class CollocationBooking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idCollocationBooking;
    private Date startDate;
    private Date endDate;
    private String telephone;
    private String message;
    @ManyToOne
    @JoinColumn(name = "announcement_id")
    private AnnoncementCollocation annoncementCollocation;
    @OneToMany(mappedBy = "collocationBooking",cascade = CascadeType.ALL)
    @JsonIgnore
    private List<CollocationFeedback>CollocationFeedbacks;
    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;
    @JsonIgnore
    @ManyToMany(mappedBy = "bookings")
    private List<AnnoncementCollocation> collocations;
}
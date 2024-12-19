package tn.esprit.coexist.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Data
public class React {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private  Integer reactId;
    private  boolean isLaked;
    private  Date timestampp;
    @ManyToOne
    @JsonIgnore
    private Subject subject;
    @ManyToOne

    private  User user;


}

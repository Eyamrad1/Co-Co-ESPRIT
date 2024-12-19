package tn.esprit.coexist.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Data
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer commentId;
    private String content;
    private Date timestamp;
    @ManyToOne
    private User user;
    @ManyToOne
    private Subject subject;
}

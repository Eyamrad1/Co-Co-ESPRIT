package tn.esprit.coexist.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class Evaluation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long IdEvaluation;
    @Enumerated(EnumType.STRING)
    private EventPosition eventPosition;
    String comment;

    @ManyToOne
    private Event event;

}

package tn.esprit.coexist.dto;

import jakarta.persistence.*;
import lombok.*;

import java.util.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class OTP {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    String identification;
    Date expiredDate;
}

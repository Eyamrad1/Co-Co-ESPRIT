package tn.esprit.coexist.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idPayment;

    private String tokenId;

    private BigDecimal amount;

    private String currency;
    @OneToOne
    Orderr orderr;

    private String    username ;
    private String   email;
}

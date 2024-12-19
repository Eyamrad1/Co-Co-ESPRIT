package tn.esprit.coexist.entity;

import jakarta.persistence.*;

import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderItem {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    public Integer idOrderItem;
    public int quantity;

    @Column(name = "paid", nullable = false)
    private boolean paid = false;

    @ManyToOne

    public Product product;

    @ManyToOne

    public Orderr orderr;



    @ManyToOne

    public User user;
}

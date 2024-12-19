package tn.esprit.coexist.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

import java.util.Date;
import java.util.List;

@Entity
@Data
public class Orderr {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Integer orderId;
    /*private String quantity;
    @ManyToMany(mappedBy = "orderEntities",cascade = CascadeType.ALL)
    private List<Product>products;
     */

    private Date dateOrder;
    private OrderStatus status;
    private float costOrder;
    private String codeOrder; // Champ pour le code de commande

    private String codeQR;

    @OneToMany(mappedBy = "orderr",cascade = CascadeType.ALL)
    @ToString.Exclude
    @JsonIgnore
    public List<OrderItem> orderItems;


    @ManyToOne

    User user;



    @OneToOne(mappedBy = "orderr")
    @ToString.Exclude
    @JsonIgnore
    private Delivery delivery;




}

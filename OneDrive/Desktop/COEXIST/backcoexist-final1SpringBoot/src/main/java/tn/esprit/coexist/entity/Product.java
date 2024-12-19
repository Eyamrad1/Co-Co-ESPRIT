package tn.esprit.coexist.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

import java.util.Date;
import java.util.List;

@Entity
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Integer productId;
    private String productName;
    private String description;
    private String image;
    private Integer rate;
    private int stock;
    private float price;

    @Enumerated(EnumType.STRING)
    public TypeProduit type;
    public boolean isfavourite=false;
    @Temporal(TemporalType.TIMESTAMP)
    private Date dateAdded;

    @OneToMany(mappedBy = "product")
    @ToString.Exclude
    @JsonIgnore

    private List<OrderItem> orderItems;



}

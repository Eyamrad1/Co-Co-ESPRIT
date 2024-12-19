package tn.esprit.coexist.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Chatroom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Integer chatRoomId;
    private String description;
    private String nom;
    private boolean status;
    @ManyToOne
    private User owner;
    @OneToMany(mappedBy = "chatroom" ,cascade = CascadeType.ALL)
    private List<Message>messages;
    @ManyToMany
    private List<User> users;



}

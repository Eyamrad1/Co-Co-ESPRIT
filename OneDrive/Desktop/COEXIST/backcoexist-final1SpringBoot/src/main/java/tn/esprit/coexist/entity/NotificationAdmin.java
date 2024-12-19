package tn.esprit.coexist.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.*;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NotificationAdmin {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private Date date=new Date();
    private String email;
    private String username;
    private String message;
    private String phone;
    private boolean notificationSent;
    private String title;
    @JsonIgnore
    @ManyToMany
    private List<User> users;
}

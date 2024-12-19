package tn.esprit.coexist.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import tn.esprit.coexist.entity.ColocationEntity.AnnoncementCollocation;
import tn.esprit.coexist.entity.ColocationEntity.CollocationBooking;


import java.util.Collection;
import java.util.List;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;
    private  String username;
    private  String password;
    private  String email;
    private  String phoneNumber;
    private  String Address;
    private String profilePicturePath;
    private boolean valid;
    private boolean blocked;
    private String token;

    @Enumerated(EnumType.STRING)
    private RoleName roleName;

    @JsonIgnore
    @OneToMany(mappedBy ="user" ,cascade = CascadeType.ALL)
    private List<Carpooling>carpoolingList;

    @JsonIgnore
    @OneToOne
    private Preference preference;

   /* @JsonIgnore
    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    private List<Product>products;
    */
   @OneToMany(mappedBy = "user")
   @ToString.Exclude
   @JsonIgnore
   public List<Orderr> orderrs;
    @JsonIgnore
    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    private List<Event>events;
//@OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
//List<EventBooking>eventBookings;

    @JsonIgnore
    @OneToMany(mappedBy = "user" , cascade = CascadeType.ALL)
    private List<Comment> comments;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL)
    private List<Subject>subjects;

    @JsonIgnore
    @OneToMany(mappedBy = "user" , cascade = CascadeType.ALL)
    private List<React>reactList;

    @JsonIgnore
    @ManyToMany
    private   List<Chatroom>chatrooms;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL)
    private   List<Message>messages;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL)
    private   List<CollocationBooking>collocationBookings;

    @JsonIgnore
    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    private List<AnnoncementCollocation>annoncementCollocations;

    public User(String username, String email, String encode, boolean b, String address, boolean b1, RoleName roleName) {
    }


    @JsonIgnore
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(roleName.name()));
    }
    @JsonIgnore
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }
    @JsonIgnore
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }
    @JsonIgnore
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
    @JsonIgnore
    @Override
    public boolean isEnabled() {
        return true;
    }
    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<LikedEvents> likedEvents;
    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                // Include other relevant fields here, but avoid cyclic references
                '}';
    }

}

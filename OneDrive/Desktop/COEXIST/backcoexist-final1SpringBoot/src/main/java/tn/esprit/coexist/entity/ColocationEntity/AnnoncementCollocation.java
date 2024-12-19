package tn.esprit.coexist.entity.ColocationEntity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import tn.esprit.coexist.entity.User;

import java.util.List;

@Entity
@Data
public class AnnoncementCollocation  {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer annoncementCollocationId;
  private Integer homeSize;
  private Integer numPerso;
  private String address;
  private float pricePerPerson;
  @Enumerated(EnumType.STRING)
  private HouseType houseType;
  @Enumerated(EnumType.STRING)
  private Etat etat;
  @Enumerated(EnumType.STRING)
  private EquipmentType equipmentType;
  @ManyToOne
  @JsonIgnore
  private User user;
  @OneToMany(mappedBy = "annoncementCollocation", cascade = CascadeType.ALL)
  @JsonIgnore
  private List<Favoris> favorisess;
  @OneToMany(mappedBy = "annoncementCollocation", cascade = CascadeType.ALL)
  private List<FileDB> images;
  private boolean archived = false;
  @JsonIgnore
  @ManyToMany
  @JoinTable(
          name = "collocation_booking_association",
          joinColumns = @JoinColumn(name = "annoncement_collocation_id"),
          inverseJoinColumns = @JoinColumn(name = "collocation_booking_id")
  )
  private List<CollocationBooking> bookings;
  public void archive() {
    this.archived = true;
  }



  public void unarchive() {
    this.archived = false;
  }

  public boolean isArchived() {
    return archived;
  }

  public void setArchived(boolean archived) {
    this.archived = archived;
  }

}

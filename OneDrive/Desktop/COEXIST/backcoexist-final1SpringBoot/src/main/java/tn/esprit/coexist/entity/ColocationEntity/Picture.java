package tn.esprit.coexist.entity.ColocationEntity;

import jakarta.persistence.*;
import lombok.Data;
import tn.esprit.coexist.entity.ColocationEntity.AnnoncementCollocation;

@Entity
@Data
public class Picture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Integer pictureId;
    private  String url;
    @ManyToOne
    private AnnoncementCollocation annoncementCollocation;
}

package tn.esprit.coexist.entity.ColocationEntity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;
@Entity
@Table(name = "files")
public class FileDB  {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;
    private String name;
    private String type;
    @ManyToOne
    @JoinColumn(name = "annoncement_collocation_id")
    @JsonIgnore
    private AnnoncementCollocation annoncementCollocation;
    @Lob
    @Column(name = "data", columnDefinition="LONGBLOB")
    private byte[] data;

    public AnnoncementCollocation getAnnoncementCollocation() {
        return annoncementCollocation;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }


    public void setAnnoncementCollocation(AnnoncementCollocation annoncementCollocation) {
        this.annoncementCollocation = annoncementCollocation;
    }

    public FileDB(String name, String type, byte[] data) {
        this.name = name;
        this.type = type;
        this.data = data;
    }

    public FileDB() {
    }



}

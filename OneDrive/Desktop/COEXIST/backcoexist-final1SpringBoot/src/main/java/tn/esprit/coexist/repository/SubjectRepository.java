package tn.esprit.coexist.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tn.esprit.coexist.entity.Booking;
import tn.esprit.coexist.entity.Subject;
import tn.esprit.coexist.entity.User;

import java.util.List;

@Repository
public interface SubjectRepository extends JpaRepository<Subject,Integer> {

    @Query("SELECT s FROM Subject s LEFT JOIN s.comments c LEFT JOIN s.reacts r WHERE s.Ban = false GROUP BY s ORDER BY COUNT(c) + COUNT(r) DESC")
    List<Subject> findTop3OrderByCommentAndReact();

    @Query("SELECT s FROM Subject s WHERE s.Ban = false")
    List<Subject> findalll();

    @Query("SELECT s FROM Subject s WHERE s.Ban = true And s.user=?1")
    List<Subject> findallbanned(User u);

}

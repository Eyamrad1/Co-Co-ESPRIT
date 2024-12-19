
package tn.esprit.coexist.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tn.esprit.coexist.entity.Evaluation;
import tn.esprit.coexist.entity.EventPosition;

import java.util.List;
import java.util.Map;

@Repository
public interface EvaluationRepository extends JpaRepository<Evaluation,Integer> {
    @Query("SELECT e.eventPosition, COUNT(e) FROM Evaluation e GROUP BY e.eventPosition")
    List<Object[]> countByEventPosition();



}

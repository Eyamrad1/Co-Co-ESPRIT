package tn.esprit.coexist.repository.ColocationRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.coexist.entity.ColocationEntity.CollocationBooking;
import tn.esprit.coexist.entity.ColocationEntity.CollocationFeedback;

import java.util.List;

@Repository
public interface CollocationFeedbackRepository extends JpaRepository<CollocationFeedback,Integer> {

    List<CollocationFeedback>  findByCollocationBooking(CollocationBooking collocationBooking);
}

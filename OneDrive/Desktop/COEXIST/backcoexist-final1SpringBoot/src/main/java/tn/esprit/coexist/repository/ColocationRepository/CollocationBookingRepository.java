package tn.esprit.coexist.repository.ColocationRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.coexist.entity.ColocationEntity.AnnoncementCollocation;
import tn.esprit.coexist.entity.ColocationEntity.CollocationBooking;
import tn.esprit.coexist.entity.User;

import java.util.List;

@Repository
public interface CollocationBookingRepository extends JpaRepository<CollocationBooking,Integer> {
    List<CollocationBooking> findByAnnoncementCollocationAnnoncementCollocationId(Integer announcementId);
    List<CollocationBooking> findByUser(User user);
    List<CollocationBooking> findByAnnoncementCollocation( AnnoncementCollocation annoncementCollocation);

}

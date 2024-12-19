package tn.esprit.coexist.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.coexist.entity.EventBooking;

@Repository
public interface EventBookingRepository extends JpaRepository<EventBooking,Integer> {

    boolean existsByUserUserIdAndEventEventId(Integer userId, Integer eventId);

}
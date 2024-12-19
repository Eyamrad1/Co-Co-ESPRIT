package tn.esprit.coexist.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.coexist.entity.Booking;
@Repository
public interface BookingRepository extends JpaRepository<Booking,Integer> {


}

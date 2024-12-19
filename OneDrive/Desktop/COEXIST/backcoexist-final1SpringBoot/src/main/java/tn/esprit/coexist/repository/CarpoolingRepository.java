package tn.esprit.coexist.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tn.esprit.coexist.entity.Carpooling;
import tn.esprit.coexist.entity.CarpoolingType;
import tn.esprit.coexist.entity.Day;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface CarpoolingRepository  extends JpaRepository<Carpooling,Integer> {
    @Query("SELECT c FROM Carpooling c WHERE c.departureTime >= :departureTime")
    List<Carpooling> findByDepartureTime(LocalDateTime departureTime);
    List<Carpooling> findByLongitudeDepartureAndLatitudeDeparture(String longitudeDeparture, String latitudeDeparture);
    List<Carpooling> findByLongitudeDepartureAndLatitudeDepartureAndLatitudeDestinationAndLongitudeDestination(String longitudeDeparture, String latitudeDeparture, String latitudeDestination, String longitudeDestination);
    List<Carpooling> findByLongitudeDepartureAndLatitudeDepartureAndDepartureTime(String longitudeDeparture, String latitudeDeparture, LocalDateTime departureTime);
    List<Carpooling> findByLongitudeDeparture(String longitudeDeparture);
    List<Carpooling> findByLatitudeDestination(String latitudeDestination);
    List<Carpooling> findByLatitudeDeparture(String latitudeDeparture);
    List<Carpooling> findByLongitudeDestination(String longitudeDestination);
    List<Carpooling> findByAvailableSeats(Integer availableSeats);
    List<Carpooling> findByCostPerSeat(float costPerSeat);
    List<Carpooling> findByDay(Day day);
    List<Carpooling> findByTime(LocalTime time);
    List<Carpooling> findByCarpoolingType(CarpoolingType carpoolingType);
    List<Carpooling> findByRegistrationNumber(Long registrationNumber);
    @Query("SELECT c FROM Carpooling c WHERE c.departureTime = :departureTime AND c.longitudeDeparture = :longitudeDeparture AND c.latitudeDestination = :latitudeDestination AND c.latitudeDeparture = :latitudeDeparture AND c.longitudeDestination = :longitudeDestination AND c.availableSeats = :availableSeats AND c.costPerSeat = :costPerSeat AND c.day = :day AND c.time = :time AND c.carpoolingType = :carpoolingType AND c.registrationNumber = :registrationNumber")
    List<Carpooling> findCarpoolingByAttributes(LocalDateTime departureTime, String longitudeDeparture, String latitudeDestination, String latitudeDeparture, String longitudeDestination, Integer availableSeats, float costPerSeat, Day day, LocalTime time, CarpoolingType carpoolingType, Long registrationNumber);

    Carpooling findFirstByOrderByCarpoolingIDDesc();
}

package tn.esprit.coexist.service;

import tn.esprit.coexist.entity.Carpooling;
import tn.esprit.coexist.entity.CarpoolingType;
import tn.esprit.coexist.entity.Day;
import tn.esprit.coexist.entity.User;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;

public interface CarpoolingService {
    public Carpooling addCarpooling(Carpooling carpooling,Integer userId);
    public void delateCarpooling(Integer idCarpooling);
    public void updateCarpooling(Integer carpoolingId ,Carpooling carpooling);
    public Carpooling updateCarpooling(Carpooling carpooling);
    public List<Carpooling> getAllCarpooling();
    public Carpooling findCarpooling(Integer carpoolingId);
    public List<Carpooling> findByLongitudeDepartureAndLatitudeDeparture(String longitudeDeparture, String latitudeDeparture);
    public List<Carpooling> findByLongitudeDepartureAndLatitudeDepartureAndLatitudeDestinationAndLongitudeDestination(String longitudeDeparture, String latitudeDeparture, String latitudeDestination, String longitudeDestination);

    public List<Carpooling> findByLongitudeDepartureAndLatitudeDepartureAndDepartureTime(String longitudeDeparture, String latitudeDeparture, LocalDateTime departureTime) ;
    public List<Carpooling> findByDepartureTime(LocalDateTime departureTime);
    public List<Carpooling> findCarpoolingByAttributes(
            LocalDateTime departureTime,
            String longitudeDeparture,
            String latitudeDestination,
            String latitudeDeparture,
            String longitudeDestination,
            Integer availableSeats,
            float costPerSeat,
            Day day,
            LocalTime time,
            CarpoolingType carpoolingType,
            Long registrationNumber

    );
    public List<Carpooling>findByCarpoolingType(CarpoolingType carpoolingType);
    public List<Carpooling> findByDay(Day day);
    public void sendDelateCarpoolingEmail();
    public Carpooling compareLastPreferenceAndLastCarpooling();
}

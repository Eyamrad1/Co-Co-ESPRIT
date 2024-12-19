package tn.esprit.coexist.controller;

import lombok.AllArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;
import tn.esprit.coexist.entity.*;
import tn.esprit.coexist.service.BookingService;
import tn.esprit.coexist.service.CarpoolingService;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@CrossOrigin("http://localhost:4200")

public class CarpoolingController {
    CarpoolingService carpoolingService;
    BookingService bookingService;

    @PostMapping("/addCarpooling/{userId}")
    public Carpooling addCarpooling(@RequestBody Carpooling carpooling,@PathVariable Integer userId) {
        return carpoolingService.addCarpooling(carpooling,userId);

    }
    @DeleteMapping("/delateCarpooling/{carpoolingId}")
    public void delateCarpooling(@PathVariable Integer carpoolingId){
        carpoolingService.delateCarpooling(carpoolingId);

    }
    @PutMapping("/updateCarpooling/{carpoolingId}")
    public void updateCarpooling(@PathVariable Integer carpoolingId, @RequestBody Carpooling carpooling){
        carpoolingService.updateCarpooling(carpoolingId,carpooling);

    }
    @PutMapping("/updateCarpooling")
    public Carpooling updateCarpooling( @RequestBody Carpooling carpooling){
        return carpoolingService.updateCarpooling(carpooling);

    }

    @GetMapping("getAllCarpooling")
    public List<Carpooling> getAllCarpooling(){
        return carpoolingService.getAllCarpooling();
    }
    @GetMapping("/findCarpooling/{carpoolingId}")
    public Carpooling findCarpooling(@PathVariable Integer carpoolingId){
        return carpoolingService.findCarpooling(carpoolingId);
    }
    @GetMapping("/findByLongitudeDepartureAndLatitudeDeparture/{longitudeDeparture}/{latitudeDeparture}")
    public List<Carpooling> findByLongitudeDepartureAndLatitudeDeparture(@PathVariable String longitudeDeparture,@PathVariable String latitudeDeparture) {
        return carpoolingService.findByLongitudeDepartureAndLatitudeDeparture(longitudeDeparture,latitudeDeparture);
    }
    @GetMapping("/findByLongitudeDepartureAndLatitudeDepartureAndLatitudeDestinationAndLongitudeDestination/{longitudeDeparture}/{latitudeDeparture}/{latitudeDestination}/{longitudeDestination}")
    public List<Carpooling> findByLongitudeDepartureAndLatitudeDepartureAndLatitudeDestinationAndLongitudeDestination(@PathVariable String longitudeDeparture,@PathVariable String latitudeDeparture,@PathVariable String latitudeDestination,@PathVariable String longitudeDestination) {
        return carpoolingService.findByLongitudeDepartureAndLatitudeDepartureAndLatitudeDestinationAndLongitudeDestination(longitudeDeparture,latitudeDeparture,latitudeDestination,longitudeDestination);
    }
    @GetMapping("/findByLongitudeDepartureAndLatitudeDepartureAndDepartureTime/{longitudeDeparture}/{latitudeDeparture}/{departureTime}")
    public List<Carpooling> findByLongitudeDepartureAndLatitudeDepartureAndDepartureTime(@PathVariable String longitudeDeparture,@PathVariable String latitudeDeparture,@PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime departureTime) {
        return carpoolingService.findByLongitudeDepartureAndLatitudeDepartureAndDepartureTime(longitudeDeparture,latitudeDeparture,departureTime);
    }
    @GetMapping("/findByDepartureTime")
    public List<Carpooling> findByDepartureTime(@RequestParam("departureTime") LocalDateTime departureTime) {
        return carpoolingService.findByDepartureTime(departureTime);
    }
    @GetMapping("/carpooling")
    public List<Carpooling> findCarpoolingByAttributes(
            @RequestParam(required = false) LocalDateTime departureTime,
            @RequestParam(required = false) String longitudeDeparture,
            @RequestParam(required = false) String latitudeDestination,
            @RequestParam(required = false) String latitudeDeparture,
            @RequestParam(required = false) String longitudeDestination,
            @RequestParam(required = false) Integer availableSeats,
            @RequestParam(required = false) float costPerSeat,
            @RequestParam(required = false) Day day,
            @RequestParam(required = false) LocalTime time,
            @RequestParam(required = false) CarpoolingType carpoolingType,
            @RequestParam(required = false) Long registrationNumber
    ) {
        return carpoolingService.findCarpoolingByAttributes(
                departureTime,
                longitudeDeparture,
                latitudeDestination,
                latitudeDeparture,
                longitudeDestination,
                availableSeats,
                costPerSeat,
                day,
                time,
                carpoolingType,
                registrationNumber
        );
    }
    @GetMapping("/findByCarpoolingType/{carpoolingType}")
    List<Carpooling> findByCarpoolingType(@PathVariable CarpoolingType carpoolingType){
        return carpoolingService.findByCarpoolingType(carpoolingType);

    }
    @GetMapping("/findByDay/{day}")
    List<Carpooling> findByDay(@PathVariable Day day){
        return carpoolingService.findByDay(day);
    }

    @GetMapping("/compare")
    public Carpooling compareLastPreferenceAndLastCarpooling() {
        return carpoolingService.compareLastPreferenceAndLastCarpooling();
    }
}


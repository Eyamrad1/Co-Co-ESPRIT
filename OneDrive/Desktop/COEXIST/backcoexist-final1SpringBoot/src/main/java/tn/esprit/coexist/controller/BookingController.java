package tn.esprit.coexist.controller;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.coexist.entity.Booking;
import tn.esprit.coexist.entity.Carpooling;
import tn.esprit.coexist.service.BookingService;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@CrossOrigin("http://localhost:4200")
public class BookingController {
    BookingService bookingService;
    @PostMapping("/addBooking/{carpoolingID}/{userId}")

    public Booking addBooking(@RequestBody Booking booking,@PathVariable Integer carpoolingID,@PathVariable Integer userId){
        return bookingService.addBooking(booking,carpoolingID,userId);
    }
    @DeleteMapping ("deleteBooking/{bookingId}")
    public void deleteBooking(@PathVariable Integer bookingId){
        bookingService.deleteBooking(bookingId);

    }
    @GetMapping("/getALLBooking")
    public List<Booking> getALLBooking(){
       return bookingService.getALLBooking();
    }


    @GetMapping("carpooling/{bookingID}")
    public Carpooling getCarpoolingForBooking(@PathVariable Integer bookingID) {
      return  bookingService.getCarpoolingForBooking(bookingID);

    }
}



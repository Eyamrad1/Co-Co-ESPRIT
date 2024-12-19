package tn.esprit.coexist.controller.ColocationController;


import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.coexist.entity.ColocationEntity.CollocationBooking;
import tn.esprit.coexist.service.ColocationService.CollocationBooking.BookingCollocationServiceImp;

import java.util.List;


@RestController
@RequestMapping("AnnonceBooking")
@CrossOrigin("*")
@AllArgsConstructor
public class CollocationBookingController {
    @Autowired
    BookingCollocationServiceImp bookingCollocationServiceImp;
    @PostMapping("/add/{userId}")
    public ResponseEntity<CollocationBooking> addCollocationBooking(@RequestBody CollocationBooking collocationBooking, @PathVariable("userId") Integer userId) {
        CollocationBooking savedBooking = bookingCollocationServiceImp.add(collocationBooking, userId);
        return new ResponseEntity<>(savedBooking, HttpStatus.CREATED);
    }
    @GetMapping("/get_all_CollocationBookings")
    public List<CollocationBooking> findAll() {
        return bookingCollocationServiceImp.findAll();
    }

    @DeleteMapping("/deleteCollocationBooking/{id}")
    public void delete(@PathVariable("id") Integer CollocationBookingId) {
        bookingCollocationServiceImp.delete(CollocationBookingId);
    }

    @GetMapping("/announcement/{announcementId}")
    public ResponseEntity<List<CollocationBooking>> getBookingsByAnnouncementId(@PathVariable Integer announcementId) {
        List<CollocationBooking> bookings = bookingCollocationServiceImp.findBookingsByAnnouncementId(announcementId);
        return new ResponseEntity<>(bookings, HttpStatus.OK);
    }
     @GetMapping("/booking/{userId}")
    public ResponseEntity<List<CollocationBooking>> findBookingsByUserId(@PathVariable Integer userId) {
        List<CollocationBooking> bookings = bookingCollocationServiceImp.findBookingsByUserId(userId);
        return new ResponseEntity<>(bookings, HttpStatus.OK);
    }
    @GetMapping("/booking/{userId}/{announcementId}")
    public ResponseEntity<List<CollocationBooking>> findBookingsByUserId(@PathVariable Integer userId, @PathVariable Integer announcementId) {
        List<CollocationBooking> bookings = bookingCollocationServiceImp.findBookingsByAnnId(announcementId);
        return new ResponseEntity<>(bookings, HttpStatus.OK);
    }

}
package tn.esprit.coexist.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.coexist.entity.Booking;
import tn.esprit.coexist.entity.Carpooling;
import tn.esprit.coexist.entity.FeedBack;

import java.util.List;
import java.util.Optional;


public interface BookingService {
  public Booking addBooking(Booking booking, Integer carpoolingID,Integer userId);
  public void deleteBooking(Integer bookingId);
  public List<Booking> getALLBooking();
  public void sendDelateCarpoolingEmail(String email, Integer carpoolingID);
  public void sendDelateCarpoolingEmail();
  public Optional<Booking> getBookingById(Integer bookingID);
  public Carpooling getCarpoolingForBooking(Integer bookingID);

}

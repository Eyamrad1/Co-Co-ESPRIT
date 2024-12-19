package tn.esprit.coexist.service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import tn.esprit.coexist.entity.Booking;
import tn.esprit.coexist.entity.Carpooling;
import tn.esprit.coexist.entity.CarpoolingType;
import tn.esprit.coexist.entity.User;
import tn.esprit.coexist.repository.BookingRepository;
import tn.esprit.coexist.repository.CarpoolingRepository;
import tn.esprit.coexist.repository.UserRepository;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class BookingServiceImp implements BookingService{
    CarpoolingRepository carpoolingRepository;
    BookingRepository bookingRepository;
    UserRepository userRepository;

    @Override
    public Booking addBooking(Booking booking, Integer carpoolingID, Integer userId) {
        Carpooling carpooling = carpoolingRepository.findById(carpoolingID)
                .orElseThrow(() -> new IllegalArgumentException("Invalid carpooling ID"));
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));
        booking.setUser(user);

        // Check if the booking user is null
        if (booking.getUser() == null) {
            throw new IllegalArgumentException("Booking user is null");
        }



        // Decrease available seats
        int nb = booking.getNb();
        int updatedAvailableSeats = carpooling.getAvailableSeats() - nb;
        if (updatedAvailableSeats < 0) {
            throw new IllegalStateException("No available seats for this carpooling");
        }
        carpooling.setAvailableSeats(updatedAvailableSeats);
        carpoolingRepository.save(carpooling);
        bookingRepository.save(booking);
        if (carpooling.getCarpoolingType().equals(CarpoolingType.SPECIFIC)) {
            // Construct feedback URL
            String url = "http://localhost:4200/addFeedback?userId=" + booking.getUser().getUserId() + "&bookingId=" + booking.getBookingID();

            // Construct email message
            SimpleMailMessage message = new SimpleMailMessage();
            String newline = System.getProperty("line.separator");
            message.setFrom("abdessalemlasswed58@gmail.com");
            message.setTo(booking.getUser().getEmail());
            message.setSubject("Share your feedback with us!");
            message.setText("Give your opinion about the ride" + newline + url);

            // Send email
            javaMailSender.send(message);
        }
        // Assign the carpooling to the booking
        booking.setCarpooling(carpooling);
        return bookingRepository.save(booking);

    }



    @Override
    public void deleteBooking(Integer bookingId) {
        SimpleMailMessage message = new SimpleMailMessage();
        String Newligne = System.getProperty("line.separator");
        Booking booking=bookingRepository.findById(bookingId).get();
        message.setFrom("abdessalemlasswed58@gmail.com");
        message.setTo(booking.getUser().getEmail());
        message.setSubject("Your carpooling is delated!");
        message.setText("We regret to inform you that your carpooling request has been deleted due to [reason for deletion]. We understand the inconvenience this may cause and sincerely apologize for any disruption to your plans.\n" +
                "\n" +
                "Please rest assured that we are committed to providing you with the best service possible and will do our utmost to assist you in finding alternative options for your transportation needs. If you have any questions or require further assistance, please do not hesitate to reach out to our customer support team at [contact information].\n" +
                "\n" +
                "Thank you for your understanding.\n" +
                "\n" +
                "Best regards," + Newligne );
        javaMailSender.send(message);
        bookingRepository.deleteById(bookingId);}


    @Override
    public List<Booking> getALLBooking() {
        return bookingRepository.findAll();
    }

    @Override
    public void sendDelateCarpoolingEmail(String email, Integer carpoolingID) {

    }

    @Autowired
    private JavaMailSender javaMailSender;
    @Override
    public void sendDelateCarpoolingEmail() {
        SimpleMailMessage message = new SimpleMailMessage();
        String Newligne = System.getProperty("line.separator");
        String url = "http://localhost:4200/addFeedback";
        message.setFrom("abdessalemlasswed58@gmail.com");
        message.setTo("ayadi.jas");
        message.setSubject("share your feedback with us!");
        message.setText("give your opinion about the ride" + Newligne +url);
        javaMailSender.send(message);
    }
    @Override
    public Optional<Booking> getBookingById(Integer bookingID) {
        return bookingRepository.findById(bookingID);
    }
    @Override
    public Carpooling getCarpoolingForBooking(Integer bookingID) {
        Booking booking = bookingRepository.findById(bookingID).orElse(null);
        if (booking != null) {
            return booking.getCarpooling();
        } else {
            return null;
        }
    }
}

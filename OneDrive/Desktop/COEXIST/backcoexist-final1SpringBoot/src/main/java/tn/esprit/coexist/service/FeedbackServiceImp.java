package tn.esprit.coexist.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.coexist.entity.Booking;
import tn.esprit.coexist.entity.FeedBack;
import tn.esprit.coexist.entity.User;
import tn.esprit.coexist.repository.BookingRepository;
import tn.esprit.coexist.repository.FeedBackRepository;
import tn.esprit.coexist.repository.UserRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class FeedbackServiceImp implements FeedbackService{
    UserRepository userRepository;
    FeedBackRepository feedBackRepository;
    BookingRepository bookingRepository;
    @Override
    public FeedBack addFeedback(FeedBack feedBack,Integer userId,Integer bookingId) {
        Booking booking=bookingRepository.findById(bookingId).get();
        User user = userRepository.findById(userId).get();
        feedBack.setBooking(booking);
        feedBack.setUser(user);
       // User user2=userRepository.save(feedBack.getBooking().getCarpooling().getUser());
        return feedBackRepository.save(feedBack);


    }


    @Override
    public void updateFeedback(Integer feedBackId, FeedBack feedBack) {
        feedBack.setFeedBackId(feedBackId);
        feedBackRepository.save(feedBack);
    }

    @Override
    public List<FeedBack> getAllFedback() {
        return feedBackRepository.findAll();
    }

    @Override
    public boolean hasUserProvidedFeedback(Integer userId) {
        // Implement logic to check if feedback exists for the user
        return feedBackRepository.existsByUserUserId(userId);
    }

    @Override
    public void delateFeedback(Integer feedBackId) {
       feedBackRepository.deleteById(feedBackId);
    }



}

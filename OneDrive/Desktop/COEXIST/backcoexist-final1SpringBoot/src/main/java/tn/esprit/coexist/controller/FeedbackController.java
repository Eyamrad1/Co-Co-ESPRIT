package tn.esprit.coexist.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.esprit.coexist.entity.FeedBack;
import tn.esprit.coexist.service.FeedbackService;

import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin("http://localhost:4200")
public class FeedbackController {
    FeedbackService feedbackService;
    @PostMapping("/addFeedback/{userId}/{bookingId}")
    public FeedBack addFeedback(@RequestBody FeedBack feedBack,@PathVariable Integer userId,@PathVariable Integer bookingId){
        return feedbackService.addFeedback(feedBack,userId,bookingId);

    }
    @PutMapping("/updateFeedback/{feedBackId}")
    public void updateFeedback(@PathVariable Integer feedBackId,@RequestBody FeedBack feedBack){
        feedbackService.updateFeedback(feedBackId,feedBack);
    }
    @GetMapping("/getAllFeedback") // Corrected endpoint mapping

    public List<FeedBack> getAllFedback(){
        return feedbackService.getAllFedback();
    }
    @GetMapping("/checkFeedbackStatus/{userId}")
    public boolean checkFeedbackStatus(@PathVariable Integer userId) {
        return feedbackService.hasUserProvidedFeedback(userId);
    }

@DeleteMapping("/delateFeedback/{feedBackId}")
    public void delateFeedback(@PathVariable Integer feedBackId){
        feedbackService.delateFeedback(feedBackId);

}
}

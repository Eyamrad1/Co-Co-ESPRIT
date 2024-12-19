package tn.esprit.coexist.controller.ColocationController;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.coexist.entity.ColocationEntity.CollocationFeedback;
import tn.esprit.coexist.entity.FeedBack;
import tn.esprit.coexist.service.ColocationService.CollocationFeedback.CollocationFeedbackService;
import tn.esprit.coexist.service.ColocationService.CollocationFeedback.CollocationFeedbackServiceImp;

import java.util.List;

@RestController
@RequestMapping("AnnonceFeedBack")
@AllArgsConstructor
public class CollocationFeedBackController {
    @Autowired
    private CollocationFeedbackService collocationService;
    private CollocationFeedbackServiceImp collocationServiceimp;

    @PostMapping("/collocations/{collocationId}/feedback")
    public ResponseEntity<String> addFeedbackToCollocation(
            @PathVariable Integer collocationId,
            @RequestBody CollocationFeedback feedback) {
        collocationService.addFeedbackToCollocation(collocationId, feedback);
        return ResponseEntity.ok("Feedback added successfully.");
    }
    @DeleteMapping("/deleteFeedbackCollocation/{FeedbackCollocationId}")
    public void delete(@PathVariable("FeedbackCollocationId") Integer FeedbackCollocationId) {
        collocationServiceimp.delete(FeedbackCollocationId);
    }

    @GetMapping("/feedback/{collocationBookingId}")
    public List<CollocationFeedback> findByCollocationBookingId(@PathVariable("collocationBookingId") Integer collocationBookingId) {
        return  collocationServiceimp.findByCollocationBookingId(collocationBookingId);
    }
}

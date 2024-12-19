package tn.esprit.coexist.controller.EventController;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;
import tn.esprit.coexist.entity.Evaluation;
import tn.esprit.coexist.entity.EventPosition;
import tn.esprit.coexist.service.EventService.*;


import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@AllArgsConstructor
public class EvaluationController {
    @Autowired
    EvaluationService evaluationService;


    @PostMapping("/addEvaluationAndAssignToEvent/{eventId}")
    public Evaluation addEvaluationAndAssignToEvent(
            @RequestBody Evaluation evaluation,
            @PathVariable Integer eventId
    ) {
        return evaluationService.addEvaluationAndAssignToEvent(evaluation, eventId);
    }

    @DeleteMapping("/deleteEvaluationById/{IdEvaluation}")
    public void deleteEvaluationById(@PathVariable Integer IdEvaluation) {
        evaluationService.deleteEvaluationById(IdEvaluation);
    }

    @PutMapping("/updateEvaluation/{evaluationId}")
    public Evaluation updateEvaluation(
            @RequestBody Evaluation evaluation,
            @PathVariable Integer evaluationId
    ) {
        return evaluationService.updateEvaluation(evaluation, evaluationId);
    }
    @GetMapping("/StatEvaluation")
    public Map<EventPosition, Integer> getEvaluationStatistics() {
        return evaluationService.getEvaluationStatistics();
    }
    @GetMapping("/retrieveAllEvaluation")
    public List<Evaluation> retrieveAllEvaluation() {
        return evaluationService.retrieveAllEvaluation();
    }

    @Scheduled(fixedDelay = 3600000)
    public void sendFeedbackEmail() {
        // Define the recipient email address
        String recipientEmail = "aya.mrade@gmail.com";

        // Call the service method to send the feedback email to the specific recipient
        evaluationService.sendFeedbackEmail(recipientEmail);
    }

    // Endpoint to manually trigger sending the feedback email
    @GetMapping("/send-feedback-email")
    public ResponseEntity<String> sendFeedbackEmailEndpoint() {
        // Call the scheduled task method to send the feedback email
        sendFeedbackEmail();

        // Return a success response
        return ResponseEntity.ok("Feedback email will be sent to aya.mrade@gmail.com after one hour.");
    }
}
package tn.esprit.coexist.service.EventService;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import tn.esprit.coexist.entity.Evaluation;
import tn.esprit.coexist.entity.Event;
import tn.esprit.coexist.entity.EventPosition;
import tn.esprit.coexist.repository.EvaluationRepository;
import tn.esprit.coexist.repository.EventRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class EvaluationServiceImp implements EvaluationService{

    @Autowired
    EvaluationRepository evaluationRepository;

    @Autowired
    EventRepository eventRepository;
    @Autowired
    private JavaMailSender javaMailSender;



    @Override
    public Evaluation addEvaluationAndAssignToEvent(Evaluation evaluation, Integer eventId) {
        Event event = eventRepository.findById(eventId).orElse(null);
        evaluation.setEvent(event);
        return evaluationRepository.save(evaluation);
    }

    @Override
    public void deleteEvaluationById(Integer IdEvaluation) {
        evaluationRepository.deleteById(IdEvaluation);
    }

    @Override
    public Evaluation updateEvaluation(Evaluation evaluation, Integer IdEvaluation) {
        Evaluation existingEvaluation = evaluationRepository.findById(IdEvaluation).orElse(null);
        if (existingEvaluation != null) {
            existingEvaluation.setEventPosition(evaluation.getEventPosition());
            return evaluationRepository.save(existingEvaluation);
        }
        return null;
    }

    @Override
    public List<Evaluation> retrieveAllEvaluation() {
        List<Evaluation> ListEvaluation = evaluationRepository.findAll();
        return ListEvaluation;
    }

    @Override
    public Map<EventPosition, Integer> getEvaluationStatistics() {
        Map<EventPosition, Integer> statistics = new HashMap<>();
        List<Object[]> resultList = evaluationRepository.countByEventPosition();
        for (Object[] result : resultList) {
            EventPosition eventPosition = (EventPosition) result[0];
            if (eventPosition != null) {
                Long count = (Long) result[1];
                statistics.put(eventPosition, count.intValue());
            }
        }
        return statistics;
    }
    @Override
    //@Scheduled(cron = "0 0 9 * * *") // Execute every day at 9:00 AM

    @Scheduled(fixedDelay = 3600000)
    public void sendFeedbackEmail(String email) {
        String feedbackPageLink = "http://localhost:4200/add-evaluation/30"; // Link to your feedback page in the app
        String feedbackFormLink = "https://docs.google.com/forms/d/e/1FAIpQLSfxhN6o8ScTz05Uy_mXJ-ak-nOMFdI1Ns586u6ug2vgnZdu4g/viewform?usp=sf_link"; // Link to your feedback form

        String emailContent = "Hello,\n\n" +
                "Thank you for participating in our recent event! We greatly value your feedback.\n\n" +
                "Please take a moment to provide your feedback by visiting our app's feedback page: <a href=\"" + feedbackPageLink + "\">Feedback Page</a>.\n\n" +
                "Additionally, for more detailed feedback, we invite you to complete our feedback form by clicking on the following link: <a href=\"" + feedbackFormLink + "\">Feedback Form</a>.\n\n" +
                "Your input is incredibly valuable to us, and we appreciate your time and effort in helping us improve our events.\n\n" +
                "Best regards,\nCOEXIST TEAM";

        // Create MimeMessage and set content
        MimeMessage message = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(email);
            helper.setSubject("Feedback for Yesterday's Event");
            helper.setText(emailContent, true); // Set HTML content to true
            javaMailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }


}
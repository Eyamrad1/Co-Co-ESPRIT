package tn.esprit.coexist.service.EventService;

import tn.esprit.coexist.entity.Evaluation;
import tn.esprit.coexist.entity.EventPosition;

import java.util.List;
import java.util.Map;

public interface EvaluationService {

    public Evaluation addEvaluationAndAssignToEvent(Evaluation evaluation , Integer eventId);

    void deleteEvaluationById(Integer IdEvaluation);


    public Evaluation updateEvaluation(Evaluation evaluation , Integer eventId);

    public List<Evaluation> retrieveAllEvaluation();
    Map<EventPosition, Integer> getEvaluationStatistics();

    public void sendFeedbackEmail(String email);


}
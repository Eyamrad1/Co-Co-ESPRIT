package tn.esprit.coexist.service.ColocationService.CollocationFeedback;


import tn.esprit.coexist.entity.ColocationEntity.CollocationFeedback;
import tn.esprit.coexist.entity.FeedBack;

public interface CollocationFeedbackService {
    public void addFeedbackToCollocation(Integer collocationId, CollocationFeedback feedback);
}
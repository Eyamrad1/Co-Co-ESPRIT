package tn.esprit.coexist.service;

import tn.esprit.coexist.entity.FeedBack;

import java.util.List;

public interface FeedbackService {
    //
    public FeedBack addFeedback(FeedBack feedBack,Integer userId,Integer bookingId);
    public void updateFeedback(Integer feedBackId,FeedBack feedBack);
    public List<FeedBack> getAllFedback();
    boolean hasUserProvidedFeedback(Integer userId);
    public void delateFeedback(Integer feedBackId);
}

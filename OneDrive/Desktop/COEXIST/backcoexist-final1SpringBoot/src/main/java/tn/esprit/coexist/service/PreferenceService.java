package tn.esprit.coexist.service;

import tn.esprit.coexist.entity.Carpooling;
import tn.esprit.coexist.entity.Preference;

import java.util.List;

public interface PreferenceService {
    public Preference addPreference(Preference preference);
    public void delatePreference(Integer preferenceID);
    public void updatePreference(Integer preferenceID,Preference preference);
    public List<Preference> getAllPreference();
}

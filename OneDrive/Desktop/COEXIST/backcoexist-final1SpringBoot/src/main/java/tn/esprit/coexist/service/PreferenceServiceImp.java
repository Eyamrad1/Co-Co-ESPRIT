package tn.esprit.coexist.service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Service;
import tn.esprit.coexist.entity.Carpooling;
import tn.esprit.coexist.entity.CarpoolingType;
import tn.esprit.coexist.entity.Preference;
import tn.esprit.coexist.repository.PreferenceRepository;

import java.util.List;

@Aspect
@Slf4j
@Service
@AllArgsConstructor
public class PreferenceServiceImp implements PreferenceService{
    PreferenceRepository preferenceRepository;

    @Override
    public Preference addPreference(Preference preference) {

        return preferenceRepository.save(preference);
    }

    @Override
    public void delatePreference(Integer preferenceID) {

        preferenceRepository.deleteById(preferenceID);
    }

    @Override
    public void updatePreference(Integer preferenceID, Preference preference) {
        preference.setPreferenceID(preferenceID);
        preferenceRepository.save(preference);
    }

    @Override
    public List<Preference> getAllPreference() {
        return preferenceRepository.findAll();
    }
    // public List<Carpooling> getAllCarpooling() {
    //    return carpoolingRepository.findAll();
  //  }


}

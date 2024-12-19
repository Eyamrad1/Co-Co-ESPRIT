package tn.esprit.coexist.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.esprit.coexist.entity.Preference;
import tn.esprit.coexist.service.PreferenceService;

import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin("http://localhost:4200")
public class PreferenceController {
    PreferenceService preferenceService;
    @PostMapping("/addPreference")
    public Preference addPreference(@RequestBody Preference preference){
      return   preferenceService.addPreference(preference);

    }
    @DeleteMapping("/delatePreference/{preferenceId}")
    public void delatePreference(@PathVariable Integer preferenceID){
       preferenceService.delatePreference(preferenceID);

    }
    @PutMapping("/updatePreference/{preferenceId}")
    public void updatePreference(@PathVariable Integer preferenceID,@RequestBody Preference preference){
        preferenceService.updatePreference(preferenceID,preference);

    }
    @GetMapping("/getAllPreference")
    public List<Preference> getAllPreference(){
        return preferenceService.getAllPreference();
    }
}

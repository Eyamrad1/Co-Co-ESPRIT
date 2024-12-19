package tn.esprit.coexist.controller;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.coexist.entity.React;
import tn.esprit.coexist.service.React.ReactService;


import java.util.List;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@AllArgsConstructor
public class ReactController {
    @Autowired
    ReactService reactService;
    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/addReact/{idSub}/{idUser}")
    public ResponseEntity<React> addReactToSubject(@RequestBody boolean react, @PathVariable("idSub") Integer idSub, @PathVariable("idUser") Integer idUser) {
        try {
            React addedReact = reactService.addReactToSubject(react, idSub,idUser);
            return new ResponseEntity<>(addedReact, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/getReactSubject/{subjectId}")
    public List<React> getReactSubject(@PathVariable Integer subjectId) {
        return reactService.getReactSubject(subjectId);
    }
}

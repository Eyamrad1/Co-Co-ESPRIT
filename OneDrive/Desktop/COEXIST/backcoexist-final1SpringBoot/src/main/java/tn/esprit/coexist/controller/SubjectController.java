package tn.esprit.coexist.controller;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.coexist.entity.Subject;
import tn.esprit.coexist.entity.User;
import tn.esprit.coexist.service.Subject.SubjectService;
import tn.esprit.coexist.service.Subject.SubjectServiceImp;

import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin("http://localhost:4200")
public class SubjectController {
    @Autowired
    SubjectServiceImp subjectService ;
    @CrossOrigin(origins = "http://localhost:4200")

    @PostMapping("/add-Subject")
    @ResponseBody
    public Subject addSubject(@RequestBody Subject b) {

        return subjectService.add(b);
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/get_all_Subjects")
    public List<Subject> findAll() {
        return subjectService.findAll();
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/topsubject")
    public List<Subject> topsubject() {
        return subjectService.getSubjectsOrderByCommentAndReact();
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/findAlladmin")
    public List<Subject> findAlladmin() {
        return subjectService.findAlladmin();
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/findallbanned/{id}")
    public List<Subject> findallbanned(@PathVariable("id") Integer id) {
        return subjectService.findallbanned(id);
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/updateSubject")
    public Subject update(@RequestBody Subject Subject ) {
        return subjectService.update(Subject);
    }
    @CrossOrigin(origins = "http://localhost:4200", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
    @DeleteMapping("/deleteSubject/{SubjectId}")
    public void delete(@PathVariable("SubjectId") Integer SubjectId) {
        subjectService.delete(SubjectId);
    }
    @CrossOrigin(origins = "http://localhost:4200", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
    @PutMapping("/nocommentSubject")
    public Subject nocomment(@RequestBody Subject Subject ) {
        return subjectService.nocomment(Subject);
    }
    @CrossOrigin(origins = "http://localhost:4200", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
    @PutMapping("/banSubject")
    public Subject ban(@RequestBody Subject Subject ) {
        return subjectService.ban(Subject);
    }
}

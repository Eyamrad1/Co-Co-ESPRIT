package tn.esprit.coexist.service.Subject;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.coexist.entity.Subject;
import tn.esprit.coexist.entity.User;
import tn.esprit.coexist.repository.SubjectRepository;
import tn.esprit.coexist.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class SubjectServiceImp implements SubjectService<Subject,Integer> {

    @Autowired
    SubjectRepository subjectRepository ;
    UserRepository userRepository;
    @Override
    public List<Subject> findAll() {
        return subjectRepository.findalll();
    }


    @Override
    public Subject retrieveItem(Integer idItem) {
        return subjectRepository.findById(idItem).get();
    }

    @Override
    public Subject add(Subject Subject) {
        Subject.setNoreactino(false);
        Subject.setBan(false);
        return subjectRepository.save(Subject);
    }

    @Override
    public void delete(Integer idRaect) {
        subjectRepository.deleteById(idRaect);

    }

    @Override
    public Subject update(Subject Subject) {
        Optional<Subject> existingSubjectOptional = subjectRepository.findById(Subject.getSubjectId());

        if (existingSubjectOptional.isPresent()) {
            Subject existingSubject = existingSubjectOptional.get();
            existingSubject.setSubjectTitle(Subject.getSubjectTitle());
            existingSubject.setContent(Subject.getContent());
            return subjectRepository.save(existingSubject);
        } else {
            return null;
        }}

    @Override
    public Subject nocomment(Subject Subject) {
        Optional<Subject> existingSubjectOptional = subjectRepository.findById(Subject.getSubjectId());
        if (existingSubjectOptional.isPresent()) {
            Subject existingSubject = existingSubjectOptional.get();
            existingSubject.setNoreactino(Subject.getNoreactino());
            return subjectRepository.save(existingSubject);
        } else {
            return null;
        }}


    @Override
    public Subject ban(Subject Subject) {
        Optional<Subject> existingSubjectOptional = subjectRepository.findById(Subject.getSubjectId());
        if (existingSubjectOptional.isPresent()) {
            Subject existingSubject = existingSubjectOptional.get();
            existingSubject.setBan(Subject.getBan());
            return subjectRepository.save(existingSubject);
        } else {
            return null;
        }}

    @Override
    public List<Subject> getSubjectsOrderByCommentAndReact() {
        List<Subject> subjects = subjectRepository.findTop3OrderByCommentAndReact();


        if (subjects.size() > 3) {
            return subjects.subList(0, 3);
        } else {
            return subjects;
        }
    }

    @Override
    public List<Subject> findallbanned(Integer id) {
        Optional<User> user = userRepository.findById(id);
        return subjectRepository.findallbanned(user.get());
    }

    @Override
    public List<Subject> findAlladmin() {
        return subjectRepository.findAll();
    }
}





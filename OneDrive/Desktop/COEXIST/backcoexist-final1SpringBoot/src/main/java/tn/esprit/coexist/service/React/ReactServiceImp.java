package tn.esprit.coexist.service.React;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.coexist.entity.React;
import tn.esprit.coexist.entity.Subject;
import tn.esprit.coexist.entity.User;
import tn.esprit.coexist.repository.ReactRepository;
import tn.esprit.coexist.repository.SubjectRepository;
import tn.esprit.coexist.repository.UserRepository;

import java.util.Date;
import java.util.List;


@Service
@AllArgsConstructor
public class ReactServiceImp implements ReactService {
    @Autowired
    ReactRepository reactRepository ;
    SubjectRepository subjectRepository ;
    UserRepository userRepository ;

    @Override
    public React addReactToSubject(boolean react, Integer idSub, Integer userId) {
        Subject subject = subjectRepository.findById(idSub)
                .orElseThrow(() -> new EntityNotFoundException("Subject not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        React existingReact = reactRepository.findByUserAndSubject(user, subject);

        if (existingReact != null) {
            existingReact.setLaked(react);
            existingReact.setTimestampp(new Date());
            return reactRepository.save(existingReact);
        } else {
            React newReact = new React();
            newReact.setUser(user);
            newReact.setSubject(subject);
            newReact.setLaked(react);
            newReact.setTimestampp(new Date());
            return reactRepository.save(newReact);
        }
    }

    @Override
    public List<React> getReactSubject(Integer subjectId) {
        return reactRepository.findBySubjectSubjectId(subjectId);
    }
}




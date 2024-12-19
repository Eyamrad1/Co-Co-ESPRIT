package tn.esprit.coexist.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.coexist.entity.React;
import tn.esprit.coexist.entity.Subject;
import tn.esprit.coexist.entity.User;

import java.util.List;

@Repository
public interface ReactRepository extends JpaRepository<React,Integer> {
    React findByUserAndSubject(User user, Subject subject);
    List<React> findBySubjectSubjectId(Integer subjectId);



}

package tn.esprit.coexist.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.coexist.entity.Comment;
import tn.esprit.coexist.entity.Subject;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment,Integer> {

    List<Comment> findBySubjectSubjectId(Integer subjectId);
}

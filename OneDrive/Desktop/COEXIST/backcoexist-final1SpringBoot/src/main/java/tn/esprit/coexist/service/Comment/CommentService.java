package tn.esprit.coexist.service.Comment;


import org.springframework.http.ResponseEntity;
import tn.esprit.coexist.entity.Comment;

import java.util.List;
import java.util.Optional;

public interface CommentService {
    ResponseEntity<Comment> addComment_to_Subject(Comment comment, Integer idSub, Integer idUser);
    public List<Comment> getCommentsBySubject(Integer subjectId);
    public ResponseEntity<Comment> updateComment_to_Subject(Comment existingComment, Comment newComment) ;
    public Optional<Comment> getCommentById(Integer commentId);
    List<Comment> findAll();

    Comment retrieveItem(Integer idItem);
    Comment add(Comment class1) ;

    void delete(Integer id);

    Comment update(Integer id,String Classe1);
}

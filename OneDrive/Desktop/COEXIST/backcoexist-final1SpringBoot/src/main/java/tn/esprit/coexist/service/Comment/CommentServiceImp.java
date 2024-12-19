package tn.esprit.coexist.service.Comment;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.core.MessageSendingOperations;
import org.springframework.stereotype.Service;
import tn.esprit.coexist.entity.Comment;
import tn.esprit.coexist.entity.Subject;
import tn.esprit.coexist.entity.User;
import tn.esprit.coexist.repository.CommentRepository;
import tn.esprit.coexist.repository.SubjectRepository;
import tn.esprit.coexist.repository.UserRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;


@Service
@AllArgsConstructor
public class CommentServiceImp implements CommentService {
    @Autowired
    CommentRepository commentRepository ;
    SubjectRepository subjectRepository ;
    UserRepository userRepository;
    private MessageSendingOperations<String> wsTemplate;
    @Override
    public List<Comment> findAll() {
        return commentRepository.findAll();
    }

    @Override
    public Comment retrieveItem(Integer idItem) {
        return commentRepository.findById(idItem).get();
    }

    @Override
    public Comment add(Comment comment) {
        return commentRepository.save(comment);
    }

    @Override
    public void delete(Integer idComment) {
        commentRepository.deleteById(idComment);

    }

    @Override
    public Comment update(Integer id ,String Commentaire) {
        Comment c=commentRepository.findById(id).get();
        c.setContent(Commentaire);
        c.setTimestamp(new Date());
        return commentRepository.save(c);
    }
    @Override
    //@MessageMapping("/addComment")
    public ResponseEntity<Comment> addComment_to_Subject(Comment comment, Integer idSub, Integer idUser) {
        Subject p = subjectRepository.findById(idSub).orElse(null);
        User u = userRepository.findById(idUser).orElse(null);

            comment.setUser(u);
            comment.setSubject(p);
        String username = u.getUsername();
        wsTemplate.convertAndSend("/topic/notification/" + p.getUser().getUserId(), username + " a ajouté un commentaire à votre publication");

        commentRepository.save(comment);
            System.out.println(wsTemplate.toString());
            return ResponseEntity.ok().body(comment);

    }
    @Override
    public List<Comment> getCommentsBySubject(Integer subjectId) {
        return commentRepository.findBySubjectSubjectId(subjectId);
    }
    @Override
    public ResponseEntity<Comment> updateComment_to_Subject(Comment existingComment, Comment newComment) {
        existingComment.setContent(newComment.getContent());
        existingComment.setTimestamp(newComment.getTimestamp());

        commentRepository.save(existingComment);
        return ResponseEntity.ok().body(existingComment);
    }

    @Override
    public Optional<Comment> getCommentById(Integer commentId) {
        return commentRepository.findById(commentId);
    }
}




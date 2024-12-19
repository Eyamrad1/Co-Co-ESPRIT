package tn.esprit.coexist.controller;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import tn.esprit.coexist.entity.Comment;
import tn.esprit.coexist.entity.Subject;
import tn.esprit.coexist.service.Comment.CommentService;
import tn.esprit.coexist.service.Comment.CommentServiceImp;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@CrossOrigin("http://localhost:4200")
public class CommentController {
    @Autowired
    CommentService commentService ;
    CommentServiceImp commentServiceImp ;
    @CrossOrigin(origins = "http://localhost:4200", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
    @PostMapping("/addComment/{idSub}/{idUser}")
    public ResponseEntity<?> addCommentToSubject(@RequestBody Comment comment,
                                              @PathVariable Integer idSub,
                                              @PathVariable Integer idUser) {
        try {
            return commentService.addComment_to_Subject(comment, idSub, idUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erreur lors de l'ajout du commentaire : " + e.getMessage());
        }
    }
    @CrossOrigin(origins = "http://localhost:4200", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})

    @GetMapping("/getCommentsBySubject/{subjectId}")
    public List<Comment> getCommentsBySubject(@PathVariable Integer subjectId) {
        return commentService.getCommentsBySubject(subjectId);
    }
    @CrossOrigin(origins = "http://localhost:4200", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})

    @PutMapping("/updateCommentToSubject/{commentId}")
    public Comment updateCommentToSubject(@RequestBody String newComment,
                                                    @PathVariable Integer commentId) {



            return commentService.update(commentId, newComment);

    }
    @CrossOrigin(origins = "http://localhost:4200", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})

    @DeleteMapping("/deleteComment/{CommentId}")
    public void delete(@PathVariable("CommentId") Integer CommentId) {
        commentServiceImp.delete(CommentId);
    }

}

package tn.esprit.coexist.service;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.coexist.dto.ChangePasswordRequest;
import tn.esprit.coexist.dto.RegisterRequest;
import tn.esprit.coexist.entity.User;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

public interface UserService {

    void deleteUser(Integer userId);
    List<User> getAllUser();
    User updateUser(User user);
    //public updatePassword(String username, ChangePasswordRequest updatePasswordDto);

    //String forgetPassword(String email);
    void bloqueUser(String email);
    void validInscription(Integer id) ;
    User Addimage(User user, MultipartFile imageFile);
    public Optional<User> getCurrentUser() ;
    public List<User> recherche(String keyword);
    public Integer getUserId(Authentication authentication);
}

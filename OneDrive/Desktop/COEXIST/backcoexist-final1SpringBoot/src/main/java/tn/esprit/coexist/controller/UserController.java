package tn.esprit.coexist.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.coexist.dto.ChangePasswordRequest;
import tn.esprit.coexist.entity.User;
import tn.esprit.coexist.repository.UserRepository;
import tn.esprit.coexist.service.UserService;
import tn.esprit.coexist.service.UserServiceImp;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
@CrossOrigin("http://localhost:4200")
public class UserController {

    private UserService userService;
    private UserServiceImp userServiceImp;
    private final UserRepository userRepository;

    @GetMapping("/getAllUser")
    @PreAuthorize("hasRole('ADMIN')")
    public List<User> getAllUsers(){
        return userService.getAllUser();
    }

    @PutMapping("/updateUser/{id}")
    public ResponseEntity<User>  updateUser(@PathVariable("id") Integer userId, @RequestBody User user){
        user.setUserId(userId);
        User updatedUser = userService.updateUser(user);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }

    @DeleteMapping("/deleteUser/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteUser(@PathVariable("id") Integer userId){
        userRepository.deleteById(userId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/bloque-user/{email}")
    @PreAuthorize("hasRole('ADMIN')")
    public void bloqueUser(@PathVariable("email") String email) {
        userService.bloqueUser(email);
    }

    @PutMapping("/validate-user/{idUser}")
    @PreAuthorize("hasRole('ADMIN')")
    public void validInscription(@PathVariable("idUser") Integer idUser) {
        userService.validInscription(idUser);
    }

    @PostMapping("forgetpassword/{email}")
    public ResponseEntity<?> userForgetPassword(@PathVariable("email") String email) {
        return userServiceImp.userforgetpassword(email);
    }

    @PutMapping("forgetpass/{username}")
    public ResponseEntity<?> forgetPassword(@PathVariable("username") String username, @RequestBody ChangePasswordRequest resetPass) {
        return userServiceImp.updatePassword(username, resetPass);
    }

    /*@PutMapping("/forget-password")
    public ResponseEntity<String> forgetPassword(@RequestParam String email ){
        return ResponseEntity.ok(userService.forgetPassword(email));
    }*/

    @PutMapping("forgetpassbyemail/{email}")
    public ResponseEntity<?> forgetPasswordbyemail(@PathVariable("email") String email, @RequestBody ChangePasswordRequest resetPass) {
        return userServiceImp.updatePasswordBymail(email, resetPass);
    }

    @PostMapping("/add-image")
    public ResponseEntity<User> addimage(@RequestParam("image") MultipartFile imageFile, @ModelAttribute User user) {
        try {
            User saved = userService.Addimage(user, imageFile);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("recherche/{keyword}")
    public List<User> recherche(@PathVariable("keyword") String keyword) {
        return userService.recherche (keyword);
    }


    @GetMapping("/api/user/id")
    public Integer getUserId(Authentication authentication) {
        if (authentication != null && authentication.getPrincipal() instanceof User) {
            User userDetails = (User) authentication.getPrincipal();
            // Assuming your UserDetails implementation has the user ID
            return userDetails.getUserId();
        } else {
            // Handle the case when authentication is null or does not contain UserDetails
            return null; // or throw an exception, depending on your requirement
        }
    }
    }


package tn.esprit.coexist.service;

import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.coexist.dto.ChangePasswordRequest;
import tn.esprit.coexist.dto.RegisterRequest;
import tn.esprit.coexist.entity.RoleName;
import tn.esprit.coexist.entity.User;
import tn.esprit.coexist.repository.UserRepository;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;



@Aspect
@Slf4j
@Service
@AllArgsConstructor
public class UserServiceImp implements UserService {
    public static final String uploadDirectory = "C:/xampp/htdocs/images/";

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    @Autowired
    private EmailSenderService emailUtil;

    @Autowired
    private OTPInterface otpInterface;
    @Override
    public void deleteUser(Integer userId){

        userRepository.deleteById(userId);
    }

    public List<User> getAllUser() {
        return userRepository.findAll();
    }
    public User updateUser(User user){
        User existingUser = userRepository.findById(user.getUserId()).get();
        existingUser.setUsername(user.getUsername());
        existingUser.setPhoneNumber(user.getPhoneNumber());
        existingUser.setEmail(user.getEmail());
        User updatedUser = userRepository.save(existingUser);
        return updatedUser;
    }

    public ResponseEntity<?> updatePassword(String username, ChangePasswordRequest updatePasswordDto) {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent()) {
            String storedHashedPassword = user.get().getPassword();
            if (passwordEncoder.matches(updatePasswordDto.getCurrentPassword(), storedHashedPassword)) {
                user.get().setPassword(passwordEncoder.encode(updatePasswordDto.getNewPassword()));
                userRepository.save(user.get());
                return new ResponseEntity<>(HttpStatus.OK);

            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
    }

   /* public String forgetPassword(String email){
        userRepository.findByEmail(email).orElseThrow(
                () -> new RuntimeException("user not found with this email" +email ));
        try {
            emailUtil.sendSetPassword(email);
        }catch (MessagingException e)
        {
            throw new RuntimeException("Unable to send set password ");
        }


        return "Please check your email to set new password to your account";
    }*/

    public void bloqueUser(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        User user1 = user.get();
        String Newligne = System.getProperty("line.separator");
        String url = "http://localhost:4200/auth/verification/" + user1.getToken();
        String body = "compte bloque\n  use this link to verify your account is :" + Newligne + url;
        if (user.isPresent()) {

            user1.setBlocked(true);
            user1.setValid(false);
            this.userRepository.save(user1);
            try {
                emailUtil.send(user1.getEmail(), "bloque  ", body);
            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
        }
    }

    public void validInscription(Integer id) {
        Optional<User> user = userRepository.findById(id);
        User user1 = user.get();
        String Newligne = System.getProperty("line.separator");
        String url = "http://localhost:4200/user/verification/" + user1.getToken();
        String body = "Votre compte est activé avec succes Soyez le bienvenue dans notre platforme COEXIST  \n  veuillez utuliser ce lien là pour s'authentifier :" + Newligne + url + Newligne + "verification" ;
        if (user.isPresent()) {

            user1.setValid(true);
            user1.setBlocked(false);
            this.userRepository.save(user1);
            try {
                emailUtil.send(user1.getEmail(), "Welcome " + user1.getUsername(), body);
            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
        }
    }


    public ResponseEntity<?> userforgetpassword(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            // String url = "http://localhost:4200/user/verifCaptch" ;
            String verificationCode = otpInterface.GenerateOTp().getIdentification();
            String newLine = "<br/>"; // HTML line break
            String htmlMessage = "<div style='border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;'>"
                    + "Une tentative de Reset du Password à été effectuer " + newLine
                    //+ "Veuillez utiliser ce lien pour vous authentifier : " + newLine
                    //  + "<a href='" + url + "'>" + url + "</a>" + newLine
                    + "<strong>Verification Code:</strong>" +
                    "<p>NB: cette code est valide pour 15 munites </p> " + verificationCode + newLine
                    + "</div>";
            try {
                emailUtil.send(user.get().getEmail(), "Did you Forget your password ?"+ user.get().getUsername() , htmlMessage);
                return new ResponseEntity<>( HttpStatus.OK);
            } catch (Exception e) {
                System.out.println(e.getMessage());
                return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public  ResponseEntity<?>  updatePasswordBymail(String email, ChangePasswordRequest updatePasswordDto) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            Boolean verif = otpInterface.VerifierOTP(updatePasswordDto.getCode());
            if (verif == false) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            else {
                user.get().setPassword(passwordEncoder.encode(updatePasswordDto.getNewPassword()));
                userRepository.save(user.get());
                return new ResponseEntity<>(HttpStatus.OK);
            }

        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
    }

    @Override
    public User Addimage(User user, MultipartFile imageFile) {
        try {
            Path directoryPath = Paths.get(uploadDirectory);
            if (!Files.exists(directoryPath)) {
                Files.createDirectories(directoryPath);
            }
            String originalFilename = imageFile.getOriginalFilename();
            String fileName = UUID.randomUUID().toString() + "_" + originalFilename;

            Path filePath = Paths.get(uploadDirectory, fileName);

            Files.write(filePath, imageFile.getBytes());

            user.setProfilePicturePath(fileName);

            return userRepository.save(user);
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to upload image");
        }
    }


    public Optional<User> getCurrentUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username;
        if (principal instanceof UserDetails) {
            username = ((UserDetails) principal).getUsername();
        } else {
            username = principal.toString();
        }
        return userRepository.findByUsername(username);
    }

    public User findUserById(Integer id) {
        return userRepository.findById(id).orElse(null);
    }
    @Override
    public List<User> recherche(String keyword) {
        if (keyword != null) {
            return userRepository.recherche(keyword);
        } else {
            return userRepository.findAll();
        }
    }



    public Integer getUserId(Authentication authentication) {
        if (authentication != null && authentication.getPrincipal() instanceof User) {
            User userDetails = (User) authentication.getPrincipal();
            return userDetails.getUserId();
        } else {
            // Handle the case when authentication is null or does not contain UserDetails
            return null; // or throw an exception, depending on your requirement
        }
    }

}

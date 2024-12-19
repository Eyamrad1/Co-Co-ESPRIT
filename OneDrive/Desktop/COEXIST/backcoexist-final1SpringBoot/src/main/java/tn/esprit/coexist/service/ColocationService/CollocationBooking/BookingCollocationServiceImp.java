package tn.esprit.coexist.service.ColocationService.CollocationBooking;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import tn.esprit.coexist.entity.ColocationEntity.AnnoncementCollocation;
import tn.esprit.coexist.entity.ColocationEntity.CollocationBooking;
import tn.esprit.coexist.entity.User;
import tn.esprit.coexist.repository.ColocationRepository.AnnoncementCollocationRepository;
import tn.esprit.coexist.repository.ColocationRepository.CollocationBookingRepository;
import tn.esprit.coexist.repository.UserRepository;
import tn.esprit.coexist.service.ICRUDService;
import java.util.List;

@Service
@AllArgsConstructor
public class BookingCollocationServiceImp implements ICRUDService<CollocationBooking,Integer>, tn.esprit.coexist.service.CollocationBooking.BookingCollocationService {
    @Autowired
    CollocationBookingRepository collocationBookingRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    AnnoncementCollocationRepository annoncementCollocationRepository;
    @Autowired
    public JavaMailSender emailSender;
    @Override
    public List<CollocationBooking> findAll()  {
        System.out.println( collocationBookingRepository.findAll());
        return collocationBookingRepository.findAll();
    }
    @Override
    public CollocationBooking retrieveItem(Integer idItem) {
        return collocationBookingRepository.findById(idItem).get();
    }
    @Override
    public CollocationBooking add(CollocationBooking class1) {
        return null;
    }
    public CollocationBooking add(CollocationBooking booking, Integer userId) {
        // Récupérer l'utilisateur qui a ajouté le booking
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        AnnoncementCollocation annoncementCollocation = annoncementCollocationRepository.findById( booking.getAnnoncementCollocation().getAnnoncementCollocationId())
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        booking.setUser(user);
        booking.setAnnoncementCollocation(annoncementCollocation);
        CollocationBooking savedBooking = collocationBookingRepository.save(booking);
        AnnoncementCollocation annonce = savedBooking.getAnnoncementCollocation();
        User annonceOwner = annonce.getUser();
        String ownerEmail = annonceOwner.getEmail();
        sendEmail(ownerEmail);
        return savedBooking;
    }
    @Override
    public void delete(Integer idBooking) {
        collocationBookingRepository.deleteById(idBooking);
    }
    @Override
    public CollocationBooking update(Integer integer, CollocationBooking Classe1) {
        return null;
    }

    public void sendEmail2(String email) {
        try {
            MimeMessage message = emailSender.createMimeMessage();
            boolean multipart = true;
            MimeMessageHelper helper = new MimeMessageHelper(message, multipart, "utf-8");

            String htmlMsg = "<html><body>" +
                    "<h1>Salut !</h1>" +
                    "<h2>Nous vous informons qu'une mise à jour a été apportée à votre réservation.</h2>" +
                    "<p>Merci d'utiliser Coexist ! Si vous avez des questions ou des besoins spécifiques, n'hésitez pas à nous contacter !</p>" +
                    "<h1>L'équipe COEXSIST</h1>" +
                    "<h3>[Remarque : Ce message est envoyé automatiquement. Veuillez ne pas répondre à cette adresse e-mail.]</h3>" +
                    "</body></html>";

            message.setContent(htmlMsg, "text/html");
            helper.setTo(email);
            helper.setSubject("Mise à jour de la réservation confirmée");
            this.emailSender.send(message);
        } catch (MessagingException e) {

            e.printStackTrace();
        }
    }
    public List<CollocationBooking> findBookingsByAnnouncementId(Integer announcementId) {
        return collocationBookingRepository.findByAnnoncementCollocationAnnoncementCollocationId(announcementId);
    }
    public List<CollocationBooking> findBookingsByUserId(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        return collocationBookingRepository.findByUser(user);
    }
    public List<CollocationBooking> findBookingsByAnnId(Integer announcementId) {
        /*User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));*/
        AnnoncementCollocation annoncementCollocation = annoncementCollocationRepository.findById(announcementId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + announcementId));
        return collocationBookingRepository.findByAnnoncementCollocation( annoncementCollocation);
    }
    public void sendEmail(String email) {
        try {
            MimeMessage message = emailSender.createMimeMessage();
            boolean multipart = true;
            MimeMessageHelper helper = new MimeMessageHelper(message, multipart, "utf-8");

            String htmlMsg = "<html><body>" +
                    " <h1>salut !<h1>"+
                            "<h2> Nous sommes heureux de vous informer que vous avez reçu " +
                            "une réservation pour votre annonce <br>  Merci d'utiliser Coexsist !" +
                            " Si vous avez des questions ou des besoins spécifiques," +
                            " n'hésitez pas à nous contacter !" +
                            "<h1>L'équipe COEXSIST  " +
                            "<h3>[Remarque : Ce message est envoyé automatiquement. Veuillez ne pas répondre à cette adresse e-mail.]<h3>" +
                             "</body></html>";
            message.setContent(htmlMsg, "text/html");
            helper.setTo(email);
            helper.setSubject("Réservation confirmée");
            this.emailSender.send(message);
        } catch (MessagingException e) {

            e.printStackTrace();

        }
    }
}

package tn.esprit.coexist.service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.math3.stat.inference.TTest;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.stereotype.Service;
import tn.esprit.coexist.entity.*;
import tn.esprit.coexist.repository.CarpoolingRepository;
import tn.esprit.coexist.repository.PreferenceRepository;
import tn.esprit.coexist.repository.UserRepository;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneOffset;
import java.util.*;

@Service
@AllArgsConstructor
@Aspect
@Slf4j
public class CarpoolingServiceImp implements CarpoolingService {
    CarpoolingRepository carpoolingRepository;
    PreferenceRepository preferenceRepository;
    UserRepository userRepository;
    @Override
    public Carpooling addCarpooling(Carpooling carpooling,Integer userId){

        Optional<User> optionalUser = userRepository.findById(userId);
        User user = optionalUser.orElseThrow(() -> new NoSuchElementException("User not found with ID: " + userId));

        carpooling.setUser(user);
        sendDelateCarpoolingEmail();
        if (carpooling.getCarpoolingType().equals(CarpoolingType.DAILY)) {
            carpooling.setDepartureTime(null);
            log.info("sssssssss");
        } else {
            carpooling.setDay(null);
            carpooling.setTime(null);
            log.info("aaaaaaaaa");
        }

        return carpoolingRepository.save(carpooling);
    }

    @Override
    public void delateCarpooling(Integer carpoolingId) {
        Carpooling carpooling = carpoolingRepository.findById(carpoolingId).get();
        carpoolingRepository.deleteById(carpoolingId);
        SimpleMailMessage message = new SimpleMailMessage();
        String Newligne = System.getProperty("line.separator");
        String url = "http://localhost:4200/addCarpooling";
        message.setFrom("abdessalemlasswed58@gmail.com");
        message.setTo("ayadi.jasser@esprit.tn");
        message.setSubject("carpooling delated!");
        message.setText("Hi,\n\n\n" +
                "Apologies for misunderstanding. If you meant to say \"deleted\" instead of \"delayed,\" you can announce it as follows:\n" +
                "\n" +
                "Subject: Carpooling Update: Cancellation\n" +
                "\n" +
                "Dear [Carpool Participants],\n" +
                "\n" +
                "I hope this message finds you well. Unfortunately, I must inform you that one of carpoolings " + "(carpoolingId:" + carpoolingId + "\n carpooling type" + carpooling.getCarpoolingType() + " )arrangement  has been canceled.\n"
                +
                " we are unable to proceed with the planned carpooling.\n" +
                "\n" +
                "Please make alternative arrangements for your transportation needs on that day.\n" +
                "\n" +
                "I apologize for any inconvenience this may cause and appreciate your understanding.\n" +
                "\n" +
                "Thank you for your cooperation.\n \nBest regards,\nThe [COEXIST] Team\");" + Newligne + url);
        javaMailSender.send(message);

    }

    @Override
    public void updateCarpooling(Integer carpoolingId, Carpooling carpooling) {
        carpooling.setCarpoolingID(carpoolingId);
        carpoolingRepository.save(carpooling);
    }

    @Override
    public Carpooling updateCarpooling(Carpooling carpooling) {
        if (carpooling.getCarpoolingType().equals(CarpoolingType.DAILY)) {
            carpooling.setDepartureTime(null);
            log.info("sssssssss");
        } else {
            carpooling.setDay(null);
            carpooling.setTime(null);
            log.info("aaaaaaaaa");
        }
        return carpoolingRepository.save(carpooling);

    }

    @Override
    public List<Carpooling> getAllCarpooling() {
        return carpoolingRepository.findAll();
    }

    @Override
    public Carpooling findCarpooling(Integer carpoolingId) {
        return carpoolingRepository.findById(carpoolingId).get();
    }

    @Override
    public List<Carpooling> findByLongitudeDepartureAndLatitudeDeparture(String longitudeDeparture, String latitudeDeparture) {

        return carpoolingRepository.findByLongitudeDepartureAndLatitudeDeparture(longitudeDeparture, latitudeDeparture);

    }

    @Override
    public List<Carpooling> findByLongitudeDepartureAndLatitudeDepartureAndLatitudeDestinationAndLongitudeDestination(String longitudeDeparture, String latitudeDeparture, String latitudeDestination, String longitudeDestination) {
        List<Carpooling> result = carpoolingRepository.findByLongitudeDepartureAndLatitudeDeparture(longitudeDeparture, latitudeDeparture);
        log.info("Result: {}", result);
        return carpoolingRepository.findByLongitudeDepartureAndLatitudeDepartureAndLatitudeDestinationAndLongitudeDestination(longitudeDeparture, latitudeDeparture, latitudeDestination, longitudeDestination);

    }

    @Override
    public List<Carpooling> findByLongitudeDepartureAndLatitudeDepartureAndDepartureTime(String longitudeDeparture, String latitudeDeparture, LocalDateTime departureTime) {
        return carpoolingRepository.findByLongitudeDepartureAndLatitudeDepartureAndDepartureTime(longitudeDeparture, latitudeDeparture, departureTime);

    }

    @Override
    public List<Carpooling> findByDepartureTime(LocalDateTime departureTime) {
        return carpoolingRepository.findByDepartureTime(departureTime);

    }

    @Override
    public List<Carpooling> findCarpoolingByAttributes(
            LocalDateTime departureTime,
            String longitudeDeparture,
            String latitudeDestination,
            String latitudeDeparture,
            String longitudeDestination,
            Integer availableSeats,
            float costPerSeat,
            Day day,
            LocalTime time,
            CarpoolingType carpoolingType,
            Long registrationNumber
    ) {
        return carpoolingRepository.findCarpoolingByAttributes(
                departureTime,
                longitudeDeparture,
                latitudeDestination,
                latitudeDeparture,
                longitudeDestination,
                availableSeats,
                costPerSeat,
                day,
                time,
                carpoolingType,
                registrationNumber
        );
    }

    @Override
    public List<Carpooling> findByCarpoolingType(CarpoolingType carpoolingType) {

        return carpoolingRepository.findByCarpoolingType(carpoolingType);

    }

    @Override
    public List<Carpooling> findByDay(Day day) {
        return carpoolingRepository.findByDay(day);
    }

    @Autowired
    private JavaMailSender javaMailSender;

    @Override
    public void sendDelateCarpoolingEmail() {
        SimpleMailMessage message = new SimpleMailMessage();
        String Newligne = System.getProperty("line.separator");
        String url = "http://localhost:4200/addCarpooling";
        message.setFrom("abdessalemlasswed58@gmail.com");
        message.setTo("ayadi.jasser@esprit.tn");
        message.setSubject("carpooling delated!");
        message.setText("Hi,\n\n\n" +
                "Apologies for misunderstanding. If you meant to say \"deleted\" instead of \"delayed,\" you can announce it as follows:\n" +
                "\n" +
                "Subject: Carpooling Update: Cancellation\n" +
                "\n" +
                "Dear [Carpool Participants],\n" +
                "\n" +
                "I hope this message finds you well. Unfortunately, I must inform you that one of carpoolings arrangement  has been canceled.\n"
                +
                " we are unable to proceed with the planned carpooling.\n" +
                "\n" +
                "Please make alternative arrangements for your transportation needs on that day.\n" +
                "\n" +
                "I apologize for any inconvenience this may cause and appreciate your understanding.\n" +
                "\n" +
                "Thank you for your cooperation.\n \nBest regards,\nThe [COEXIST] Team\");" + Newligne + url);
        javaMailSender.send(message);
    }
    @Override
    public Carpooling compareLastPreferenceAndLastCarpooling() {
        // Retrieve the last preference
        Preference lastPreference = preferenceRepository.findFirstByOrderByPreferenceIDDesc();
        System.out.println("Last Preference: " + lastPreference);

        // Retrieve the last carpooling
        Carpooling lastCarpooling = carpoolingRepository.findFirstByOrderByCarpoolingIDDesc();
        System.out.println("Last Carpooling: " + lastCarpooling);
        log.info("Available seats in last preference: {}", lastPreference.getAvailableSeats());
        log.info("Available seats in last carpooling: {}", lastCarpooling.getAvailableSeats());

        // Check if both last preference and last carpooling are not null
        if (lastPreference != null && lastCarpooling != null) {
            StringBuilder matchLog = new StringBuilder();
            boolean matchFound = false;

            // Check each attribute individually
            if (Objects.equals(lastPreference.getCarpoolingType(), lastCarpooling.getCarpoolingType())) {
                matchLog.append("Carpooling type matches. ");
                matchFound = true;
            }
            if (lastPreference.getAvailableSeats() >= lastCarpooling.getAvailableSeats()) {
                matchLog.append("Available seats match. ");
                matchFound = true;
            }
            if (Objects.equals(lastPreference.getDay(), lastCarpooling.getDay())) {
                matchLog.append("Day matches. ");
                matchFound = true;
            }
            if (lastPreference.getCostPerSeat() >= lastCarpooling.getCostPerSeat()) {
                matchLog.append("Cost per seat matches. ");
                matchFound = true;
            }

            // Check if the time of the carpooling is within an hour before or after the preference time
            if (lastPreference.getTime() != null && lastCarpooling.getTime() != null) {
                long diff = Math.abs(Duration.between(lastPreference.getTime(), lastCarpooling.getTime()).toHours());
                if (diff <= 1) {
                    matchLog.append("Time matches (within an hour). ");
                    matchFound = true;
                }
            }

            // Check if the distance between the departure locations is less than 1 km
            if (lastPreference.getLatitudeDeparture() != null && lastCarpooling.getLatitudeDeparture() != null &&
                    lastPreference.getLongitudeDeparture() != null && lastCarpooling.getLongitudeDeparture() != null) {
                double distance = calculateDistance(lastPreference.getLatitudeDeparture(), lastPreference.getLongitudeDeparture(),
                        lastCarpooling.getLatitudeDeparture(), lastCarpooling.getLongitudeDeparture());
                if (distance <= 1) {
                    matchLog.append("Departure location matches (within 1 km). ");
                    matchFound = true;
                }
            }
            // Check if the distance between the destination locations is less than 1 km
            if (lastPreference.getLatitudeDestination() != null && lastCarpooling.getLatitudeDestination() != null &&
                    lastPreference.getLongitudeDestination() != null && lastCarpooling.getLongitudeDestination() != null) {
                double distance = calculateDistance(lastPreference.getLatitudeDestination(), lastPreference.getLongitudeDestination(),
                        lastCarpooling.getLatitudeDestination(), lastCarpooling.getLongitudeDestination());
                if (distance <= 1) {
                    matchLog.append("Destination location matches (within 1 km). ");
                    matchFound = true;
                }
            }


            if (matchFound) {
                log.info("Last carpooling matches at least one attribute of last preference. Matched attributes: " + matchLog.toString());
                return lastCarpooling;
            } else {
                log.info("Last preference does not match with last carpooling.");
            }
        } else {
            log.info("Could not find both last preference and last carpooling.");
        }

        // If no match is found or there are missing preferences or carpoolings, return null
        return null;
    }

    // Method to calculate distance between two points based on latitude and longitude
    // Method to calculate distance between two points based on latitude and longitude
    private double calculateDistance(String lat1Str, String lon1Str, String lat2Str, String lon2Str) {
        double lat1 = Double.parseDouble(lat1Str);
        double lon1 = Double.parseDouble(lon1Str);
        double lat2 = Double.parseDouble(lat2Str);
        double lon2 = Double.parseDouble(lon2Str);

        final int R = 6371; // Radius of the earth in km
        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // convert to km
    }






}
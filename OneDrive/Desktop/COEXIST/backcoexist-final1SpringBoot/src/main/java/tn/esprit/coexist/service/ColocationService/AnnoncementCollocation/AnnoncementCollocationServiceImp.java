package tn.esprit.coexist.service.ColocationService.AnnoncementCollocation;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.coexist.entity.ColocationEntity.*;
import tn.esprit.coexist.entity.User;
import tn.esprit.coexist.repository.ColocationRepository.*;
import tn.esprit.coexist.repository.UserRepository;
import tn.esprit.coexist.service.ICRUDService;
import tn.esprit.coexist.service.UserServiceImp;

import java.util.*;


@Service
@AllArgsConstructor
public class AnnoncementCollocationServiceImp implements ICRUDService<AnnoncementCollocation,Integer>, AnnoncementCollocationService {
    private static final Logger logger = LoggerFactory.getLogger(AnnoncementCollocationServiceImp.class);


    @Autowired
    AnnoncementCollocationRepository annoncementCollocationRepository ;
    @Autowired
    UserServiceImp userService;
    @Autowired
    CollocationBookingRepository collocationBookingRepository;
    @Autowired
    FileDBRepository fileDBRepository;
    @Autowired
    CollocationFeedbackRepository collocationFeedbackRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    FavorisRepository favorisRepository ;

    @Override
    public List<AnnoncementCollocation> findAll() {
        return annoncementCollocationRepository.findAll();
    }

    @Override
    public AnnoncementCollocation retrieveItem(Integer idItem) {
        return annoncementCollocationRepository.findById(idItem).get();
    }

    @Override
    public AnnoncementCollocation add(AnnoncementCollocation class1) {
        return null;
    }


    public AnnoncementCollocation add(AnnoncementCollocation annoncement, Integer userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        annoncement.setUser(user);
        return annoncementCollocationRepository.save(annoncement);
    }

    public List<Map<String, Object>> findAllWithFavorisByUserId(Integer userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            List<AnnoncementCollocation> annoncementCollocations = annoncementCollocationRepository.findAll();
            List<Map<String, Object>> annoncementCollocationsParser = new ArrayList<>();

            for (AnnoncementCollocation annoncementCollocation : annoncementCollocations) {
                boolean isFavori = false;

                // Check if the current AnnoncementCollocation has favoris for the given user
                for (Favoris favoris : annoncementCollocation.getFavorisess()) {
                    if (favoris.getUser().getUserId().equals(userId)) {
                        isFavori = true;
                        break;
                    }

                }
                Map<String, Object> collocationMap = new HashMap<>();
                List<CollocationBooking> bookings = collocationBookingRepository.findByAnnoncementCollocationAnnoncementCollocationId( annoncementCollocation.getAnnoncementCollocationId());
                List<CollocationFeedback> feedbackMap = new ArrayList<>();
                double totalRating = 0.0;
                int feedbackCount = 0;
                for (CollocationBooking booking : bookings) {
                     List<CollocationFeedback> feedbackList = collocationFeedbackRepository.findByCollocationBooking(booking);

                     if (feedbackList != null && !feedbackList.isEmpty()) {
                        feedbackMap.addAll( feedbackList);
                        for (CollocationFeedback feedback : feedbackList) {
                            totalRating += feedback.getRate();
                        }
                        feedbackCount += feedbackList.size();
                    }
                }
                double averageRating = 0.0;
                if (feedbackCount > 0) {
                    averageRating = totalRating / feedbackCount;
                }
                // Create a map representation of the AnnoncementCollocation
                collocationMap.put("annoncementCollocationId", annoncementCollocation.getAnnoncementCollocationId());
                collocationMap.put("homeSize", annoncementCollocation.getHomeSize());
                collocationMap.put("numPerso", annoncementCollocation.getNumPerso());
                collocationMap.put("address", annoncementCollocation.getAddress());
                collocationMap.put("pricePerPerson", annoncementCollocation.getPricePerPerson());
                collocationMap.put("houseType", annoncementCollocation.getHouseType());
                collocationMap.put("equipmentType", annoncementCollocation.getEquipmentType());
                collocationMap.put("userId", annoncementCollocation.getUser().getUserId());
                collocationMap.put("images", annoncementCollocation.getImages());
                collocationMap.put("averageRating", averageRating);
                collocationMap.put("etat", annoncementCollocation.getEtat());

                if (!feedbackMap.isEmpty()) {
                    collocationMap.put("feedbackMap", feedbackMap);
                }
                collocationMap.put("favori", isFavori);
                collocationMap.put("archive", annoncementCollocation.isArchived());

                // Add the map to the list
                annoncementCollocationsParser.add(collocationMap);
            }

            return annoncementCollocationsParser;
        }else {

            return  null;
        }
    }
    public List<Map<String, Object>> findAnnoncementByUserId(Integer userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            List<AnnoncementCollocation> annoncementCollocations = annoncementCollocationRepository.findAll();
            List<Map<String, Object>> annoncementCollocationsParser = new ArrayList<>();

            for (AnnoncementCollocation annoncementCollocation : annoncementCollocations) {
                if (annoncementCollocation.getUser().getUserId().equals(userId)){

                boolean isFavori = false;
                // Check if the current AnnoncementCollocation has favoris for the given user
                for (Favoris favoris : annoncementCollocation.getFavorisess()) {
                    if (favoris.getUser().getUserId().equals(userId)) {
                        isFavori = true;
                        break;
                    }
                }
                Map<String, Object> collocationMap = new HashMap<>();

                // Create a map representation of the AnnoncementCollocation
                collocationMap.put("annoncementCollocationId", annoncementCollocation.getAnnoncementCollocationId());
                collocationMap.put("homeSize", annoncementCollocation.getHomeSize());
                collocationMap.put("numPerso", annoncementCollocation.getNumPerso());
                collocationMap.put("address", annoncementCollocation.getAddress());
                collocationMap.put("pricePerPerson", annoncementCollocation.getPricePerPerson());
                collocationMap.put("houseType", annoncementCollocation.getHouseType());
                collocationMap.put("equipmentType", annoncementCollocation.getEquipmentType());
                collocationMap.put("userId", annoncementCollocation.getUser().getUserId());
                //collocationMap.put("favorisess", annoncementCollocation.getFavorisess());
                collocationMap.put("images", annoncementCollocation.getImages());
                collocationMap.put("favori", isFavori); // Add the favori flag
                collocationMap.put("archive", annoncementCollocation.isArchived()); // Add the favori flag
                collocationMap.put("etat", annoncementCollocation.getEtat()); // Add the favori flag

                // Add the map to the list
                annoncementCollocationsParser.add(collocationMap);
                }
            }

            return annoncementCollocationsParser;
        }else {

            return  null;
        }
    }
    public Boolean archiveAnnoncementCollocation(Integer annoncementCollocationId, Integer userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        AnnoncementCollocation annoncementCollocation = annoncementCollocationRepository.findById(annoncementCollocationId).orElse(null);
        if (annoncementCollocation != null && userOptional.isPresent()) {
            if (annoncementCollocation.getUser().getUserId().equals(userId)){
                annoncementCollocation.setArchived(true);
                annoncementCollocationRepository.save(annoncementCollocation);
                return true;
            } else {
                return false;

            }

        }
        return false;
        // Handle case where the annoncementCollocation is not found or the user is not the owner
    }

    public Boolean unarchiveAnnoncementCollocation(Integer annoncementCollocationId, Integer userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        AnnoncementCollocation annoncementCollocation = annoncementCollocationRepository.findById(annoncementCollocationId).orElse(null);
        if (annoncementCollocation != null && userOptional.isPresent()) {
            if (annoncementCollocation.getUser().getUserId().equals(userId)) {
                annoncementCollocation.unarchive();
                annoncementCollocationRepository.save(annoncementCollocation);
                return true;
            }else {
                return false;
            }
        }
        return false;
        // Handle case where the annoncementCollocation is not found or the user is not the owner
    }
    @Override
    public void delete(Integer idAnn) {
        annoncementCollocationRepository.deleteById(idAnn);

    }

    @Override
    public AnnoncementCollocation update(Integer id, AnnoncementCollocation Classe1) {
        logger.info("Updating AnnoncementCollocation with ID: {}", id);

        Optional<AnnoncementCollocation> existingSubjectOptional = annoncementCollocationRepository.findById(id);

        if (existingSubjectOptional.isPresent()) {
            AnnoncementCollocation existingSubject = existingSubjectOptional.get();
            logger.debug("Found existing AnnoncementCollocation: {}", existingSubject);

            String newAddress = Classe1.getAddress();
            existingSubject.setAddress(newAddress);
            logger.info("Address updated to: {}", Classe1.getEquipmentType());
            EquipmentType equipmentType = Classe1.getEquipmentType();
            existingSubject.setEquipmentType(equipmentType);
            logger.info("equipmentType updated to: {}", Classe1.getPricePerPerson());
            Float price = Classe1.getPricePerPerson();
            existingSubject.setPricePerPerson(price);
            logger.info("price updated to: {}", Classe1.getHomeSize());
            Integer homeSize = Classe1.getHomeSize();
            existingSubject.setHomeSize(homeSize);
            logger.info("homeSize updated to: {}", Classe1.getHouseType());
            HouseType houseType = Classe1.getHouseType();
            existingSubject.setHouseType(houseType);
            logger.info("etat updated to: {}", Classe1.getEtat());
            Etat etat = Classe1.getEtat();
            existingSubject.setEtat(etat);
            logger.info("houseType updated to: {}", newAddress);
            Integer numPerso = Classe1.getNumPerso();
            existingSubject.setNumPerso(numPerso);
            logger.info("numPerso updated to: {}", newAddress);
            List<FileDB> image = Classe1.getImages();
            if (image != null) {
                existingSubject.setImages(image);
            }
            logger.info("image updated to: {}", newAddress);


            AnnoncementCollocation updatedAnnoncement = annoncementCollocationRepository.save(existingSubject);
            logger.info("AnnoncementCollocation updated successfully: {}", updatedAnnoncement);

            return updatedAnnoncement;
        } else {
            logger.warn("AnnoncementCollocation with ID {} not found", id);
            return null;
        }
    }
    @Override
    public AnnoncementCollocation getAnnouncementById(Integer id) {
        Optional<AnnoncementCollocation> announcementOptional = annoncementCollocationRepository.findById(id);
        return announcementOptional.orElse(null);
    }
    public Map<String, Object> getAnnouncementById(Integer announcementId, Integer userId) {
        Optional<AnnoncementCollocation> announcementOptional = annoncementCollocationRepository.findById(announcementId);

        // Check if the announcement exists
        if (announcementOptional.isPresent()) {
            AnnoncementCollocation announcement = announcementOptional.get();

            // Check if the announcement belongs to the specified user

                // Create a map representation of the announcement
                Map<String, Object> announcementMap = new HashMap<>();
                List<CollocationBooking> bookings = collocationBookingRepository.findByAnnoncementCollocationAnnoncementCollocationId(announcementId);
                List<CollocationFeedback> feedbackMap = new ArrayList<>();
                double totalRating = 0.0;
                int feedbackCount = 0;
                for (CollocationBooking booking : bookings) {
                    List<CollocationFeedback> feedbackList = collocationFeedbackRepository.findByCollocationBooking(booking);

                    if (feedbackList != null && !feedbackList.isEmpty()) {
                        feedbackMap.addAll(feedbackList);
                        for (CollocationFeedback feedback : feedbackList) {
                            totalRating += feedback.getRate();
                        }
                        feedbackCount += feedbackList.size();
                    }
                }

                double averageRating = 0.0;
                if (feedbackCount > 0) {
                    averageRating = totalRating / feedbackCount;
                }

                // Check if the announcement is marked as a favorite by the user
                boolean isFavori = false;
                for (Favoris favoris : announcement.getFavorisess()) {
                    if (favoris.getUser().getUserId().equals(userId)) {
                        isFavori = true;
                        break;
                    }
                }

                // Populate the map with announcement details
                announcementMap.put("annoncementCollocationId", announcement.getAnnoncementCollocationId());
                announcementMap.put("homeSize", announcement.getHomeSize());
                announcementMap.put("numPerso", announcement.getNumPerso());
                announcementMap.put("address", announcement.getAddress());
                announcementMap.put("pricePerPerson", announcement.getPricePerPerson());
                announcementMap.put("houseType", announcement.getHouseType());
                announcementMap.put("equipmentType", announcement.getEquipmentType());
                announcementMap.put("userId", announcement.getUser().getUserId());
                announcementMap.put("etat", announcement.getEtat());
                announcementMap.put("images", announcement.getImages());
                announcementMap.put("averageRating", averageRating);
                announcementMap.put("etat", announcement.getEtat());

                if (!feedbackMap.isEmpty()) {
                    announcementMap.put("feedbackMap", feedbackMap);
                }
                announcementMap.put("favori", isFavori);
                announcementMap.put("archive", announcement.isArchived());

                return announcementMap;
            } else {
                // Handle case where the announcement does not belong to the specified user
                return null;
            }

    }
    public  List<Map<String, Object>> getArchivedAnnouncementsByUserId(int userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        List<AnnoncementCollocation> annoncementCollocations =  annoncementCollocationRepository.findAllByUserAndArchived(user, true);
        List<Map<String, Object>> annoncementCollocationsParser = new ArrayList<>();

        for (AnnoncementCollocation annoncementCollocation : annoncementCollocations) {
            if (annoncementCollocation.getUser().getUserId().equals(userId)){

                boolean isFavori = false;
                // Check if the current AnnoncementCollocation has favoris for the given user
                for (Favoris favoris : annoncementCollocation.getFavorisess()) {
                    if (favoris.getUser().getUserId().equals(userId)) {
                        isFavori = true;
                        break;
                    }
                }
                Map<String, Object> collocationMap = new HashMap<>();

                // Create a map representation of the AnnoncementCollocation
                collocationMap.put("annoncementCollocationId", annoncementCollocation.getAnnoncementCollocationId());
                collocationMap.put("homeSize", annoncementCollocation.getHomeSize());
                collocationMap.put("numPerso", annoncementCollocation.getNumPerso());
                collocationMap.put("address", annoncementCollocation.getAddress());
                collocationMap.put("pricePerPerson", annoncementCollocation.getPricePerPerson());
                collocationMap.put("houseType", annoncementCollocation.getHouseType());
                collocationMap.put("equipmentType", annoncementCollocation.getEquipmentType());
                collocationMap.put("userId", annoncementCollocation.getUser().getUserId());
                //collocationMap.put("favorisess", annoncementCollocation.getFavorisess());
                collocationMap.put("images", annoncementCollocation.getImages());
                collocationMap.put("favori", isFavori); // Add the favori flag
                collocationMap.put("archive", annoncementCollocation.isArchived());
                collocationMap.put("etat", annoncementCollocation.getEtat());

                // Add the map to the list
                annoncementCollocationsParser.add(collocationMap);
            }
        }

        return annoncementCollocationsParser;

    }
    public List<AnnoncementCollocation> findByHomeSizeGreaterThanOrEqual(Integer homeSize) {
        return annoncementCollocationRepository.findByHomeSizeGreaterThanEqual(homeSize);
    }

    public List<AnnoncementCollocation> findByNumPersoGreaterThanOrEqual(Integer numPerso) {
        return annoncementCollocationRepository.findByNumPersoGreaterThanEqual(numPerso);
    }

    public List<AnnoncementCollocation> findByAddressContaining(String address) {
        return annoncementCollocationRepository.findByAddressContaining(address);
    }

    public List<AnnoncementCollocation> findByPricePerPersonBetween(Float minPrice, Float maxPrice) {
        return annoncementCollocationRepository.findByPricePerPersonBetween(minPrice, maxPrice);
    }

    public List<AnnoncementCollocation> findByHouseType(tn.esprit.coexist.entity.HouseType houseType) {
        return annoncementCollocationRepository.findByHouseType(houseType);
    }

    public List<AnnoncementCollocation> findByEquipmentType(EquipmentType equipmentType) {
        return annoncementCollocationRepository.findByEquipmentType(equipmentType);
    }
    @Override
    public List<Map<String, Object>> filterAnnoncementCollocations(
            Integer homeSize, Integer numPerso, String address, Float minPrice, Float maxPrice,
            tn.esprit.coexist.entity.ColocationEntity.HouseType houseType, EquipmentType equipmentType, Integer userId) {
            Optional<User> userOptional = userRepository.findById(userId);
            if (userOptional.isPresent()) {
                List<AnnoncementCollocation> annoncementCollocations = annoncementCollocationRepository.findByFilters(homeSize, numPerso, address, minPrice, maxPrice,(tn.esprit.coexist.entity.ColocationEntity.HouseType ) houseType, equipmentType);
                List<Map<String, Object>> annoncementCollocationsParser = new ArrayList<>();

                for (AnnoncementCollocation annoncementCollocation : annoncementCollocations) {
                    boolean isFavori = false;

                    // Check if the current AnnoncementCollocation has favoris for the given user
                    for (Favoris favoris : annoncementCollocation.getFavorisess()) {
                        if (favoris.getUser().getUserId().equals(userId)) {
                            isFavori = true;
                            break;
                        }
                    }
                    Map<String, Object> collocationMap = new HashMap<>();

                    // Create a map representation of the AnnoncementCollocation
                    collocationMap.put("annoncementCollocationId", annoncementCollocation.getAnnoncementCollocationId());
                    collocationMap.put("homeSize", annoncementCollocation.getHomeSize());
                    collocationMap.put("numPerso", annoncementCollocation.getNumPerso());
                    collocationMap.put("address", annoncementCollocation.getAddress());
                    collocationMap.put("pricePerPerson", annoncementCollocation.getPricePerPerson());
                    collocationMap.put("houseType", annoncementCollocation.getHouseType());
                    collocationMap.put("equipmentType", annoncementCollocation.getEquipmentType());
                    collocationMap.put("userId", annoncementCollocation.getUser().getUserId());
                    //collocationMap.put("favorisess", annoncementCollocation.getFavorisess());
                    collocationMap.put("image", annoncementCollocation.getImages());
                    collocationMap.put("favori", isFavori); // Add the favori flag
                    collocationMap.put("archive", annoncementCollocation.isArchived());
                    collocationMap.put("etat", annoncementCollocation.getEtat());

                    // Add the map to the list
                    annoncementCollocationsParser.add(collocationMap);
                }

                return annoncementCollocationsParser;
            }else {

                return  null;
            }

    }

    public void deleteOldPhoto(Integer announcementId, String oldPhotoId) {
        // Retrieve the announcement from the repository based on its ID
        Optional<AnnoncementCollocation> optionalAnnouncement = annoncementCollocationRepository.findById(announcementId);

        // Check if the announcement exists
        if (optionalAnnouncement.isPresent()) {
            AnnoncementCollocation announcement = optionalAnnouncement.get();

            // Remove the old photo from the images collection
            List<FileDB> images = announcement.getImages();
            images.removeIf(image -> image.getId().equals(oldPhotoId));
            announcement.setImages(images);

            // Save the updated announcement
            annoncementCollocationRepository.save(announcement);
        } else {
            // Handle error: Announcement not found
            throw new NoSuchElementException("Announcement not found");
        }
    }
}




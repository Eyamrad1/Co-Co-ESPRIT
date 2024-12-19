package tn.esprit.coexist.controller.ColocationController;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.coexist.entity.ColocationEntity.AnnoncementCollocation;
import tn.esprit.coexist.entity.ColocationEntity.EquipmentType;
import tn.esprit.coexist.entity.ColocationEntity.Etat;
import tn.esprit.coexist.entity.ColocationEntity.FileDB;
import tn.esprit.coexist.entity.HouseType;
import tn.esprit.coexist.repository.ColocationRepository.FileDBRepository;
import tn.esprit.coexist.service.ColocationService.AnnoncementCollocation.AnnoncementCollocationServiceImp;
import tn.esprit.coexist.service.ColocationService.AnnoncementCollocation.FileStorageService;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("Announce")
@AllArgsConstructor
@CrossOrigin("*")
public class AnnoncementCollocationController {
    @Autowired
    FileDBRepository fileDBRepository;

    @Autowired
    FileStorageService fileStorageService;

    @Autowired
    AnnoncementCollocationServiceImp annoncementCollocationServiceImp ;
    /*@PostMapping("/add-AnnoncementCollocation")
    @ResponseBody
    public AnnoncementCollocation addAnnoncementCollocation(@RequestBody AnnoncementCollocation b) {

        return annoncementCollocationServiceImp.add(b);
    }*/
    //////////////////////
    @PostMapping("/add-AnnoncementCollocation/{userId}")
    @ResponseBody
    public AnnoncementCollocation addAnnoncementCollocation(@PathVariable Integer userId,
                                                            @RequestPart(value = "annoncement") String annoncement,
                                                            @RequestPart(value = "images", required = false) List<MultipartFile> files) throws IOException {
        AnnoncementCollocation annc = new ObjectMapper().readValue(annoncement, AnnoncementCollocation.class);
        annc.setEtat(Etat.AVAILABLE);
        List<FileDB> images = new ArrayList<>();
        annoncementCollocationServiceImp.add(annc, userId);
        if (files != null) {
            for (MultipartFile file : files) {
                FileDB image = fileStorageService.store(file, annc);
                // Set the AnnoncementCollocation reference in each FileDB entity
                 images.add(image);
            }
        }

        annc.setImages(images);

        return annoncementCollocationServiceImp.update(annc.getAnnoncementCollocationId(), annc);
    }
    @PostMapping("/{id}/{userId}/archive")
    @ResponseBody
    public ResponseEntity<String> archiveAnnoncement_Collocation(@PathVariable("id") Integer annoncementCollocationId,
                                                            @PathVariable("userId") Integer userId  )   {
        try {
            Boolean res = annoncementCollocationServiceImp.archiveAnnoncementCollocation(annoncementCollocationId, userId);
            if (res){
                String message = "AnnoncementCollocation archived successfully.";
                ObjectMapper objectMapper = new ObjectMapper();
                String jsonResponse;
                try {
                    jsonResponse = objectMapper.writeValueAsString(Map.of("message", message));
                } catch (Exception e) {
                    // Handle JSON serialization error
                    jsonResponse = "{\"error\": \"Error serializing response\"}";
                }
                return ResponseEntity.status(HttpStatus.OK).body(jsonResponse);
            }else{
                String message = "user don't have access to archived .";
                ObjectMapper objectMapper = new ObjectMapper();
                String jsonResponse;
                try {
                    jsonResponse = objectMapper.writeValueAsString(Map.of("message", message));
                } catch (Exception e) {
                    // Handle JSON serialization error
                    jsonResponse = "{\"error\": \"Error serializing response\"}";
                }
                return ResponseEntity.status(HttpStatus.OK).body(jsonResponse);
             }
        } catch (Exception e) {
            String message = "Failed to archive AnnoncementCollocation: " + e.getMessage();
            ObjectMapper objectMapper = new ObjectMapper();
            String jsonResponse;
            try {
                jsonResponse = objectMapper.writeValueAsString(Map.of("message", message));
            } catch (Exception ex) {
                // Handle JSON serialization error
                jsonResponse = "{\"error\": \"Error serializing response\"}";
            }
            return ResponseEntity.status(500).body(jsonResponse);
        }
    }
    @PostMapping("/{id}/{userId}/unarchive")
    @ResponseBody
    public ResponseEntity<String> unarchiveAnnoncement_Collocation(@PathVariable("id") Integer annoncementCollocationId,
                                                            @PathVariable("userId") Integer userId  )  {
        try {
            Boolean res = annoncementCollocationServiceImp.unarchiveAnnoncementCollocation(annoncementCollocationId, userId);
            String message  ;
            ObjectMapper objectMapper = new ObjectMapper();
            String jsonResponse;
             if (res){
                message = "AnnoncementCollocation unarchived  successfully.";
                 try {
                    jsonResponse = objectMapper.writeValueAsString(Map.of("message", message));
                } catch (Exception e) {
                    // Handle JSON serialization error
                    jsonResponse = "{\"error\": \"Error serializing response\"}";
                }
                return ResponseEntity.status(HttpStatus.OK).body(jsonResponse);

             }else{
                message = "user don't have access to unarchived  .";
                try {
                    jsonResponse = objectMapper.writeValueAsString(Map.of("message", message));
                } catch (Exception e) {
                    // Handle JSON serialization error
                    jsonResponse = "{\"error\": \"Error serializing response\"}";
                }
                return ResponseEntity.status(HttpStatus.OK).body(jsonResponse);
            }
        } catch (Exception e) {
            String message = "Failed to archive AnnoncementCollocation: " + e.getMessage();
            ObjectMapper objectMapper = new ObjectMapper();
            String jsonResponse;
            try {
                jsonResponse = objectMapper.writeValueAsString(Map.of("message", message));
            } catch (Exception ex) {
                // Handle JSON serialization error
                jsonResponse = "{\"error\": \"Error serializing response\"}";
            }
            return ResponseEntity.status(500).body(jsonResponse);
        }
    }




    @GetMapping("/get_all_AnnoncementCollocations")
    public List<AnnoncementCollocation> findAll() {
        return annoncementCollocationServiceImp.findAll();

    }
    @GetMapping("/get_AnnoncementCollocations/{userId}")
    public List<Map<String, Object>> findAll(@PathVariable Integer userId) {
        return annoncementCollocationServiceImp.findAnnoncementByUserId(userId);
    }

  @GetMapping("/get_all_AnnoncementCollocations_andfavoris/{userId}")
    public  List<Map<String, Object>> findAllWithFavoris(@PathVariable Integer userId) {
        return annoncementCollocationServiceImp.findAllWithFavorisByUserId(userId);
    }












    @PutMapping("/updateAnnoncementCollocation/{id}")

    public AnnoncementCollocation update(@RequestPart(value = "announcement") String annoncement,
                                         @RequestPart(value = "images", required = false) List<MultipartFile> files,
                                         @RequestParam(value = "oldPhotosIds", required = false) List<String> oldPhotosIds,
                                         @PathVariable("id") Integer id) throws IOException {

        AnnoncementCollocation annc = new ObjectMapper().readValue(annoncement, AnnoncementCollocation.class);

        if (oldPhotosIds != null && !oldPhotosIds.isEmpty()) {
            for (String oldPhotoId : oldPhotosIds) {
                // Perform deletion logic for old photos with the provided IDs
                // Assuming you have a service method to handle this
                annoncementCollocationServiceImp.deleteOldPhoto(id, oldPhotoId);
            }
        }

        if (files != null && !files.isEmpty()) {
            List<FileDB> images = new ArrayList<>();
            for (MultipartFile file : files) {
                FileDB image = fileStorageService.store(file, annc);
                images.add(image);
            }
            annc.setImages(images);
        }

        return annoncementCollocationServiceImp.update(id, annc);
    }

    @DeleteMapping("/deleteAnnoncementCollocation/{id}")
    public void delete(@PathVariable("id") Integer AnnoncementCollocationId) {
        annoncementCollocationServiceImp.delete(AnnoncementCollocationId);
    }
    @GetMapping("/get_AnnoncementById/{id}")
    public ResponseEntity<AnnoncementCollocation> getAnnouncementById(@PathVariable("id") Integer id) {
        AnnoncementCollocation announcement = annoncementCollocationServiceImp.getAnnouncementById(id);

        if (announcement != null) {
            return ResponseEntity.ok(announcement);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/get_AnnoncementById/{id}/{userId}")
    public ResponseEntity<Map<String, Object>> getAnnouncementById(@PathVariable("id") Integer id,
                                                                   @PathVariable Integer userId) {
        Map<String, Object> announcement = annoncementCollocationServiceImp.getAnnouncementById(id, userId);

        if (announcement != null) {
            return ResponseEntity.ok(announcement);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/archived/{userId}")
    public  List<Map<String, Object>> getArchivedAnnouncementsByUserId(@PathVariable int userId) {
        return annoncementCollocationServiceImp.getArchivedAnnouncementsByUserId(userId);
    }
    @GetMapping("/home-size")
    public ResponseEntity<List<AnnoncementCollocation>> findByHomeSizeGreaterThanOrEqual(@RequestParam Integer homeSize) {
        return ResponseEntity.ok(annoncementCollocationServiceImp.findByHomeSizeGreaterThanOrEqual(homeSize));
    }

    @GetMapping("/num-perso")
    public ResponseEntity<List<AnnoncementCollocation>> findByNumPersoGreaterThanOrEqual(@RequestParam Integer numPerso) {
        return ResponseEntity.ok(annoncementCollocationServiceImp.findByNumPersoGreaterThanOrEqual(numPerso));
    }

    @GetMapping("/address")
    public ResponseEntity<List<AnnoncementCollocation>> findByAddressContaining(@RequestParam String address) {
        return ResponseEntity.ok(annoncementCollocationServiceImp.findByAddressContaining(address));
    }

    @GetMapping("/price")
    public ResponseEntity<List<AnnoncementCollocation>> findByPricePerPersonBetween(@RequestParam Float minPrice, @RequestParam Float maxPrice) {
        return ResponseEntity.ok(annoncementCollocationServiceImp.findByPricePerPersonBetween(minPrice, maxPrice));
    }

    @GetMapping("/house-type")
    public ResponseEntity<List<AnnoncementCollocation>> findByHouseType(@RequestParam HouseType houseType) {
        return ResponseEntity.ok(annoncementCollocationServiceImp.findByHouseType(houseType));
    }

    @GetMapping("/equipment-type")
    public ResponseEntity<List<AnnoncementCollocation>> findByEquipmentType(@RequestParam EquipmentType equipmentType) {
        return ResponseEntity.ok(annoncementCollocationServiceImp.findByEquipmentType(equipmentType));
    }
    @GetMapping("/annoncementCollocation/filter/{userId}")
    public ResponseEntity<List<Map<String, Object>>> filterAnnoncementCollocations(
            @RequestParam(required = false) Integer homeSize,
            @RequestParam(required = false) Integer numPerso,
            @RequestParam(required = false) String address,
            @RequestParam(required = false) Float minPrice,
            @RequestParam(required = false) Float maxPrice,
            @RequestParam(required = false) tn.esprit.coexist.entity.ColocationEntity.HouseType houseType,
            @RequestParam(required = false) EquipmentType equipmentType,
            @PathVariable Integer userId
    ) {
        List<Map<String, Object>> filteredAnnouncements = annoncementCollocationServiceImp.filterAnnoncementCollocations(
                homeSize, numPerso, address, minPrice, maxPrice, houseType, equipmentType, userId);
        return ResponseEntity.ok(filteredAnnouncements);
    }
}


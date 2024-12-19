package tn.esprit.coexist.service.ColocationService.FavorisCollocation;

import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.coexist.entity.ColocationEntity.AnnoncementCollocation;
import tn.esprit.coexist.entity.ColocationEntity.Favoris;
import tn.esprit.coexist.entity.User;
import tn.esprit.coexist.repository.ColocationRepository.AnnoncementCollocationRepository;
import tn.esprit.coexist.repository.ColocationRepository.FavorisRepository;
import tn.esprit.coexist.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@Getter
@Setter
@Service
@AllArgsConstructor
public class FavorisServiceImp implements FavorisService{
    @Autowired
    FavorisRepository favorisRepository ;

    UserRepository userRepository ;

    AnnoncementCollocationRepository annoncementCollocationRepository;


    @Override
    public List<Favoris> findAll() {
        return favorisRepository.findAll();
    }

    @Override
    public Favoris addAnnoceCollToFAVORIS(Integer userId, Integer annId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + userId));

        AnnoncementCollocation annonce = annoncementCollocationRepository.findById(annId)
                .orElseThrow(() -> new EntityNotFoundException("AnnoncementCollocation not found with ID: " + annId));

        Optional<Favoris> existingFavoris = favorisRepository.findByUserAndAnnoncementCollocation(user, annonce);

        if (existingFavoris.isPresent()) {
            throw new EntityExistsException("This AnnoncementCollocation is already in the user's favoris.");
        }

        Favoris favoris = new Favoris();
        favoris.setFavoris(true);
        favoris.setUser(user);
        favoris.setAnnoncementCollocation(annonce);

        return favorisRepository.save(favoris);
    }
    @Override
    public void updateFavorisStatus(Integer userId, Integer annId, boolean favoris) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + userId));

        AnnoncementCollocation annonce = annoncementCollocationRepository.findById(annId)
                .orElseThrow(() -> new EntityNotFoundException("AnnoncementCollocation not found with ID: " + annId));

        Optional<Favoris> existingFavoris = favorisRepository.findByUserAndAnnoncementCollocation(user, annonce);

        existingFavoris.ifPresent(favorisToUpdate -> {
            favorisToUpdate.setFavoris(favoris);
            favorisRepository.save(favorisToUpdate);
        });
    }
    @Override
    public void removeAnnoceCollFromFAVORIS(Integer userId, Integer annId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + userId));

        AnnoncementCollocation annonce = annoncementCollocationRepository.findById(annId)
                .orElseThrow(() -> new EntityNotFoundException("AnnoncementCollocation not found with ID: " + annId));

        Optional<Favoris> existingFavoris = favorisRepository.findByUserAndAnnoncementCollocation(user, annonce);

        existingFavoris.ifPresent(favoris -> favorisRepository.delete(favoris));
    }

    @Override
    public void removeFavoris(Integer announcementId) {
        AnnoncementCollocation annonce = annoncementCollocationRepository.findById(announcementId)
                .orElseThrow(() -> new EntityNotFoundException("AnnoncementCollocation not found with ID: " + announcementId));

        List<Favoris> favorisList = favorisRepository.findByAnnoncementCollocation(annonce);
        favorisList.forEach(favoris -> favorisRepository.delete(favoris));
    }

    @Override
    public Favoris findById(Integer id) {
        return null;
    }


    public List<AnnoncementCollocation> findAnnoncementCollocationByUserId(Integer userId) {
        List<Favoris> favorisList = favorisRepository.findByUserUserId(userId);
        List<AnnoncementCollocation> annoncementCollocations = new ArrayList<>();

        for (Favoris favoris : favorisList) {
            if (favoris.getAnnoncementCollocation() != null) {
                annoncementCollocations.add(favoris.getAnnoncementCollocation());
            }
        }

        return annoncementCollocations;
    }


}

package tn.esprit.coexist.repository.ColocationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tn.esprit.coexist.entity.ColocationEntity.AnnoncementCollocation;
import tn.esprit.coexist.entity.ColocationEntity.Favoris;
import tn.esprit.coexist.entity.User;
import tn.esprit.coexist.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavorisRepository extends JpaRepository<Favoris,Integer> {


    Optional<Favoris> findByUserAndAnnoncementCollocation(User user, AnnoncementCollocation annonce);
    List<Favoris> findByAnnoncementCollocation(AnnoncementCollocation annonce);
    List<Favoris> findByUserUserId(Integer userId);








}

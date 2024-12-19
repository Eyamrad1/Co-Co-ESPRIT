package tn.esprit.coexist.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.coexist.entity.FeedBack;
@Repository
public interface FeedBackRepository extends JpaRepository<FeedBack,Integer> {

boolean existsByUserUserId(Integer userId);
}

package tn.esprit.coexist.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tn.esprit.coexist.entity.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Integer> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);

    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
    @Query(nativeQuery = true, value = "SELECT * FROM User u WHERE (:keyword IS NULL OR u.username LIKE %:keyword%)")
    public List<User> recherche(@Param("keyword") String keyword);
    Boolean existsByPassword(String password);

}

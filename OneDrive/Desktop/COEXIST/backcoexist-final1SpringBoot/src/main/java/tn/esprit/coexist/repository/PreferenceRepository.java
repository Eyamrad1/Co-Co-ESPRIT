package tn.esprit.coexist.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.coexist.entity.Preference;
@Repository
public interface PreferenceRepository extends JpaRepository<Preference,Integer> {
    Preference findFirstByOrderByPreferenceIDDesc();
}

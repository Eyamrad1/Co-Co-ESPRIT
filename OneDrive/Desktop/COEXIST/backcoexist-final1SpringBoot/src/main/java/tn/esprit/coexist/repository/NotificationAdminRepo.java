package tn.esprit.coexist.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.coexist.entity.NotificationAdmin;
@Repository
public interface NotificationAdminRepo extends JpaRepository<NotificationAdmin, Integer> {
}

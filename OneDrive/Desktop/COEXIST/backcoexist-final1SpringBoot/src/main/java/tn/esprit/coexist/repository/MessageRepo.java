package tn.esprit.coexist.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.coexist.entity.Message;

@Repository
public interface MessageRepo extends JpaRepository<Message,Integer> {
}

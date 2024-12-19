package tn.esprit.coexist.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.coexist.entity.Chatroom;


@Repository
public interface ChatroomRepo extends JpaRepository<Chatroom,Integer> {
}

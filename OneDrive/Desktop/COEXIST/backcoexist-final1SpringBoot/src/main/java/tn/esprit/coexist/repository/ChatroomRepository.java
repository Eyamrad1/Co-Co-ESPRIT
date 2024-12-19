package tn.esprit.coexist.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.coexist.entity.Chatroom;
import tn.esprit.coexist.entity.Subject;

@Repository
public interface ChatroomRepository extends JpaRepository<Chatroom,Integer> {


}

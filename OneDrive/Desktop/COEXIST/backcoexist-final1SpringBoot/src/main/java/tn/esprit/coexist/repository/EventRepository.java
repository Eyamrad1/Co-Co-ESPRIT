package tn.esprit.coexist.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tn.esprit.coexist.entity.Event;



import java.time.LocalDateTime;

import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event,Integer> {
    @Query(nativeQuery = true, value = "SELECT * FROM Event e WHERE (:keyword IS NULL OR e.event_name LIKE %:keyword%)")
    public List<Event> recherche(@Param("keyword") String keyword);



    List<Event> findByEventDate(LocalDateTime eventDate);

    List<Event> findByEventDescriptionContaining(String eventDescription);

    List<Event> findByEventLocationContaining(String eventLocation);

}
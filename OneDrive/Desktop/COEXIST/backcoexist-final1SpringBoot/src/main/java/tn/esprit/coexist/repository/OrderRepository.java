package tn.esprit.coexist.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.coexist.entity.Orderr;
import tn.esprit.coexist.entity.OrderStatus;
import tn.esprit.coexist.entity.User;

import java.util.List;
@Repository
public interface OrderRepository extends JpaRepository<Orderr,Integer> {

    boolean existsByCodeOrder(String codeOrder);

    Orderr findByUserAndStatus(User user, OrderStatus status);
    Orderr findByUser(User user);

    long count() ;
    List<Orderr> findByStatus(OrderStatus status);

    long countByStatus(OrderStatus status);









}

package tn.esprit.coexist.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tn.esprit.coexist.entity.Payment;

import java.math.BigDecimal;

@Repository
public interface PaymentRepository extends JpaRepository<Payment,Integer> {

    @Query("SELECT SUM(p.amount) FROM Payment p")
    BigDecimal getTotalPaymentAmount();


}

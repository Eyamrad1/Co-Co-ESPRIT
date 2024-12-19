package tn.esprit.coexist.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.coexist.dto.OTP;

import java.util.Date;

@Repository
public interface OTPRepository extends JpaRepository<OTP, Long> {
    OTP findByIdentificationAndExpiredDateAfter(String identification, Date now);

    OTP findByIdentification(String identification);
}

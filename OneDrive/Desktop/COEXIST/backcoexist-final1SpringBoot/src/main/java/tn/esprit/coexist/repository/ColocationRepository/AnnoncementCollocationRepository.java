package tn.esprit.coexist.repository.ColocationRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tn.esprit.coexist.entity.ColocationEntity.AnnoncementCollocation;
import tn.esprit.coexist.entity.ColocationEntity.CollocationBooking;
import tn.esprit.coexist.entity.ColocationEntity.EquipmentType;
import tn.esprit.coexist.entity.HouseType;
import tn.esprit.coexist.entity.User;

import java.util.List;
import java.util.Map;

@Repository
public interface AnnoncementCollocationRepository extends JpaRepository<AnnoncementCollocation,Integer> {
    List<AnnoncementCollocation> findByHomeSizeGreaterThanEqual(Integer homeSize);

    List<AnnoncementCollocation> findByNumPersoGreaterThanEqual(Integer numPerso);

    List<AnnoncementCollocation> findByAddressContaining(String address);

    List<AnnoncementCollocation> findByPricePerPersonBetween(Float minPrice, Float maxPrice);

    List<AnnoncementCollocation> findByHouseType(HouseType houseType);

    List<AnnoncementCollocation> findByEquipmentType(EquipmentType equipmentType);
    List<AnnoncementCollocation>  findAllByUserAndArchived(User user, boolean archived);
    @Query("SELECT a FROM AnnoncementCollocation a WHERE " +
            "(:homeSize IS NULL OR a.homeSize >= :homeSize) " +
            "AND (:numPerso IS NULL OR a.numPerso >= :numPerso) " +
            "AND (:address IS NULL OR a.address LIKE %:address%) " +
            "AND (:minPrice IS NULL OR a.pricePerPerson >= :minPrice) " +
            "AND (:maxPrice IS NULL OR a.pricePerPerson <= :maxPrice) " +
            "AND (:houseType IS NULL OR a.houseType = :houseType) " +
            "AND (:equipmentType IS NULL OR a.equipmentType = :equipmentType)")
    List<AnnoncementCollocation> findByFilters(
            @Param("homeSize") Integer homeSize,
            @Param("numPerso") Integer numPerso,
            @Param("address") String address,
            @Param("minPrice") Float minPrice,
            @Param("maxPrice") Float maxPrice,
            @Param("houseType") tn.esprit.coexist.entity.ColocationEntity.HouseType houseType,
            @Param("equipmentType") EquipmentType equipmentType);

}

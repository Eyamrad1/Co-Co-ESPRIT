package tn.esprit.coexist.service.ColocationService.AnnoncementCollocation;


import tn.esprit.coexist.entity.ColocationEntity.AnnoncementCollocation;
import tn.esprit.coexist.entity.ColocationEntity.EquipmentType;
import tn.esprit.coexist.entity.HouseType;

import java.util.List;
import java.util.Map;

public interface AnnoncementCollocationService {
    AnnoncementCollocation getAnnouncementById(Integer id);

    List<Map<String, Object>> filterAnnoncementCollocations(
            Integer homeSize, Integer numPerso, String address, Float minPrice, Float maxPrice,
            tn.esprit.coexist.entity.ColocationEntity.HouseType houseType, EquipmentType equipmentType, Integer userId);
}

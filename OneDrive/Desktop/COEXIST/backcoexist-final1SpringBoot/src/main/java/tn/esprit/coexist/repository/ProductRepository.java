package tn.esprit.coexist.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tn.esprit.coexist.entity.Product;
import tn.esprit.coexist.entity.TypeProduit;
import tn.esprit.coexist.entity.User;

import java.util.List;
import java.util.Map;

@Repository
public interface ProductRepository extends JpaRepository<Product,Integer> {
    List<Product> findByProductNameContaining(String productName);
    List<Product> findByStockLessThan(int stock);
    List<Product> findByType(TypeProduit type);


    @Query(value = "SELECT type, COUNT(*) AS count FROM Product GROUP BY type", nativeQuery = true)
    List<Map<String, Object>> countProductsByType();

    //   @Query("SELECT SUM(p.stockQuantity) FROM Product p WHERE p.type = :type")
    // Integer getStockQuantityByType(@Param("type") TypeProduit type);






    List<Product> findByPriceBetween(Float minPrice, Float maxPrice);

}

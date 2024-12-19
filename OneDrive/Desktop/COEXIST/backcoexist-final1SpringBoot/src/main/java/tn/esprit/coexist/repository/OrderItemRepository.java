package tn.esprit.coexist.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tn.esprit.coexist.entity.OrderItem;

import java.util.List;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem,Integer> {

    @Query("SELECT oi, p.productName, p.price FROM OrderItem oi JOIN oi.product p")
    List<Object[]> findAllOrderItemsWithProductNameAndPriceAndPaidFalse();
    List<OrderItem> findByUser_UserIdAndPaidFalse(Integer userId);

    OrderItem findByUser_UserIdAndProduct_ProductId(Integer userId, Integer productId);



}
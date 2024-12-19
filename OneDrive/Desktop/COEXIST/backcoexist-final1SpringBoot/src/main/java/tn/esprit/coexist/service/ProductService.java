package tn.esprit.coexist.service;


import org.springframework.web.multipart.MultipartFile;
import tn.esprit.coexist.entity.Product;
import tn.esprit.coexist.entity.User;

public interface ProductService {
    Product AddProduct(Product product, MultipartFile imageFile);

}

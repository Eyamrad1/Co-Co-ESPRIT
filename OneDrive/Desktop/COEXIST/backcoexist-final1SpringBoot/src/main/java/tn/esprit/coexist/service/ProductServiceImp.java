package tn.esprit.coexist.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.coexist.entity.Product;
import tn.esprit.coexist.entity.User;
import tn.esprit.coexist.repository.ProductRepository;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
@AllArgsConstructor
public class ProductServiceImp implements ProductService {
    public static final String uploadDirectory = "C:/xampp/htdocs/images/";
    private ProductRepository productRepository;
    @Override
    public Product AddProduct(Product product, MultipartFile imageFile) {
        try {
            Path directoryPath = Paths.get(uploadDirectory);
            if (!Files.exists(directoryPath)) {
                Files.createDirectories(directoryPath);
            }
            String originalFilename = imageFile.getOriginalFilename();
            String fileName = UUID.randomUUID().toString() + "_" + originalFilename;

            Path filePath = Paths.get(uploadDirectory, fileName);

            Files.write(filePath, imageFile.getBytes());

            product.setImage(fileName);

            return productRepository.save(product);
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to upload image");
        }
    }

}

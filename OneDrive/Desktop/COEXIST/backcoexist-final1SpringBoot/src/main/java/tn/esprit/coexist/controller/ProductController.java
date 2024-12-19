package tn.esprit.coexist.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.coexist.entity.Product;
import tn.esprit.coexist.entity.User;
import tn.esprit.coexist.service.ProductService;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
@CrossOrigin("http://localhost:4200")
public class ProductController {
    private ProductService productService;

    @PostMapping("/add-produit")
    public ResponseEntity<Product> addimage(@RequestParam("image") MultipartFile imageFile, @ModelAttribute Product product) {
        try {
            Product saved = productService.AddProduct(product, imageFile);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}

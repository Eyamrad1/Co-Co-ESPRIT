package tn.esprit.coexist.service;

import lombok.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import tn.esprit.coexist.config.exception.FileNotSelectedException;

@Service
public class FileUploadService {

    @Value("C:/xampp/htdocs/images/")
    private String profileImagesUploadDirectory;

    public String uploadFile(MultipartFile file) throws IOException {
        // Check if the file is not empty
        if (file.isEmpty()) {
            throw new FileNotSelectedException("Please select a profile image to upload");
        }
        // Get the original filename
        String originalFilename = file.getOriginalFilename();
        // Create the upload directory if it doesn't exist
        File directory = new File(profileImagesUploadDirectory);
        if (!directory.exists()) {
            directory.mkdirs();
        }
        // Save the file to the specified directory
        Path filePath = Path.of(profileImagesUploadDirectory, originalFilename);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        // For demonstration purposes, you could save the file path to the user's profile in the database
        return filePath.toString();
    }


    public String uploadImage(MultipartFile file, String owner) throws IOException {
        // Validate file type
        if (!file.getContentType().startsWith("image/")) {
            throw new IllegalArgumentException("Invalid file type. Only images are allowed.");
        }
        String selectedImagesUploadDirectory = null;
        String pathFromRoot = null;
        if (owner.equals("user")){

            selectedImagesUploadDirectory = profileImagesUploadDirectory;
            pathFromRoot = "/upload";
        }

        // Create the upload directory if it doesn't exist
        File directory = new File(selectedImagesUploadDirectory);
        if (!directory.exists()) {
            directory.mkdirs();
        }
        // Generate a unique filename to avoid overwriting existing files
        String uniqueFilename = generateUniqueFilename(file.getOriginalFilename());
        // Save the file to the specified directory
        Path filePath = Path.of(selectedImagesUploadDirectory, uniqueFilename);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        return pathFromRoot + uniqueFilename;
    }


    private String generateUniqueFilename(String originalFilename) {
        return System.currentTimeMillis() + "_" + originalFilename;
    }


    /*public String storeFile(MultipartFile file) {
        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();

        try {
            Path filePath = Paths.get(profileImagesUploadDirectory + File.separator + fileName);
            Files.copy(file.getInputStream(), filePath);
            return fileName;
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file: " + e.getMessage());
        }
    }

    public List<String> getMatchingImagePaths(List<String> databaseImageNames) {
        List<String> matchingImagePaths = new ArrayList<>();
        File directory = new File(profileImagesUploadDirectory);

        // Check if the directory exists
        if (directory.exists() && directory.isDirectory()) {
            File[] files = directory.listFiles();

            if (files != null) {
                for (File file : files) {
                    if (file.isFile()) {
                        String fullFileName = file.getName();
                        String[] parts = fullFileName.split("_"); // Split the filename based on underscore
                        if (parts.length == 2) {
                            String actualFileName = parts[1]; // Extract the actual filename
                            if (databaseImageNames.get(0).contains(actualFileName)) {
                                matchingImagePaths.add(file.getAbsolutePath());
                            }
                        }
                    }
                }
            }
        }
        return matchingImagePaths;
    }
     */


}

package tn.esprit.coexist.controller;

import jakarta.annotation.Resource;
import lombok.*;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.coexist.dto.StringToJsonDto;
import tn.esprit.coexist.service.FileUploadService;
import org.springframework.beans.factory.annotation.Value;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/v1/file")
@RequiredArgsConstructor
@CrossOrigin("http://localhost:4200")
public class FileUploadController {

    private final FileUploadService fileUploadService;
    @Value("${profile.images.upload.directory}")
    private String profileImagesUploadDirectory;

    @PostMapping("/upload-profile-picture")
    public ResponseEntity<?> handleFileUpload(@RequestParam("file") MultipartFile file) throws IOException {
        String filePath = fileUploadService.uploadFile(file);
        return ResponseEntity.ok(
                StringToJsonDto.builder()
                        .message("path of image uploaded: " + filePath)
                        .build()
        );
    }
    @PostMapping("/upload-profile-image")
    public ResponseEntity<?> handleImageUpload(@RequestParam("file") MultipartFile file, String owner) throws IOException {
        String filePath = fileUploadService.uploadImage(file, owner);
        return ResponseEntity.ok(
                StringToJsonDto.builder()
                        .message("path of uniqueFilename image uploaded: " + filePath)
                        .build()
        );
    }

    @GetMapping("/images/{filename:.+}")
    public ResponseEntity<?> serveImage(@PathVariable String filename) throws IOException {
        Path imagePath = Paths.get(profileImagesUploadDirectory).resolve(filename);
        Resource fileResource = (Resource) new ByteArrayResource(Files.readAllBytes(imagePath));

        return ResponseEntity.ok()
                .contentLength(Files.size(imagePath))
                .body(fileResource);
    }

    @GetMapping("/images/{imageName:.+}")
    public ResponseEntity<?> getImage(@PathVariable String imageName) throws IOException {
        // Extract the actual filename from the request path
        // String actualFileName = imageName.substring(imageName.indexOf("_") + 1);

        // Construct the full path to the image file
        Path imagePath = Paths.get(profileImagesUploadDirectory, imageName);

        // Read the image bytes from the file
        byte[] imageBytes = Files.readAllBytes(imagePath);

        // Determine the MIME type of the image based on its file extension
        String contentType = Files.probeContentType(imagePath);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.valueOf(contentType));

        // Return the image bytes along with appropriate headers
        return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
    }
    @PostMapping("uploadimage")
    public ResponseEntity<?> uploadImage(@RequestPart("image") MultipartFile file, String owner) throws IOException {


        String fileName = fileUploadService.uploadImage(file, owner);
        if(!fileName.isEmpty()){
            return ResponseEntity.ok().body(fileName);}

        else
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("image not uploaded");
        }
    }
    // @PostMapping("/uploadpdf")
    @PostMapping(value = "/uploadpdf", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)

    public String uploadFile(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return "Please select a file to upload";
        }

        try {

            String fileName = fileUploadService.uploadFile(file);
            return "File uploaded successfully: " + fileName;
        } catch (Exception e) {
            return "Failed to upload file: " + e.getMessage();
        }
    }


}

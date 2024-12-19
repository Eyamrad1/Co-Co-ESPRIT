package tn.esprit.coexist.service.ColocationService.AnnoncementCollocation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.coexist.entity.ColocationEntity.AnnoncementCollocation;
import tn.esprit.coexist.entity.ColocationEntity.FileDB;
import tn.esprit.coexist.repository.ColocationRepository.FileDBRepository;

import java.io.IOException;
import java.util.Objects;

@Service
public class FileStorageService {
    @Autowired
    FileDBRepository fileDBRepository;

    //store a file (image)
    public FileDB store(MultipartFile file, AnnoncementCollocation ann) throws IOException {
         String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
        FileDB fileDb = new FileDB(fileName, file.getContentType(),  file.getBytes() );
        fileDb.setAnnoncementCollocation(ann);
         return fileDBRepository.save(fileDb);
    }
}

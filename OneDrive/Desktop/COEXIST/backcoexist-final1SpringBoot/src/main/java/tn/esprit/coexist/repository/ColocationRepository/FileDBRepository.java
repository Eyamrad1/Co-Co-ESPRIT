package tn.esprit.coexist.repository.ColocationRepository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.coexist.entity.ColocationEntity.FileDB;

@Repository
public interface FileDBRepository extends JpaRepository<FileDB, String> {

}
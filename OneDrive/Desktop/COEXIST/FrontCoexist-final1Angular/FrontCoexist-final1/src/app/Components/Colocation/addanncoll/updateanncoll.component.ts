import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AnnouncementCollocation } from '../../../entity/AnnouncementCollocation';
import { AnnouncementCollocationService } from '../../../Services/announcement-collocation.service';
import { EquipmentType } from '../../../entity/EquipementType';
import { ToastrService } from 'ngx-toastr';
import { FileDB } from 'src/app/entity/FileDB';


@Component({
  selector: 'app-updateanncoll',
  templateUrl: './updateanncoll.component.html',
  styleUrls: ['./updateanncoll.component.css']
})

export class UpdateanncollComponent implements OnInit {
  announcementId!: number;
  announcement!: AnnouncementCollocation;
  updateAnnouncementFormGroup!: FormGroup;
  imageUrl: any;
  photo: File[] = []; // Variable pour stocker les images
  oldPhotos: FileDB[]= [];
  photosToRemove: FileDB[]= [];
  retrievedImage!: string;
  image!: string;
  base64Data!: Int8Array;
  imageUrls: string[] = [];

  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private collocationService: AnnouncementCollocationService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.announcementId = this.activatedRoute.snapshot.params['id'];
    this.initializeForm();
    this.loadAnnouncement();
  }


  initializeForm(): void {
    this.updateAnnouncementFormGroup = this.formBuilder.group({
      homeSize: [this.announcement?.homeSize || '', Validators.required],
      numPerso: [this.announcement?.numPerso || '', Validators.required],
      equipmentType: [this.announcement?.equipmentType || EquipmentType.MEUBLE],
      address: [this.announcement?.address || ''],
      // imageHouse: [this.announcement?.imageHouse || ''],
      pricePerPerson: [this.announcement?.pricePerPerson || '', Validators.required],
      etat: [this.announcement?.etat || '', Validators.required],
      houseType: [this.announcement?.houseType || '']
      // Add other fields as needed based on the properties of the collocation announcement
    });
  }

  loadAnnouncement(): void {
    this.collocationService.getAnnouncementById(this.announcementId).subscribe({
      next: (announcement) => {
        this.announcement = announcement;
        this.oldPhotos = announcement.images;
        this.updateAnnouncementFormGroup.patchValue(announcement);
        console.log(this.announcementId)
      },
      error: (error:Error) => {
        console.error('Error loading announcement:', error);
        // Handle error as needed
      }
    });
  }

  handleUpdateAnnouncement(): void {
    if (this.updateAnnouncementFormGroup.valid  ) {
      const formData = new FormData();
      this.photo.forEach(file => {
        console.log("🚀 ~ UpdateanncollComponent ~ handleUpdateAnnouncement ~ file:", file)
        formData.append('images', file);
      });
      this.photosToRemove.forEach(photo => {
        formData.append('oldPhotosIds', photo.id.toString());
      });



      const updatedAnnouncement: AnnouncementCollocation = this.updateAnnouncementFormGroup.value as AnnouncementCollocation;
      console.log("🚀 ~ UpdateanncollComponent ~ handleUpdateAnnouncement ~ updatedAnnouncement:", updatedAnnouncement)
      updatedAnnouncement.annoncementCollocationId = this.announcementId;


       try {
        const jsonAnnouncement = JSON.stringify(updatedAnnouncement);
         formData.append('announcement', jsonAnnouncement);
      } catch (error) {
        console.error('Error converting announcement to JSON:', error);
      }

      // Log formData to see if it contains the expected data
      console.log('FormData:', formData);

      this.collocationService.updateAnnouncement(formData, this.announcementId).subscribe({
        next: () => {
           this.toastr.success("L'annonce a été mise à jour avec succès!","",{
            timeOut: 500,
          });

          this.route.navigateByUrl('/myAnnColl');
        },
        error: (error) => {
          console.error('Error updating announcement:', error);
          this.toastr.error("Error updating announcement")
          // Handle error as needed
        }
      });
    } else {
      console.error('Le formulaire n\'est pas valide');
      // You may want to display an error message to the user
    }
  }
  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        const file = event.target.files[i];
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.imageUrls.push(e.target.result);
        };

        reader.readAsDataURL(file);
        this.photo.push(file); // Push each file into the array
      }
    }
  }
  getImage(annc:AnnouncementCollocation) {

    // console.log(this.retrievedImage)
    // this.base64Data = annc.image.data;
    // this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;

    // return this.retrievedImage;
  }
  deleteImage(index: number) {
    this.imageUrls.splice(index, 1);
  }
  deleteImageOldPhotos(index: number) {
    this.photosToRemove.push(this.oldPhotos[index])
    this.oldPhotos.splice(index, 1);
  }
}

import { Component } from '@angular/core';
import {AnnouncementCollocation} from "../../../entity/AnnouncementCollocation";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AnnouncementCollocationService} from "../../../Services/announcement-collocation.service";
import {Router} from "@angular/router";
import { EquipmentType } from 'src/app/entity/EquipementType';
import { ToastrService } from 'ngx-toastr';
import {AuthService} from "../../../Services/auth.service";

@Component({
  selector: 'app-addanncoll',
  templateUrl: './addanncoll.component.html',
  styleUrls: ['./addanncoll.component.css']
})
export class AddanncollComponent {
  newAnnouncementFormGroup!: FormGroup;
  photo: File[] = []; // Variable pour stocker les images
  retrievedImage!: string;
  image!: string;
  base64Data!: Int8Array;
  imageUrl: any;
  userId!:number;
  imageUrls: string[] = [];
Z
S
  constructor(private toastr: ToastrService, private formBuilder: FormBuilder, private collocationService: AnnouncementCollocationService, private authService:AuthService ,private route: Router) { }

  ngOnInit(): void {
    this.initializeForm();
    this.userId = this.authService.getUserId();
  }

  initializeForm(): void {
    this.newAnnouncementFormGroup = this.formBuilder.group({
      homeSize: ['', Validators.required],
      numPerso: ['', Validators.required],
      equipmentType: [EquipmentType.MEUBLE],
      address: [''],

      pricePerPerson: ['', Validators.required],
      houseType: ['']
      // Ajoutez d'autres champs au besoin en fonction des propriétés de l'annonce de colocation
    });
  }

  handleSaveAnnouncement(): void {
    if (this.newAnnouncementFormGroup.valid && this.photo.length > 0) {
      const formData = new FormData();
      this.userId = this.authService.getUserId();

      // Append each image to the form data
      this.photo.forEach(file => {
        formData.append('images', file);
      });

      formData.append('annoncement', JSON.stringify(this.newAnnouncementFormGroup.value));

      this.collocationService.addAnnouncement(formData, this.userId).subscribe({
        next: data => {
          this.toastr.success("Announcement has been saved successfully!");
          this.route.navigateByUrl("/myAnnColl");
        },
        error: err => {
          this.toastr.error("Error adding announcement");
        }
      });
    } else {
      this.toastr.error("Error adding announcement");
    }
  }


  getImage(annc:AnnouncementCollocation) {

    // console.log(this.retrievedImage)
    // this.base64Data = annc.images.data;
    // this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;

    return this.retrievedImage;
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


  deleteImage(index: number) {
    this.imageUrls.splice(index, 1);
  }

}

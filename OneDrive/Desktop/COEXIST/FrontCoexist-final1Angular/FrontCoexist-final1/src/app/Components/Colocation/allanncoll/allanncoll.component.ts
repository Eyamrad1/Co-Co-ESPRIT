import { Component } from '@angular/core';
import { FormGroup, FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { AnnouncementCollocationService } from "../../../Services/announcement-collocation.service";
import { AnnouncementCollocation } from "../../../entity/AnnouncementCollocation";
import { FavorisService } from "../../../Services/favoris.service";
import { FeedBack } from 'src/app/entity/FeedBack';
import {AuthService} from "../../../Services/auth.service";

@Component({
  selector: 'app-allanncoll',
  templateUrl: './allanncoll.component.html',
  styleUrls: ['./allanncoll.component.css'],

})
export class AllanncollComponent {

  newAnnouncementFormGroup!: FormGroup;
  allAnnouncements: AnnouncementCollocation[] = [];
  favoritedAnnouncements: number[] = [];
  userId!: number;
  total_page!: number;
  currentPage: number = 1;
  itemsPerPage: number = 3;
  feedbacks!: FeedBack[];
  filters = {
    homeSize: '',
    numPerso: '',
    address: '',
    minPrice: '',
    maxPrice: '',
    houseType: '',
    equipmentType: '',

  };
  showModal: Boolean = false;
  showModalFeedback: Boolean = false;
  stars = [
    {
      id: 1,
      icon: 'star',
      class: 'star-gold star-hover star'
    },
    {
      id: 2,
      icon: 'star',
      class: 'star-gold  star-hover star'
    },
    {
      id: 3,
      icon: 'star',
      class: 'star-gold  star-hover star'
    },
    {
      id: 4,
      icon: 'star',
      class: 'star-gold  star-hover star'
    },
    {
      id: 5,
      icon: 'star',
      class: 'star-gold  star-hover star'
    }

  ];
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 2000, // Autoplay speed in milliseconds (1 second)
    arrows: true, // Show next/previous arrows
    prevArrow: '<button type="button" class="slick-prev">Previous</button>',
    nextArrow: '<button type="button" class="slick-next">Next</button>',
  };

  constructor(
    private collocationService: AnnouncementCollocationService,
    private favorisService: FavorisService,
    private route: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.collocationService.getAllAnnouncementsAndFavorisByUserId(this.userId).subscribe((data) => {
      // @ts-ignore
      this.allAnnouncements = data.filter((announce) => !announce.archive && announce.userId != this.userId);
      console.log("🚀 ~ AllanncollComponent ~ this.collocationService.getAllAnnouncementsAndFavorisByUserId ~ this.allAnnouncements :", this.allAnnouncements)
      this.total_page = Math.ceil(this.allAnnouncements.length / this.itemsPerPage);

      this.loadFavoritedAnnouncements(); // Load favorited announcements
    });
  }

  loadFavoritedAnnouncements() {
    const favorisStr: string | null = localStorage.getItem('favoris');
    if (favorisStr) {
      const favoris: AnnouncementCollocation[] = JSON.parse(favorisStr);
      this.favoritedAnnouncements = favoris.map(annonce => annonce.annoncementCollocationId);
    }
  }

  redirectToCreateAnnouncement() {
    this.route.navigate(['/addColl']);
  }

  handleDeleteAnnouncement(announcement: AnnouncementCollocation) {
    let conf = confirm("Are you sure?");
    if (!conf) return;

    this.collocationService.deleteAnnouncement(announcement.annoncementCollocationId).subscribe({
      next: (resp) => {
        const index = this.allAnnouncements.indexOf(announcement);
        if (index !== -1) {
          this.allAnnouncements.splice(index, 1);
        }
      },
      error: err => {
        console.log(err);
      }
    });
  }

  handleArchiveAnnouncement(announcement: AnnouncementCollocation) {

    const annId = announcement.annoncementCollocationId;
    if (announcement.archive) {
      this.collocationService.unarchiveAnnouncement(annId, this.userId).subscribe({
        next: (resp) => {
          console.log(resp);
          this.collocationService.getAllAnnouncementsAndFavorisByUserId(this.userId).subscribe((data) => {
            // @ts-ignore
            this.allAnnouncements = data.filter((announce) => !announce.archive);
            console.log("🚀 ~ AllanncollComponent ~ this.collocationService.getAllAnnouncementsByUserId ~ data:", data)

          });
        },
        error: err => {
          console.log(err);
        }
      });
    } else {
      this.collocationService.archiveAnnouncement(annId, this.userId).subscribe({
        next: (resp) => {
          console.log(resp);
          this.collocationService.getAllAnnouncementsAndFavorisByUserId(this.userId).subscribe((data) => {
            // @ts-ignore
            this.allAnnouncements = data.filter((announce) => !announce.archive);
            console.log("🚀 ~ AllanncollComponent ~ this.collocationService.getAllAnnouncementsByUserId ~ data:", data)

          });
        },
        error: err => {
          console.log(err);
        }
      });
    }
  }
  addFavoris(announcement: AnnouncementCollocation) {

    const annId = announcement.annoncementCollocationId;

    this.favorisService.addAnnoucementFavoris(this.userId, annId).subscribe({
      next: (resp) => {
        console.log(resp);
        this.collocationService.getAllAnnouncementsAndFavorisByUserId(this.userId).subscribe((data) => {
          // @ts-ignore
          this.allAnnouncements = data.filter((announce) => !announce.archive);
          console.log("🚀 ~ AllanncollComponent ~ this.collocationService.getAllAnnouncementsByUserId ~ data:", data)

        });
      },
      error: err => {
        console.log(err);
      }
    });


  }
  removeFavoris(announcement: AnnouncementCollocation) {

    const annId = announcement.annoncementCollocationId;
    // Remove from favoris
    this.favorisService.removeAnnouncementFromFavoris(this.userId, annId).subscribe({
      next: (resp) => {
        console.log(resp);
        this.collocationService.getAllAnnouncementsAndFavorisByUserId(this.userId).subscribe((data) => {
          // @ts-ignore
          this.allAnnouncements = data.filter((announce) => !announce.archive);
          console.log("🚀 ~ AllanncollComponent ~ this.collocationService.getAllAnnouncementsByUserId ~ data:", data)

        });
      },
      error: err => {
        console.log(err);
      }
    });



  }

  isAnnouncementFavorited(announcement: AnnouncementCollocation): boolean {
    return this.favoritedAnnouncements.includes(announcement.annoncementCollocationId);
  }
  redirectToUpdateAnnouncement(announcement: AnnouncementCollocation) {
    const id = announcement.annoncementCollocationId;
    this.route.navigate(['/annColl']);
  }
  updateComponent(announcement: AnnouncementCollocation): boolean {
    const id = announcement.annoncementCollocationId;
    this.route.navigate(['/updateColl', id]);
    return false;
  }
  applyFilters(): void {
    // Pass the filters object to the service method
    this.filters.equipmentType = this.filters.equipmentType.toUpperCase()
    this.filters.houseType = this.filters.houseType.toUpperCase()
    this.collocationService.applyFilters(this.filters, this.userId).subscribe(
      (data: any[]) => {
        // Handle the filtered data
        this.allAnnouncements = data.filter((announce) => !announce.archive);
        this.showModal = false
      },
      (error) => {
        console.log("🚀 ~ AllanncollComponent ~ applyFilters ~ error:", error)
        // Handle errors
      }
    );
  }
  show_Modal() {
    this.showModal = true
  }
  showModal_Feedback(feedback: FeedBack) {
    this.showModalFeedback = true;
    //@ts-ignore
    this.feedbacks = feedback;
  }
  closeModalFeedback() {
    this.showModalFeedback = false;
    this.feedbacks = [];

  }
  closeModal() {
    this.showModal = false;


  }
  generateStarsArray(rating: any): any[] {
    this.stars.splice(0, parseInt(rating))
    console.log("🚀 ~ AllanncollComponent ~ generateStarsArray ~  this.stars:", this.stars)
    return this.stars;
  }

  redirect_ann_page(id: any) {
    return this.route.navigateByUrl('/annColl/'+id);
  }
  get totalPage(): number {
    return Math.ceil(this.allAnnouncements.length / this.itemsPerPage);
  }

  get pages(): number[] {
    const pagesArray = [];
    for (let i = 1; i <= this.totalPage; i++) {
      pagesArray.push(i);
    }
    return pagesArray;
  }
}



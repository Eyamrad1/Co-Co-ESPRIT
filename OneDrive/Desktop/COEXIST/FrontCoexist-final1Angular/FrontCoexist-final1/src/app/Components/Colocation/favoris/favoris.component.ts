import { Component, OnInit } from '@angular/core';
import { FavorisService } from '../../../Services/favoris.service'; // Adjust the path
import { AnnouncementCollocation } from "../../../entity/AnnouncementCollocation";
import {AuthService} from "../../../Services/auth.service";

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.component.html',
  styleUrls: ['./favoris.component.css']
})
export class FavorisComponent implements OnInit {
  favoris: AnnouncementCollocation[] = [];
  isPopoverOpen: boolean = false;
  userId: number =    this.authService.getUserId();

  total_page!: number ; // Array to store IDs of favorited announcements
  currentPage: number = 1;
  itemsPerPage: number = 3;
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
  constructor(private favorisService: FavorisService ,private authService: AuthService) { }

  ngOnInit(): void {

    this.loadFavoris();
    this.total_page = Math.ceil( this.favoris.length / this.itemsPerPage);

  }

  loadFavoris(): void {
    this.favorisService.getFavorisByUserId(this.userId).subscribe({
      next: (favoris) => {
        this.favoris = favoris;
      },
      error: (error) => {
        console.error('Error loading favoris:', error);
      }
    });
  }

  removeFavoris(announcement: AnnouncementCollocation): void {
    this.favorisService.removeFavoris(announcement.annoncementCollocationId).subscribe({
      next: () => {
        this.loadFavoris();
      },
      error: (error) => {
        console.error('Error removing favoris:', error);
      }
    });
  }

  getFavorisCount(): number {
    return this.favoris.length;
  }

  togglePopover(): void {
    this.isPopoverOpen = !this.isPopoverOpen;
  }
  get totalPage(): number {
    return Math.ceil(this.favoris.length / this.itemsPerPage);
  }

  get pages(): number[] {
    const pagesArray = [];
    for (let i = 1; i <= this.totalPage; i++) {
      pagesArray.push(i);
    }
    return pagesArray;
  }
}

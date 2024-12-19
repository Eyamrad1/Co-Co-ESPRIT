import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  openDropdowns: { [key: string]: boolean } = {};

  toggleDropdown(dropdownId: string): void {
    this.openDropdowns[dropdownId] = !this.openDropdowns[dropdownId];
  }

  isDropdownOpen(dropdownId: string): boolean {
    return this.openDropdowns[dropdownId];
  }
  MarketPlaceDropdownVisible:boolean = false;
  toggleMarketPlaceDropdown(event:MouseEvent) {
    this.MarketPlaceDropdownVisible =! this.MarketPlaceDropdownVisible;
    event.stopPropagation();

  }

  EventDropdownVisible:boolean = false;

  toggleEventDropdown(event:MouseEvent) {
    this.EventDropdownVisible =! this.EventDropdownVisible;
    event.stopPropagation();

  }
}

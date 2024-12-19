import { Component,AfterViewInit  } from '@angular/core';
import * as $ from 'jquery'; 

declare global {
    interface JQuery {
        sideNav(): JQuery;
    }
}

@Component({
  selector: 'app-all-template-front',
  templateUrl: './all-template-front.component.html',
  styleUrls: ['./all-template-front.component.css']
})
export class AllTemplateFrontComponent implements AfterViewInit {
  constructor() { }

  ngAfterViewInit(): void {
    $(".button-collapse").sideNav(); // Initialize sideNav after view is initialized
  }

}


import { Component, OnInit } from '@angular/core';
import { FeedBack } from "../../../../entity/FeedBack";
import { FeedbackService } from "../../../../Services/feedback.service";
import { Observable } from "rxjs";

@Component({
  selector: 'app-display-all-feedbacks',
  templateUrl: './display-all-feedbacks.component.html',
  styleUrls: ['./display-all-feedbacks.component.css']
})
export class DisplayAllFeedbacksComponent implements OnInit {
  feedbackList: FeedBack[];
  filteredFeedbackList: FeedBack[]; // Add a new property for filtered feedback
  p: number;
  searchCriteria: string = ''; // Add properties for search criteria
  minRating: number = 0;

  constructor(private feedbackService: FeedbackService) { }

  ngOnInit(): void {
    this.loadFeedback();
  }

  loadFeedback(): void {
    this.feedbackService.getAllFeedback().subscribe(
      feedback => {
        this.feedbackList = feedback;
        // Initialize filtered feedback list with all feedback initially
        this.filteredFeedbackList = this.feedbackList;
      },
      error => {
        console.error('Error loading feedback:', error);
      }
    );
  }

  // Function to filter feedback based on search criteria
  filterFeedback(): void {
    this.filteredFeedbackList = this.feedbackList.filter(feedback => {
      // Check if feedback matches search criteria
      return feedback.user.username.toLowerCase().includes(this.searchCriteria.toLowerCase()) &&
        feedback.rate >= this.minRating;
      // You can add additional conditions for other properties as needed
    });
  }

  deleteFeedback(feedBackId: number) {
    this.feedbackService.deleteFeedback(feedBackId).subscribe(
      () => {
        console.log('Feedback deleted successfully');
        // Optionally, you can perform additional actions after successful deletion, such as updating UI
      },
      error => {
        console.error('Error deleting feedback:', error);
        // Handle error (e.g., show error message to user)
      }
    );
  }
}

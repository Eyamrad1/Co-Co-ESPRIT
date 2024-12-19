import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeedBack } from '../../../entity/FeedBack';
import { FeedbackService } from '../../../Services/feedback.service';
import { AuthService } from '../../../Services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-feedback',
    templateUrl: './feedback.component.html',
    styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
    feedbackForm: FormGroup;
    feedback: FeedBack = new FeedBack();
    submitted: boolean = false;
    userId: number;
    bookingId: number;

    constructor(
        private fb: FormBuilder,
        private feedbackService: FeedbackService,
        private authService: AuthService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.feedbackForm = this.fb.group({
            feed_Back: ['', Validators.required],
            rate: ['']
        });

        this.userId = this.authService.getUserId();

        this.route.queryParams.subscribe(params => {
            this.bookingId = +params['bookingId']; // Convert to number
            if (!isNaN(this.bookingId)) {
                this.userId = this.authService.getUserId();
            } else {
                console.error('Invalid bookingId:', this.bookingId);
                // Handle error or display a message to the user
            }
        });
    }

    setRate(rate: number) {
        this.feedback.rate = rate;
        this.feedbackForm.get('rate').setValue(rate);
    }

    addFeedback() {
        // Ensure bookingId is valid before proceeding
        if (isNaN(this.bookingId)) {
            console.error('Invalid bookingId:', this.bookingId);
            // Handle error or display a message to the user
            return;
        }

        this.feedback.feed_Back = this.feedbackForm.get('feed_Back').value;
        this.feedback.rate = this.feedbackForm.get('rate').value;

        this.feedbackService.addFeedback(this.feedback, this.userId, this.bookingId).subscribe(response => {
            console.log('Feedback added successfully:', response);
            alert('Feedback added successfully:');
            this.submitted = true;
        }, error => {
            console.error('Error adding feedback:', error);
            alert('Error adding feedback:');
        });
    }

    // Getter to check if feedback has already been submitted
    get hasSubmittedFeedback(): boolean {
        // Logic to check if feedback has already been submitted
        return false; // Placeholder, replace with actual logic
    }
}

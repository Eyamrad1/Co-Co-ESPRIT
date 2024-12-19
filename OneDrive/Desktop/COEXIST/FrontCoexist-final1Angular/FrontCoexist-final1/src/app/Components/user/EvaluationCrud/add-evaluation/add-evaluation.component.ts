import {Component, OnInit} from '@angular/core';

import {ActivatedRoute, Router} from "@angular/router";

import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MyEvent} from "../../../../entity/MyEvent";
import {Evaluation} from "../../../../entity/Evaluation";
import {EventService} from "../../../../Services/event.service";
import {EvaluationService} from "../../../../Services/evaluation.service";
import {AuthService} from "../../../../Services/auth.service";
import {EventPosition} from "../../../../entity/EventPosition";


@Component({
  selector: 'app-add-evaluation',
  templateUrl: './add-evaluation.component.html',
  styleUrls: ['./add-evaluation.component.css']
})
export class AddEvaluationComponent implements OnInit {
  eventId: number = 0;
  userId: number;
  event: MyEvent | undefined;
  newEvaluation: Evaluation = new Evaluation();
  feedbackForm!: FormGroup;
  clickedGif: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private evaluationService: EvaluationService,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.feedbackForm = this.fb.group({
      eventPosition: ['', Validators.required],
      comment: ['', Validators.required]
    });

    this.route.params.subscribe((params) => {
      this.eventId = +params['eventId'];
      this.loadEventDetails();
    });
    this.userId = this.authService.getUserId()
  }

  confirmevaluation(): void {
    const confirmationMessage = "Evaluation sent successfully";
    if (confirm(confirmationMessage)) {
      const formData = this.feedbackForm.value;
      this.newEvaluation.eventPosition = formData.eventPosition;
      this.newEvaluation.comment = formData.comment;
      this.addEvaluation();
    }
  }

  submitFeedback(eventPosition: string) {
    this.feedbackForm.controls['eventPosition'].setValue(eventPosition);
    this.clickedGif = eventPosition;
  }

  loadEventDetails() {
    this.eventService.getEvent(this.eventId).subscribe(
      (event) => {
        this.event = event!;
      },
      (error) => {
        console.error('Error fetching event details', error);
      }
    );
  }

  addEvaluation() {
    if (this.event) {
      const feedback: Evaluation = this.feedbackForm.value;
      feedback.event = this.event;
      // Pass userId and feedback to the method
      this.evaluationService.addEvaluationAndAssignToEvent(this.userId, feedback, this.eventId).subscribe(
        (addedEvaluation) => {
          console.log('Evaluation added successfully', addedEvaluation);
          this.router.navigate(['/user/events']);
        },
        (error) => {
          console.error('Error adding evaluation', error);
        }
      );
    } else {
      console.error('Error: Event is undefined');
    }
  }

  protected readonly EventPosition = EventPosition;
}

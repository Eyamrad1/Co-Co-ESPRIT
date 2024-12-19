import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { Evaluation } from '../../../entity/Evaluation';
import { EvaluationService } from '../../../Services/evaluation.service';

@Component({
    selector: 'app-display-evaluation',
    templateUrl: './display-evaluation.component.html',
    styleUrls: ['./display-evaluation.component.css']
})
export class DisplayEvaluationComponent implements OnInit {
    evaluations: Evaluation[] = [];

    constructor(private snackBar: MatSnackBar, private evaluationService: EvaluationService) {}

    ngOnInit(): void {
        this.getEvaluations();
    }

    getEvaluations(): void {
        this.evaluationService.retrieveAllEvaluation().subscribe(
            (evaluations: Evaluation[]) => {
                this.evaluations = evaluations;
            },
            (error: any) => {
                console.error('Error retrieving evaluations', error);
                // Handle error appropriately
            }
        );
    }

    deleteEvaluation(IdEvaluation: number)       {


    }

    protected readonly Evaluation = Evaluation;
}

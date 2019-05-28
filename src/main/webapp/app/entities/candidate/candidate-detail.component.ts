import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ICandidate } from 'app/shared/model/candidate.model';
import { InterviewService } from '../interview/interview.service';
@Component({
    selector: 'jhi-candidate-detail',
    templateUrl: './candidate-detail.component.html'
})
export class CandidateDetailComponent implements OnInit {
    candidate: ICandidate;
    constructor(protected activatedRoute: ActivatedRoute, public interviewService: InterviewService) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ candidate }) => {
            this.candidate = candidate;
            this.interviewService.candidateId.next(this.candidate);
        });
    }

    previousState() {
        window.history.back();
    }
}

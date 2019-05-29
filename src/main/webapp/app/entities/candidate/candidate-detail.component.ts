import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ICandidate } from 'app/shared/model/candidate.model';
import { InterviewService } from '../interview/interview.service';
import { IInterview } from 'app/shared/model/interview.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-candidate-detail',
    templateUrl: './candidate-detail.component.html',
    styleUrls: ['./candidate-detail.component.scss']
})
export class CandidateDetailComponent implements OnInit {
    candidate: ICandidate;
    interview: IInterview;
    constructor(
        protected router: Router,
        private modalService: NgbModal,
        protected activatedRoute: ActivatedRoute,
        public interviewService: InterviewService
    ) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ candidate }) => {
            this.candidate = candidate;
            this.interviewService.candidateId.next(this.candidate);
        });
    }

    previousState() {
        // window.history.back();
        this.router.navigate(['/candidate']);
    }

    openLg(content, interview) {
        this.modalService.open(content, { size: 'lg' });
        this.interview = interview;
    }

    editInterview() {
        this.router.navigate(['/interview', this.interview.id, 'view']);
        this.modalService.dismissAll();
    }
}

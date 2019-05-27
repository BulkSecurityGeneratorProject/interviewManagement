import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IInterview } from 'app/shared/model/interview.model';

@Component({
    selector: 'jhi-interview-detail',
    templateUrl: './interview-detail.component.html'
})
export class InterviewDetailComponent implements OnInit {
    interview: IInterview;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ interview }) => {
            this.interview = interview;
        });
    }

    previousState() {
        window.history.back();
    }
}

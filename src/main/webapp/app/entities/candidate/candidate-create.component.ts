import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ICandidate, Candidate } from 'app/shared/model/candidate.model';
import { CandidateService } from './candidate.service';
import { InterviewService } from '../interview/interview.service';

import { IInterview, Interview } from 'app/shared/model/interview.model';

@Component({
    selector: 'jhi-candidate-create',
    templateUrl: './candidate-create.component.html',
    styleUrls: ['./candidate-update.component.scss']
})
export class CandidateCreateComponent implements OnInit {
    candidate: ICandidate;
    isSaving: boolean;
    interview: IInterview;

    constructor(protected candidateService: CandidateService, public interviewService: InterviewService, protected router: Router) {}

    ngOnInit() {
        this.isSaving = false;
        this.candidate = new Candidate();
        this.interview = new Interview();
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.candidateService.create(this.candidate).subscribe(res => {
            this.candidate = res.body;
            this.interview.candidate = this.candidate;
            this.interviewService.create(this.interview).subscribe(res => {
                this.router.navigate(['/candidate/' + this.candidate.id + '/view']);
            });
        });
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICandidate>>) {
        result.subscribe((res: HttpResponse<ICandidate>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}

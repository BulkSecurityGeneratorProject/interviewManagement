import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IInterview, Interview } from 'app/shared/model/interview.model';
import { InterviewService } from './interview.service';
import { ICandidate, Candidate } from 'app/shared/model/candidate.model';
import { CandidateService } from 'app/entities/candidate';
@Component({
    selector: 'jhi-interview-create',
    templateUrl: './interview-create.component.html',
    styleUrls: ['./interview-create.component.scss']
})
export class InterviewCreateComponent implements OnInit {
    interview: IInterview;
    isSaving: boolean;

    candidates: ICandidate[];
    interviewDateDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected interviewService: InterviewService,
        protected candidateService: CandidateService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.isSaving = false;
        this.interview = new Interview();
        this.interviewService.currentcandidateId.subscribe(res => {
            this.interview.candidate = res;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.interview.id !== undefined) {
            this.subscribeToSaveResponse(this.interviewService.update(this.interview));
        } else {
            this.subscribeToSaveResponse(this.interviewService.create(this.interview));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IInterview>>) {
        result.subscribe((res: HttpResponse<IInterview>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.router.navigate(['/candidate/' + this.interview.candidate.id + '/view']);
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackCandidateById(index: number, item: ICandidate) {
        return item.id;
    }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IInterview } from 'app/shared/model/interview.model';
import { InterviewService } from './interview.service';
import { ICandidate } from 'app/shared/model/candidate.model';
import { CandidateService } from 'app/entities/candidate';

@Component({
    selector: 'jhi-interview-update',
    templateUrl: './interview-update.component.html'
})
export class InterviewUpdateComponent implements OnInit {
    interview: IInterview;
    isSaving: boolean;

    candidates: ICandidate[];
    interviewDateDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected interviewService: InterviewService,
        protected candidateService: CandidateService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ interview }) => {
            this.interview = interview;
        });
        this.candidateService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ICandidate[]>) => mayBeOk.ok),
                map((response: HttpResponse<ICandidate[]>) => response.body)
            )
            .subscribe((res: ICandidate[]) => (this.candidates = res), (res: HttpErrorResponse) => this.onError(res.message));
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
        this.previousState();
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

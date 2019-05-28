import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICandidate } from 'app/shared/model/candidate.model';
import { AccountService } from 'app/core';
import { CandidateService } from './candidate.service';

@Component({
    selector: 'jhi-candidate',
    templateUrl: './candidate.component.html'
})
export class CandidateComponent implements OnInit, OnDestroy {
    candidates: ICandidate[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearchId: string;
    currentSearchName: string;
    currentSearchEmail: string;
    currentSearchExperience: string;

    constructor(
        protected candidateService: CandidateService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected activatedRoute: ActivatedRoute,
        protected accountService: AccountService
    ) {
        this.currentSearchId =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search']
                ? this.activatedRoute.snapshot.params['search']
                : '';
        this.currentSearchName =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search']
                ? this.activatedRoute.snapshot.params['search']
                : '';

        this.currentSearchEmail =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search']
                ? this.activatedRoute.snapshot.params['search']
                : '';

        this.currentSearchExperience =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search']
                ? this.activatedRoute.snapshot.params['search']
                : '';
    }

    loadAll() {
        if (this.currentSearchId) {
            this.candidateService
                .searchId({
                    query: this.currentSearchId
                })
                .pipe(
                    filter((res: HttpResponse<ICandidate[]>) => res.ok),
                    map((res: HttpResponse<ICandidate[]>) => res.body)
                )
                .subscribe((res: ICandidate[]) => (this.candidates = res), (res: HttpErrorResponse) => this.onError(res.message));
            return;
        } else if (this.currentSearchName) {
            this.candidateService
                .searchName({
                    query: this.currentSearchName
                })
                .pipe(
                    filter((res: HttpResponse<ICandidate[]>) => res.ok),
                    map((res: HttpResponse<ICandidate[]>) => res.body)
                )
                .subscribe((res: ICandidate[]) => (this.candidates = res), (res: HttpErrorResponse) => this.onError(res.message));
            return;
        } else if (this.currentSearchEmail) {
            this.candidateService
                .searchEmail({
                    query: this.currentSearchEmail
                })
                .pipe(
                    filter((res: HttpResponse<ICandidate[]>) => res.ok),
                    map((res: HttpResponse<ICandidate[]>) => res.body)
                )
                .subscribe((res: ICandidate[]) => (this.candidates = res), (res: HttpErrorResponse) => this.onError(res.message));
            return;
        } else if (this.currentSearchExperience) {
            this.candidateService
                .searchExperience({
                    query: this.currentSearchExperience
                })
                .pipe(
                    filter((res: HttpResponse<ICandidate[]>) => res.ok),
                    map((res: HttpResponse<ICandidate[]>) => res.body)
                )
                .subscribe((res: ICandidate[]) => (this.candidates = res), (res: HttpErrorResponse) => this.onError(res.message));
            return;
        }
        this.searchAllQuery();
    }

    private searchAllQuery() {
        this.candidateService
            .query()
            .pipe(
                filter((res: HttpResponse<ICandidate[]>) => res.ok),
                map((res: HttpResponse<ICandidate[]>) => res.body)
            )
            .subscribe(
                (res: ICandidate[]) => {
                    this.candidates = res;
                    this.currentSearchId = '';
                    this.currentSearchName = '';
                    this.currentSearchEmail = '';
                    this.currentSearchExperience = '';
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    searchId(query) {
        if (!query) {
            return this.clearIdSearch();
        }
        this.currentSearchId = query;
        this.loadAll();
    }

    searchName(query) {
        if (!query) {
            return this.clearNameSearch();
        }
        this.currentSearchName = query;
        this.loadAll();
    }

    searchEmail(query) {
        if (!query) {
            return this.clearEmailSearch();
        }
        this.currentSearchEmail = query;
        this.loadAll();
    }

    searchExperience(query) {
        if (!query) {
            return this.clearExperienceSearch();
        }
        this.currentSearchExperience = query;
        this.loadAll();
    }

    clearIdSearch() {
        this.currentSearchId = '';
        this.loadAll();
    }

    clearNameSearch() {
        this.currentSearchName = '';
        this.loadAll();
    }

    clearEmailSearch() {
        this.currentSearchEmail = '';
        this.loadAll();
    }

    clearExperienceSearch() {
        this.currentSearchExperience = '';
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCandidates();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICandidate) {
        return item.id;
    }

    registerChangeInCandidates() {
        this.eventSubscriber = this.eventManager.subscribe('candidateListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

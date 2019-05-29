import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { ICandidate } from 'app/shared/model/candidate.model';
import { AccountService } from 'app/core';
import { CandidateService } from './candidate.service';

@Component({
    selector: 'jhi-candidate',
    templateUrl: './candidate.component.html',
    styleUrls: ['candidate.component.scss']
})
export class CandidateComponent implements OnInit, OnDestroy {
    candidates: ICandidate[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearchPhoneNo: string;
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
        this.currentSearchExperience = this.currentSearchEmail = this.currentSearchName = this.currentSearchPhoneNo =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search']
                ? this.activatedRoute.snapshot.params['search']
                : '';
    }

    loadAll() {
        if (this.currentSearchPhoneNo) {
            this.searchOnPhonNo();
            return;
        } else if (this.currentSearchName) {
            this.searchOnName();
            return;
        } else if (this.currentSearchEmail) {
            this.searchOnEmail();
            return;
        } else if (this.currentSearchExperience) {
            this.searchOnExperience();
            return;
        }
        this.searchAllQuery();
    }

    private searchOnExperience() {
        this.candidateService
            .searchExperience({
                query: this.currentSearchExperience
            })
            .pipe(
                filter((res: HttpResponse<ICandidate[]>) => res.ok),
                map((res: HttpResponse<ICandidate[]>) => res.body)
            )
            .subscribe((res: ICandidate[]) => (this.candidates = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    private searchOnEmail() {
        this.candidateService
            .searchEmail({
                query: this.currentSearchEmail
            })
            .pipe(
                filter((res: HttpResponse<ICandidate[]>) => res.ok),
                map((res: HttpResponse<ICandidate[]>) => res.body)
            )
            .subscribe((res: ICandidate[]) => (this.candidates = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    private searchOnName() {
        this.candidateService
            .searchName({
                query: this.currentSearchName
            })
            .pipe(
                filter((res: HttpResponse<ICandidate[]>) => res.ok),
                map((res: HttpResponse<ICandidate[]>) => res.body)
            )
            .subscribe((res: ICandidate[]) => (this.candidates = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    private searchOnPhonNo() {
        this.candidateService
            .searchPhoneNo({
                query: this.currentSearchPhoneNo
            })
            .pipe(
                filter((res: HttpResponse<ICandidate[]>) => res.ok),
                map((res: HttpResponse<ICandidate[]>) => res.body)
            )
            .subscribe((res: ICandidate[]) => (this.candidates = res), (res: HttpErrorResponse) => this.onError(res.message));
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
                    this.currentSearchPhoneNo = '';
                    this.currentSearchName = '';
                    this.currentSearchEmail = '';
                    this.currentSearchExperience = '';
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    searchPhoneNo(query) {
        if (!query) {
            return this.clearPhonNoSearch();
        }
        this.currentSearchPhoneNo = query;
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

    clearPhonNoSearch() {
        this.currentSearchPhoneNo = '';
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

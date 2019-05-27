import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IInterview } from 'app/shared/model/interview.model';
import { AccountService } from 'app/core';
import { InterviewService } from './interview.service';

@Component({
    selector: 'jhi-interview',
    templateUrl: './interview.component.html'
})
export class InterviewComponent implements OnInit, OnDestroy {
    interviews: IInterview[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected interviewService: InterviewService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected activatedRoute: ActivatedRoute,
        protected accountService: AccountService
    ) {
        this.currentSearch =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search']
                ? this.activatedRoute.snapshot.params['search']
                : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.interviewService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<IInterview[]>) => res.ok),
                    map((res: HttpResponse<IInterview[]>) => res.body)
                )
                .subscribe((res: IInterview[]) => (this.interviews = res), (res: HttpErrorResponse) => this.onError(res.message));
            return;
        }
        this.interviewService
            .query()
            .pipe(
                filter((res: HttpResponse<IInterview[]>) => res.ok),
                map((res: HttpResponse<IInterview[]>) => res.body)
            )
            .subscribe(
                (res: IInterview[]) => {
                    this.interviews = res;
                    this.currentSearch = '';
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInInterviews();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IInterview) {
        return item.id;
    }

    registerChangeInInterviews() {
        this.eventSubscriber = this.eventManager.subscribe('interviewListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

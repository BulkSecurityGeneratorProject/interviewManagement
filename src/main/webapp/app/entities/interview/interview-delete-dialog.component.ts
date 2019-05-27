import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IInterview } from 'app/shared/model/interview.model';
import { InterviewService } from './interview.service';

@Component({
    selector: 'jhi-interview-delete-dialog',
    templateUrl: './interview-delete-dialog.component.html'
})
export class InterviewDeleteDialogComponent {
    interview: IInterview;

    constructor(
        protected interviewService: InterviewService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.interviewService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'interviewListModification',
                content: 'Deleted an interview'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-interview-delete-popup',
    template: ''
})
export class InterviewDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ interview }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(InterviewDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.interview = interview;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/interview', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/interview', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}

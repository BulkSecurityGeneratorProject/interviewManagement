import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Interview } from 'app/shared/model/interview.model';
import { InterviewService } from './interview.service';
import { InterviewComponent } from './interview.component';
import { InterviewDetailComponent } from './interview-detail.component';
import { InterviewUpdateComponent } from './interview-update.component';
import { InterviewDeletePopupComponent } from './interview-delete-dialog.component';
import { IInterview } from 'app/shared/model/interview.model';

@Injectable({ providedIn: 'root' })
export class InterviewResolve implements Resolve<IInterview> {
    constructor(private service: InterviewService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IInterview> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Interview>) => response.ok),
                map((interview: HttpResponse<Interview>) => interview.body)
            );
        }
        return of(new Interview());
    }
}

export const interviewRoute: Routes = [
    {
        path: '',
        component: InterviewComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Interviews'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: InterviewDetailComponent,
        resolve: {
            interview: InterviewResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Interviews'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: InterviewUpdateComponent,
        resolve: {
            interview: InterviewResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Interviews'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: InterviewUpdateComponent,
        resolve: {
            interview: InterviewResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Interviews'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const interviewPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: InterviewDeletePopupComponent,
        resolve: {
            interview: InterviewResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Interviews'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

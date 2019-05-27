import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InterviewManagementSharedModule } from 'app/shared';
import {
    InterviewComponent,
    InterviewDetailComponent,
    InterviewUpdateComponent,
    InterviewDeletePopupComponent,
    InterviewDeleteDialogComponent,
    interviewRoute,
    interviewPopupRoute
} from './';

const ENTITY_STATES = [...interviewRoute, ...interviewPopupRoute];

@NgModule({
    imports: [InterviewManagementSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        InterviewComponent,
        InterviewDetailComponent,
        InterviewUpdateComponent,
        InterviewDeleteDialogComponent,
        InterviewDeletePopupComponent
    ],
    entryComponents: [InterviewComponent, InterviewUpdateComponent, InterviewDeleteDialogComponent, InterviewDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InterviewManagementInterviewModule {}

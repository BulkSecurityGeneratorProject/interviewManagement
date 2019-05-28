import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InterviewManagementSharedModule } from 'app/shared';
import { InterviewCreateComponent } from '../interview/interview-create.component';
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
        InterviewCreateComponent,
        InterviewDeletePopupComponent
    ],
    entryComponents: [
        InterviewComponent,
        InterviewCreateComponent,
        InterviewUpdateComponent,
        InterviewDeleteDialogComponent,
        InterviewDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InterviewManagementInterviewModule {}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InterviewManagementSharedModule } from 'app/shared';
import {
    CandidateComponent,
    CandidateDetailComponent,
    CandidateUpdateComponent,
    CandidateDeletePopupComponent,
    CandidateDeleteDialogComponent,
    candidateRoute,
    candidatePopupRoute
} from './';

const ENTITY_STATES = [...candidateRoute, ...candidatePopupRoute];

@NgModule({
    imports: [InterviewManagementSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CandidateComponent,
        CandidateDetailComponent,
        CandidateUpdateComponent,
        CandidateDeleteDialogComponent,
        CandidateDeletePopupComponent
    ],
    entryComponents: [CandidateComponent, CandidateUpdateComponent, CandidateDeleteDialogComponent, CandidateDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InterviewManagementCandidateModule {}

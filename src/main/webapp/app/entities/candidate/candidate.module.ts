import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CandidateCreateComponent } from './candidate-create.component';
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
        CandidateCreateComponent,
        CandidateUpdateComponent,
        CandidateDeleteDialogComponent,
        CandidateDeletePopupComponent
    ],
    entryComponents: [
        CandidateComponent,
        CandidateCreateComponent,
        CandidateUpdateComponent,
        CandidateDeleteDialogComponent,
        CandidateDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InterviewManagementCandidateModule {}

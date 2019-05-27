import { NgModule } from '@angular/core';

import { InterviewManagementSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [InterviewManagementSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [InterviewManagementSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class InterviewManagementSharedCommonModule {}

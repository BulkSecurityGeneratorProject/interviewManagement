/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { InterviewManagementTestModule } from '../../../test.module';
import { InterviewDeleteDialogComponent } from 'app/entities/interview/interview-delete-dialog.component';
import { InterviewService } from 'app/entities/interview/interview.service';

describe('Component Tests', () => {
    describe('Interview Management Delete Component', () => {
        let comp: InterviewDeleteDialogComponent;
        let fixture: ComponentFixture<InterviewDeleteDialogComponent>;
        let service: InterviewService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [InterviewManagementTestModule],
                declarations: [InterviewDeleteDialogComponent]
            })
                .overrideTemplate(InterviewDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(InterviewDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InterviewService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});

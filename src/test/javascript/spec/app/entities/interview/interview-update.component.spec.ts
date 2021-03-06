/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { InterviewManagementTestModule } from '../../../test.module';
import { InterviewUpdateComponent } from 'app/entities/interview/interview-update.component';
import { InterviewService } from 'app/entities/interview/interview.service';
import { Interview } from 'app/shared/model/interview.model';

describe('Component Tests', () => {
    describe('Interview Management Update Component', () => {
        let comp: InterviewUpdateComponent;
        let fixture: ComponentFixture<InterviewUpdateComponent>;
        let service: InterviewService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [InterviewManagementTestModule],
                declarations: [InterviewUpdateComponent]
            })
                .overrideTemplate(InterviewUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(InterviewUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InterviewService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Interview(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.interview = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Interview();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.interview = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IInterview } from 'app/shared/model/interview.model';
import { ICandidate } from 'app/shared/model/candidate.model';

type EntityResponseType = HttpResponse<IInterview>;
type EntityArrayResponseType = HttpResponse<IInterview[]>;

@Injectable({ providedIn: 'root' })
export class InterviewService {
    // keeping current candidate id for create new interview use
    public candidateId = new BehaviorSubject<any>('');
    currentcandidateId = this.candidateId.asObservable();
    //public candidate: ICandidate;

    public resourceUrl = SERVER_API_URL + 'api/interviews';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/interviews';

    constructor(protected http: HttpClient) {}

    create(interview: IInterview): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(interview);
        return this.http
            .post<IInterview>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(interview: IInterview): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(interview);
        return this.http
            .put<IInterview>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IInterview>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IInterview[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IInterview[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(interview: IInterview): IInterview {
        const copy: IInterview = Object.assign({}, interview, {
            interviewDate:
                interview.interviewDate != null && interview.interviewDate.isValid() ? interview.interviewDate.format(DATE_FORMAT) : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.interviewDate = res.body.interviewDate != null ? moment(res.body.interviewDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((interview: IInterview) => {
                interview.interviewDate = interview.interviewDate != null ? moment(interview.interviewDate) : null;
            });
        }
        return res;
    }
}

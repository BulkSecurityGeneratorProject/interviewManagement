import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICandidate } from 'app/shared/model/candidate.model';

type EntityResponseType = HttpResponse<ICandidate>;
type EntityArrayResponseType = HttpResponse<ICandidate[]>;

@Injectable({ providedIn: 'root' })
export class CandidateService {
    public resourceUrl = SERVER_API_URL + 'api/candidates';
    public resourceSearchPhoneNoUrl = SERVER_API_URL + 'api/_search/candidatesphone';
    public resourceSearchNameUrl = SERVER_API_URL + 'api/_search/candidatesname';
    public resourceSearchEmailUrl = SERVER_API_URL + 'api/_search/candidatesemail';
    public resourceSearchExperienceUrl = SERVER_API_URL + 'api/_search/candidatesexperience';

    constructor(protected http: HttpClient) {}

    create(candidate: ICandidate): Observable<EntityResponseType> {
        return this.http.post<ICandidate>(this.resourceUrl, candidate, { observe: 'response' });
    }

    update(candidate: ICandidate): Observable<EntityResponseType> {
        return this.http.put<ICandidate>(this.resourceUrl, candidate, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICandidate>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICandidate[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    searchPhoneNo(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICandidate[]>(this.resourceSearchPhoneNoUrl, { params: options, observe: 'response' });
    }

    searchName(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICandidate[]>(this.resourceSearchNameUrl, { params: options, observe: 'response' });
    }

    searchEmail(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICandidate[]>(this.resourceSearchEmailUrl, { params: options, observe: 'response' });
    }

    searchExperience(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICandidate[]>(this.resourceSearchExperienceUrl, { params: options, observe: 'response' });
    }
}

import { IInterview } from 'app/shared/model/interview.model';

export interface ICandidate {
    id?: number;
    name?: string;
    email?: string;
    phoneNo?: string;
    currentCompany?: string;
    experience?: number;
    position?: string;
    interviews?: IInterview[];
}

export class Candidate implements ICandidate {
    constructor(
        public id?: number,
        public name?: string,
        public email?: string,
        public phoneNo?: string,
        public currentCompany?: string,
        public experience?: number,
        public position?: string,
        public interviews?: IInterview[]
    ) {}
}

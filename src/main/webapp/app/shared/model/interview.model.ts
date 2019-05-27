import { Moment } from 'moment';
import { ICandidate } from 'app/shared/model/candidate.model';

export interface IInterview {
    id?: number;
    level?: string;
    interviewDate?: Moment;
    interviewerName?: string;
    interviewerEmail?: string;
    interviewerPhone?: string;
    status?: string;
    comments?: string;
    candidate?: ICandidate;
}

export class Interview implements IInterview {
    constructor(
        public id?: number,
        public level?: string,
        public interviewDate?: Moment,
        public interviewerName?: string,
        public interviewerEmail?: string,
        public interviewerPhone?: string,
        public status?: string,
        public comments?: string,
        public candidate?: ICandidate
    ) {}
}

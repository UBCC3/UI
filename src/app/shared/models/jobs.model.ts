export interface Job {
    id: string;
    created: string;
    userid: string;
    job_name: string;
    submitted?: string;
    started?: string;
    finished?: string;
    status: string;
    parameters?: any;
}

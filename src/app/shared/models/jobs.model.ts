export interface Job {
    id: string;
    created: string;
    userid: string;
    job_name: string;
    submitted?: string;
    started?: string;
    finished?: string;
    status: string;
    parameters?: Record<string, any>;
}

export interface PaginatedJob {
    offset: number;
    limit: number;
    total_count: number;
    data: Job[];
    filter?: string;
}

export interface NewJobDTO {
    email: string;
    job_name: string;
    parameters: Record<string, any>;
    file?: File;
    [key: string]: any;
}

export interface UpdateJobDTO {
    started?: string;
    finished?: string;
    status?: JobStatus;
    parameters?: Record<string, any>;
}

export enum JobStatus {
    SUBMITTED = 'SUBMITTED',
    RUNNING = 'RUNNING',
    FAILED = 'FAILED',
    CANCELLED = 'CANCELLED',
    COMPLETED = 'COMPLETED',
}

export interface NewCalculationForm {
    calculationName: string;
    calculation: string;
    theory: string;
    basisSet: string;
    file: File;
    source: string;
    solventEffects?: string;
    waveTheory?: string;
}

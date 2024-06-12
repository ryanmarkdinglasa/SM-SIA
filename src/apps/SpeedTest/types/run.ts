import { Dict } from "system/types";

export interface Run {
    networkId: string; // required
    recipient: string; // required
    requestDate: string;
    responseDate: string | null;
    runId: string;
    status: RunStatus;
};

export type Runs = Dict<Run>;

export enum RunStatus {
    pending = 'pending',
    success = 'success',
    timeout = 'timeout'
};
import {Dict} from '../types/generic';

export enum SocketStatus {
  authenticated = 'authenticated',
  connected = 'connected',
  disconnected = 'disconnected',
  error = 'error',
}

export type SocketStatuses = Dict<SocketStatus>;

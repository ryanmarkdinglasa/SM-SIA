import {Dict} from '../types/generic';
import {SocketDataInternalMethod} from '../types/socketDataInternal';

export interface InternalRequestMapping {
  [key: string]: SocketDataInternalMethod;
}

export type NetworkCorrelationIds = Dict<InternalRequestMapping>;

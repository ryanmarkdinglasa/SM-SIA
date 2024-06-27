import {AccountNumber} from '../../shared/types/signing';
import {IdentificationData} from '../types/identification';
import {Dict} from '../types/generic';

export interface Account extends AccountNumber, IdentificationData {}

export type Accounts = Dict<Account>;

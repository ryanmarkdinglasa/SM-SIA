import {IdentificationData} from '../types/identification';
import {TnbKeyPair} from '../../shared/types/signing';

export interface Self extends IdentificationData, TnbKeyPair {}

import {Self} from '../types';
import {generateSignature, getKeyPairFromSigningKeyHex} from '../utils/tnb';

export const getAuthToken = (self: Self): string => {
  const now = new Date();
  const date = now.toISOString().split('.')[0];
  const {signingKey} = getKeyPairFromSigningKeyHex(self.signingKey);
  const signature = generateSignature(date, signingKey);
  return `${self.accountNumber}$${date}$${signature}`;
};

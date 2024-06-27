import axios from 'axios';

import {CoreAccount} from '../types';
import {getAddress} from '../utils/addresses';

export const getLiveBalance = async (accountNumber: string, networkId: string): Promise<number> => {
  try {
    const address = getAddress(networkId);
    const {data: account} = await axios.get<CoreAccount>(`${address}/api/accounts/${accountNumber}`);
    return account.balance;
  } catch (error) {
    return 0;
  }
};

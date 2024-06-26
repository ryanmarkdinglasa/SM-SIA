import {useSelector} from 'react-redux';

import {getAccounts, getSelf} from '../selectors/state';
import {truncate} from '../utils/strings';

const useAccountDisplayName = (accountNumber: string, maxLength?: number) => {
  const accounts = useSelector(getAccounts);
  const self = useSelector(getSelf);

  const account = self.accountNumber === accountNumber ? self : accounts[accountNumber];
  const results = account?.displayName || accountNumber;

  return maxLength ? truncate(results, maxLength) : results;
};

export default useAccountDisplayName;

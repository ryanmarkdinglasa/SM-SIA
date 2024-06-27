import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import {getAccountOnlineStatuses, getSelf} from '../selectors/state';
import {OnlineStatus} from '../types';

const useAccountOnlineStatus = (accountNumber: string): OnlineStatus => {
  const accountOnlineStatuses = useSelector(getAccountOnlineStatuses);
  const self = useSelector(getSelf);

  return useMemo(() => {
    if (accountNumber === self.accountNumber) return OnlineStatus.online;
    const accountOnlineStatus = accountOnlineStatuses[accountNumber];
    return accountOnlineStatus || OnlineStatus.offline;
  }, [accountNumber, accountOnlineStatuses, self.accountNumber]);
};

export default useAccountOnlineStatus;

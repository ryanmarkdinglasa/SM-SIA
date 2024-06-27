import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import {getAccountOnlineStatuses} from '../selectors/state';
import {OnlineStatus} from '../types';

const useOnlineAccountNumbers = (): string[] => {
  const accountOnlineStatuses = useSelector(getAccountOnlineStatuses);

  return useMemo(() => {
    return Object.keys(accountOnlineStatuses).filter(
      (accountNumber) => accountOnlineStatuses[accountNumber] === OnlineStatus.online,
    );
  }, [accountOnlineStatuses]);
};

export default useOnlineAccountNumbers;

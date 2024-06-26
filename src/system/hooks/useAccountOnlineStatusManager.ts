import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {useAccountNumbers} from '../hooks';
import {getNetworkAccountOnlineStatuses} from '../selectors/state';
import {setAccountOnlineStatuses} from '../store/accountOnlineStatuses';
import {AccountOnlineStatuses, AppDispatch, OnlineStatus} from '../types';

const useAccountOnlineStatusManager = () => {
  const accountNumbers = useAccountNumbers();
  const dispatch = useDispatch<AppDispatch>();
  const networkAccountOnlineStatuses = useSelector(getNetworkAccountOnlineStatuses);

  useEffect(() => {
    const results: AccountOnlineStatuses = accountNumbers.reduce(
      (acc, accountNumber) => ({...acc, [accountNumber]: OnlineStatus.offline}),
      {},
    );

    for (const accountOnlineStatuses of Object.values(networkAccountOnlineStatuses)) {
      for (const [accountNumber, onlineStatus] of Object.entries(accountOnlineStatuses)) {
        if (onlineStatus === OnlineStatus.online) {
          results[accountNumber] = onlineStatus;
        }
      }
    }

    dispatch(setAccountOnlineStatuses(results));
  }, [accountNumbers, dispatch, networkAccountOnlineStatuses]);
};

export default useAccountOnlineStatusManager;

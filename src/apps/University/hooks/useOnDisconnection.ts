import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import difference from 'lodash/difference';

import {unsetCourseRecordRecipient} from 'apps/University/store/courseRecordRecipients';
import {useConnectedAccounts} from 'system/hooks';
import {AppDispatch, Dict} from 'system/types';

let prevConnectedAccounts: Dict<string> = {};

const useOnDisconnection = () => {
  const connectedAccounts = useConnectedAccounts();
  const dispatch = useDispatch<AppDispatch>();

  const connectedAccountNumbers = Object.keys(connectedAccounts);
  const prevConnectedAccountNumbers = Object.keys(prevConnectedAccounts);

  for (const accountNumber of difference(prevConnectedAccountNumbers, connectedAccountNumbers)) {
    dispatch(unsetCourseRecordRecipient(accountNumber));
  }

  useEffect(() => {
    prevConnectedAccounts = connectedAccounts;
  }, [connectedAccounts]);
};

export default useOnDisconnection;
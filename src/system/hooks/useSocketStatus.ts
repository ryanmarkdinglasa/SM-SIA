import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import {getSocketStatuses} from '../selectors/state';
import {SocketStatus} from '../types';

const useSocketStatus = (networkId: string): SocketStatus => {
  const socketStatuses = useSelector(getSocketStatuses);

  return useMemo(() => {
    const socketStatus = socketStatuses[networkId];
    return socketStatus || SocketStatus.disconnected;
  }, [networkId, socketStatuses]);
};

export default useSocketStatus;

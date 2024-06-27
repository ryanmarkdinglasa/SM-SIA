import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import {getNetworkBlocks} from '../selectors/state';
import {NetworkBlock} from '../types';
import {Dict} from '../types/generic';

const useNetworkBlocks = (networkId: string): Dict<NetworkBlock> => {
  const networkBlocks = useSelector(getNetworkBlocks);

  return useMemo(() => {
    return networkBlocks[networkId] || {};
  }, [networkBlocks, networkId]);
};

export default useNetworkBlocks;

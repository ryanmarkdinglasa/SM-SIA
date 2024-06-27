import {useSelector} from 'react-redux';

import {getNetworks} from '../selectors/state';
import {truncate} from '../utils/strings';

const useNetworkDisplayName = (networkId: string, maxLength?: number) => {
  const networks = useSelector(getNetworks);

  const network = networks[networkId];
  const results = network?.displayName || networkId;

  return maxLength ? truncate(results, maxLength) : results;
};

export default useNetworkDisplayName;

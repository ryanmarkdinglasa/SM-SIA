import { useDispatch, useSelector } from 'react-redux';

import { NetworkIdentification, SelectCard } from '../';
import { getActiveNetworkId } from 'apps/SpeedTest/selectors/state';
import { setActiveNetworkId } from 'apps/SpeedTest/store/manager';
import { AppDispatch, SFC } from 'system/types';

export interface NetworkSelectCardProps {
  networkId: string;
}

export const NetworkSelectCard: SFC<NetworkSelectCardProps> = ({className, networkId}) => {
  const activeNetworkId = useSelector(getActiveNetworkId);
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = () => {
    if (networkId === activeNetworkId) {
      dispatch(setActiveNetworkId(null));
    } else {
      dispatch(setActiveNetworkId(networkId));
    }
  };

  return (
    <SelectCard className={className} isSelected={networkId === activeNetworkId} onClick={handleClick}>
      <NetworkIdentification networkId={networkId} />
    </SelectCard>
  );
};
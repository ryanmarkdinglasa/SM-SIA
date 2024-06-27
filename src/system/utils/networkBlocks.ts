import {Block} from 'shared/types';
import store from '../store';
import {setNetworkBlock} from '../store/networkBlocks';
import {currentSystemDate} from '../utils/dates';

export const logNetworkBlock = (block: Block, networkId: string) => {
  if (block.amount === 0) return;

  store.dispatch(
    setNetworkBlock({
      networkBlock: {
        ...block,
        date: currentSystemDate(),
      },
      networkId,
    }),
  );
};

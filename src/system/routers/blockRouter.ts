import {appRouters} from 'apps/registry';
import store from '../store';
import {AppDispatch, SocketDataStandard} from '../types';
import {logNetworkBlock} from '../utils/networkBlocks';
import {displayErrorToast} from '../utils/toast';
import {blockValidator} from '../validators/blockValidators';
import {validateIsSelfAccountNumber} from '../validators/common';

const blockRouter = (dispatch: AppDispatch, networkId: string, socketData: SocketDataStandard) => {
  (async () => {
    try {
      const {
        system: {self},
      } = store.getState();

      const {message: block} = await blockValidator.validate(socketData);
      validateIsSelfAccountNumber(block.recipient, self);
      const {payload} = block;
      const pid = payload?.pid;

      if (pid) {
        const appRouter = appRouters[pid];
        appRouter(block, dispatch, networkId);
      }

      logNetworkBlock(block, networkId);
    } catch (error) {
      console.error(error);
      displayErrorToast('Invalid block received');
    }
  })();
};

export default blockRouter;
